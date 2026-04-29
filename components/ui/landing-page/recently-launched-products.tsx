import EmptyState from "@/components/common/empty-state";
import SectionHeader from "@/components/common/section-header";
import ProductCard from "@/components/products/product-card";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";
import { RocketIcon,CalendarIcon } from "lucide-react";

export default async function RecentlyLaunchedproducts(){
  const recentlyLaunchedProducts=await getRecentlyLaunchedProducts();
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