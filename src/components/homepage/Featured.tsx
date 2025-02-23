import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/pages/AllProducts";
import { Link } from "react-router-dom";
import ProductCard from "../productsPage/ProductCard";

// const products = [
//   {
//     id: 1,
//     name: "Premium Notebook",
//     price: 12.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: 2,
//     name: "Fountain Pen Set",
//     price: 24.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: 3,
//     name: "Colored Pencils",
//     price: 9.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: 4,
//     name: "Desk Organizer",
//     price: 19.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: 5,
//     name: "Washi Tape Set",
//     price: 7.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: 6,
//     name: "Art Journal",
//     price: 15.99,
//     image: "/placeholder.svg?height=300&width=300",
//   },
// ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover our most popular items</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.slice(0, 6).map((product: IProduct) => (
            <motion.div
              key={product._id}
              variants={item}
            >
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
