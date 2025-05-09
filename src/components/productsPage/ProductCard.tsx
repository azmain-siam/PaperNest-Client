import { IProduct } from "@/pages/AllProducts";
import { motion } from "framer-motion";
import placeholder from "@/assets/images/card-placeholder.jpeg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "../shared/Navbar";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }: { product: IProduct }) => {
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (productId: string) => {
    // console.log(data);
    const cartData = {
      productId,
      quantity: 1,
      userId: user?.id,
    };

    const { data } = await addToCart(cartData);
    if (data.statusCode === 201) {
      toast.success("Product added to cart successfully", { duration: 3000 });
    }
  };
  return (
    <motion.div
      key={product._id}
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      // viewport={{ once: true }}
      className="group shadow-md hover:shadow-lg h-full rounded-lg dark:border flex flex-col"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg rounded-b-none bg-gray-100">
        <img
          src={product.image || placeholder}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-3 p-4 pt-0 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h3 className="text-base font-medium">{product.name}</h3>
            <p className="text-base font-medium text-primary">
              ${product.price}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {product.description.length > 100
              ? product.description.slice(0, 100) + "..."
              : product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{product.category}</Badge>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleAddToCart(product._id)}
              variant={"outline"}
              className="px-2"
            >
              <ShoppingCart />
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to={`/products/${product._id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
