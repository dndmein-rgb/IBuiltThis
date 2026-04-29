import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

type Product=InferSelectModel<typeof products >;
export default function ProductCard({ product }: { product: Product }) {
  const hasVoted=false;
  return (

    <Link href={`/products/${product.id}`}>
      <Card className="flex flex-col group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-45">
        <CardHeader>
          <div className="flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group:hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount>100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3" fill="yellow" />
                    Featured
                  </Badge>
                )}
              </div>

              <CardDescription>{product.description}</CardDescription>
            </div>
            {/* Voting buttons */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn("h-8 w-8 text-primary hover:bg-primary/20",hasVoted? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-primary/10 hover:text-primary ")}
              >
                <ChevronUpIcon />
              </Button>
              <span className="text-sm font-semibold transition-colors text-foreground">
                {product.voteCount}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn("h-8 w-8 text-primary", hasVoted?"hover:text-destructive":"opacity-50 cursor-not-allowed ")}
              >
                <ChevronDownIcon className="size-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex items-center gap-2 mt-auto">
          {product.tags?.map((tag) => (
            <Badge variant={"secondary"} key={tag}>
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
