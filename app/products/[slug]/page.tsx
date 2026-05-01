import SectionHeader from "@/components/common/section-header";
import ProductVotingSection from "@/components/products/product-voting-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/product-select";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
  StarIcon,
  UserIcon,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { name, description, websiteUrl, tags, voteCount, tagline } = product;

  return (
    <>
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeftIcon className="size-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-6">
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <SectionHeader
                  title={name}
                  icon={StarIcon}
                  description={tagline ?? ""}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-primary/10">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

            <div className="space-y-3">
              {[
                {
                  label: "Launched:",
                  value: new Date(
                    product.createdAt?.toISOString() ?? ""
                  ).toLocaleDateString(),
                  icon: CalendarIcon,
                },
                {
                  label: "Submitted by:",
                  value: product.submittedBy,
                  icon: UserIcon,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  {Icon && <Icon className="size-4 text-muted-foreground" />}
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="border rounded-lg p-6 bg-background">
              <ProductVotingSection
                productId={product.id}
                voteCount={voteCount}
              />
            </div>
            {websiteUrl && (
              <Button
                asChild
                className="w-full rounded-lg"
                variant={"outline"}
              >
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website <ExternalLinkIcon className="size-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    slug: product.slug.toString(),
  }));
};

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="py-16">
      <div className="wrapper">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <Loader2Icon className="size-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading product...</p>
              </div>
            </div>
          }
        >
          <ProductContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}