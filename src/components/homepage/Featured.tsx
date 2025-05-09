import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/pages/AllProducts";
import { Link } from "react-router-dom";
import ProductCard from "../productsPage/ProductCard";
import SectionHeader from "../ui/section-header";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedProducts() {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const products = data?.data;
  // const { data: products } = data;
  if (isLoading) {
    return;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 ">
        <SectionHeader
          title="Featured Products"
          description="Discover our most popular items"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.slice(0, 8).map((product: IProduct) => (
            <motion.div key={product._id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:scale-105 transition-transform"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
