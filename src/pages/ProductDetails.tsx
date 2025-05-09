import placeholder from "@/assets/images/card-placeholder.jpeg";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Star, Truck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/products/productsApi";
import { IProduct } from "./AllProducts";
// import { u } from "node_modules/framer-motion/dist/types.d-6pKw1mTI";
import ProductCard from "@/components/productsPage/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/components/shared/Navbar";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { toast } from "sonner";
import { Loader } from "@/components/shared/Loader";

const ProductDetails = () => {
  const { productId } = useParams();
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const { data, isLoading } = useGetProductByIdQuery(productId);
  const { data: response, isLoading: isProductsLoading } =
    useGetAllProductsQuery(undefined);
  const [addToCart] = useAddToCartMutation();
  const products: IProduct[] = response?.data;
  const product: IProduct = data?.data;
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async (productId: string) => {
    // console.log(data);
    const cartData = {
      productId,
      quantity,
      userId: user?.id,
    };

    const { data } = await addToCart(cartData);
    if (data.statusCode === 201) {
      toast.success("Product added to cart successfully", { duration: 3000 });
    }
  };

  if (isLoading || isProductsLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4  py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
            <motion.img
              // key={selectedImage.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.image || placeholder}
              alt={"selectedImage.alt"}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(124 reviews)</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              ${product.price}
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          {/* <div className="space-y-2">
            <h3 className="font-medium">Color</h3>
            <div className="flex space-x-2">
              {["bg-brown-500", "bg-black", "bg-blue-700"].map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-8 w-8 rounded-full ${color} border-2 border-white ring-2 ring-gray-200`}
                />
              ))}
            </div>
          </div> */}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => handleAddToCart(product._id)}
              className="w-full h-12 text-lg cursor-pointer"
            >
              Add to Cart
            </Button>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-5 w-5 text-gray-400" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RefreshCw className="h-5 w-5 text-gray-400" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-5 w-5 text-gray-400" />
              <span>2-Year Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>
                This premium leather journal is the perfect companion for your
                thoughts, ideas, and creative endeavors. Handcrafted from
                genuine leather, each journal develops a unique patina over
                time, making it truly one of a kind.
              </p>
              <p className="mt-4">
                The 240 pages of acid-free paper are perfect for use with
                various writing instruments, from fountain pens to pencils. The
                paper is thick enough to prevent bleed-through, making it ideal
                for both single and double-sided use.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Dimensions</h4>
                  <p className="text-gray-600">8.5 x 5.5 inches</p>
                </div>
                <div>
                  <h4 className="font-medium">Paper Weight</h4>
                  <p className="text-gray-600">120 GSM</p>
                </div>
                <div>
                  <h4 className="font-medium">Number of Pages</h4>
                  <p className="text-gray-600">240 pages (120 sheets)</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Material</h4>
                  <p className="text-gray-600">Genuine Leather Cover</p>
                </div>
                <div>
                  <h4 className="font-medium">Binding</h4>
                  <p className="text-gray-600">Sewn Binding</p>
                </div>
                <div>
                  <h4 className="font-medium">Features</h4>
                  <p className="text-gray-600">
                    Ribbon Bookmark, Elastic Closure
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-6 last:border-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${
                            j < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">John Doe</span>
                  </div>
                  <p className="text-gray-600">
                    Great quality journal! The leather is beautiful and the
                    paper quality is excellent. Perfect for my daily journaling
                    practice.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
