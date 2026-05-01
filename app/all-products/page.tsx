"use cache";

import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllProducts } from "@/lib/products/product-select";
import { LibraryIcon } from "lucide-react";

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="All Products"
            icon={LibraryIcon}
            description="Browse all products submitted to our platform"
          />
        </div>
        <ProductExplorer products={products} />
      </div>
    </div>
  );
}