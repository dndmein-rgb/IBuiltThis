import SectionHeader from "@/components/common/section-header";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/products/product-card"

const featuredProducts=[
  {
    id:1,
    name:"ParityKit",
    description:"A toolkit for creating parity products",
    tags:["SaaS","Pricing","Global"],
    votes:635,
    isFeatured:true,
  },
  {
    id:2,
    name:"Mordern Full Stack Next.js Course",
    description:"Learn to build production-ready full stack apps with Next.js",
    tags:["Next.js","Full-Stack","Course"],
    votes:123,
    isFeatured:false,
  },
]
export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Projects"
            icon={StarIcon}
            description="Top picks from our community"
          />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/products">
            View All <ArrowUpRightIcon className="size-4" />
            </Link>
            </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product)=>
            <ProductCard key={product.id} product={product} />
          )}
        </div>
      </div>
    </section>
  );
}
