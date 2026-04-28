import FeaturedProducts from "@/components/ui/landing-page/featured-products";
import HeroSection from "@/components/ui/landing-page/hero-section";
import RecentlyLaunchedproducts from "@/components/ui/landing-page/recently-launched-products";

export default function Home() {
  return (
    <div>
    <HeroSection />
    <FeaturedProducts />
    <RecentlyLaunchedproducts />
    </div>
  );
}
