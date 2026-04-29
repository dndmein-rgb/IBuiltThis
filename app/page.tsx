import FeaturedProducts from "@/components/ui/landing-page/featured-products";
import HeroSection from "@/components/ui/landing-page/hero-section";
import RecentlyLaunchedproducts from "@/components/ui/landing-page/recently-launched-products";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
    <HeroSection />
    <FeaturedProducts />
    <Suspense fallback={<div className="wrapper items-center gap-2">Loading recently launched products...
      <LoaderIcon className="size-4 animate-spin" />
    </div>} >
    <RecentlyLaunchedproducts />
    </Suspense>
    </div>
  );
}
