import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/pages/AllProducts";
import placeholder from "@/assets/images/card-placeholder.jpeg";
import { Link } from "react-router-dom";

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
    <section className="py-12 bg-gray-50">
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
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-lg duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image || placeholder}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-primary font-bold">${product.price}</p>
                <Button
                  className="w-full mt-4 transition-transform active:scale-95 duration-300 cursor-pointer"
                  // whileHover={{ scale: 1.02 }}
                >
                  Add to Cart
                </Button>
              </div>
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
