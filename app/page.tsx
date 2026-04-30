import ProductSkeleton from "@/components/products/product-skeleton";
import FeaturedProducts from "@/components/ui/landing-page/featured-products";
import HeroSection from "@/components/ui/landing-page/hero-section";
import RecentlyLaunchedproducts from "@/components/ui/landing-page/recently-launched-products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
    <HeroSection />
    <FeaturedProducts />
    <Suspense fallback={<ProductSkeleton />} >
    <RecentlyLaunchedproducts />
    </Suspense>
    </div>
  );
}
