"use server";

import { db } from "@/db";
import { products, votes } from "@/db/schema";
import { FormState } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { productSchema } from "./product-validations";

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    //validate the data
    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    //transform the data
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: undefined,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check the form.",
      };
    }

    return {
      success: false,
      errors: undefined,
      message: "Failed to submit product",
    };
  }
};

export const upvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      console.log("User not signed in");
      return {
        success: false,
        message: "You must be signed in to upvote a product",
      };
    }

    if (!orgId) {
      console.log("User not a member of an organization");
      return {
        success: false,
        message: "You must be a member of an organization to upvote a product",
      };
    }

    // Check if user already voted
    const existingVote = await db.query.votes.findFirst({
      where: and(
        eq(votes.userId, userId),
        eq(votes.productId, productId)
      ),
    });

    if (existingVote) {
      return {
        success: false,
        message: "You have already voted for this product",
      };
    }

    // Add vote record
    await db.insert(votes).values({
      productId,
      userId,
    });

    // Increment vote count
    await db
      .update(products)
      .set({
        voteCount: sql`vote_count + 1`,
      })
      .where(eq(products.id, productId));

    revalidatePath("/");
    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      message: "Product upvoted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to upvote product",
    };
  }
};

export const downvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      console.log("User not signed in");
      return {
        success: false,
        message: "You must be signed in to downvote a product",
      };
    }

    if (!orgId) {
      console.log("User not a member of an organization");
      return {
        success: false,
        message: "You must be a member of an organization to downvote a product",
      };
    }

    // Check if user has voted (downvote only works if user previously upvoted)
    const existingVote = await db.query.votes.findFirst({
      where: and(
        eq(votes.userId, userId),
        eq(votes.productId, productId)
      ),
    });

    if (!existingVote) {
      return {
        success: false,
        message: "You can only downvote products you have upvoted",
      };
    }

    // Remove vote record
    await db
      .delete(votes)
      .where(
        and(
          eq(votes.userId, userId),
          eq(votes.productId, productId)
        )
      );

    // Decrement vote count
    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count - 1)`,
      })
      .where(eq(products.id, productId));

    revalidatePath("/");
    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      message: "Vote removed successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to remove vote",
    };
  }
};

export const hasUserVotedAction = async (productId: number) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return false;
    }

    const existingVote = await db.query.votes.findFirst({
      where: and(
        eq(votes.userId, userId),
        eq(votes.productId, productId)
      ),
    });

    return !!existingVote;
  } catch (error) {
    console.error(error);
    return false;
  }
};