import EmptyState from "@/components/common/empty-state";
import SectionHeader from "@/components/common/section-header";
import ProductCard from "@/components/products/product-card";
import { RocketIcon,CalendarIcon } from "lucide-react";

const recentlyLaunchedProducts=[
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
export default function RecentlyLaunchedproducts(){
    return (
        <section className="py-20">
            <div className="wrapper space-y-12">
                <SectionHeader 
                    title="Recently launched"
                    icon={RocketIcon}
                    description="Discover the latest products from our community"
                    />
                    {recentlyLaunchedProducts.length>0 ?
                    <div className="grid-wrapper">
                          {recentlyLaunchedProducts.map((product)=>(
                            <ProductCard key={product.id} product={product} />
                          ))} 
                            </div> :(
                                <EmptyState icon={CalendarIcon} message="No products launched in the last week.Check back soon for new launche.!" />
                            )}
            </div>
        </section>
    )
}