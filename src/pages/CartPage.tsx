import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import placeholder from "@/assets/images/card-placeholder.jpeg";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cartApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser } from "@/components/shared/Navbar";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useAddOrderMutation } from "@/redux/features/orders/ordersApi";
import { Link } from "react-router-dom";
// import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import StripePaymentModal from "@/components/checkout/CheckoutForm";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";

export interface CartItem {
  productId: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
  };
  cartQuantity: number;
  _id: string;
}

export default function CartPage() {
  const user = useAppSelector(useCurrentUser) as IUser | null;
  const { data: cartData, isLoading, refetch } = useGetCartQuery(user?.id);
  const [updateCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addOrder, { error }] = useAddOrderMutation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<CartItem[]>([]);
  const { data, isLoading: isUserLoading } = useGetUserByIdQuery({
    userId: user?.id,
  });
  const userData = data?.data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        address: userData.address || "",
      }));
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setCartItems(cartData?.data?.items);
  }, [cartData]);

  useEffect(() => {
    setQuantity(cartItems);
  }, [cartItems]);

  const handleIncrease = (item: CartItem) => {
    setQuantity((prev) => {
      return prev.map((cartItem) => {
        if (cartItem.productId._id === item.productId._id) {
          return { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 };
        }
        return cartItem;
      });
    });
  };

  const handleDecrease = (item: CartItem) => {
    setQuantity((prev) => {
      return prev.map((cartItem) => {
        if (cartItem.productId._id === item.productId._id) {
          return { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 };
        }
        return cartItem;
      });
    });
  };

  const handleRemoveCartItem = async (itemId: string) => {
    // console.log(data, "data");
    const deleteItem = {
      cartId: cartData.data._id,
      itemId,
    };
    await removeFromCart(deleteItem);
    refetch();
    toast.success("Removed item from cart!");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cartItems.forEach((item, idx) => {
        updateCart({
          userId: user?.id,
          productId: item.productId._id,
          quantity: quantity[idx].cartQuantity,
        });
      });
    }, 1000); // Debounce API call

    return () => clearTimeout(timer);
  }, [cartItems, updateCart, quantity, user]);

  const subtotal = cartItems?.reduce(
    (sum, item, idx) =>
      sum + item.productId.price * quantity?.[idx]?.cartQuantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleSubmit = async () => {
    const products = cartItems.map((item, idx) => {
      return {
        productId: item.productId,
        quantity: item.cartQuantity,
        totalPrice: (
          item.productId.price * quantity?.[idx]?.cartQuantity
        ).toFixed(2),
      };
    });

    const formData = {
      user: user?.id,
      products,
      totalAmount: total.toFixed(2),
    };

    const res = await addOrder(formData);

    if (res?.data?.success) {
      toast.success(res.data.message);
      refetch();
    }
    if (error && "status" in error && "data" in error && error.status === 400) {
      const errorData = error.data as { message?: string };
      toast.error(errorData?.message);
    }
  };

  // const handleSubmitt = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);

  //   if (card === null) {
  //     return;
  //   }

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card,
  //   });

  //   if (error) {
  //     // console.log("[error]", error);
  //     setIsError(error.message);
  //   } else {
  //     console.log("[PaymentMethod]", paymentMethod);
  //     setIsError("");
  //   }

  //   // confirm payment
  //   const { paymentIntent, error: confirmError } =
  //     await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: card,
  //         billing_details: {
  //           email: user?.email || "annonymous",
  //           name: user?.displayName || "annonymous",
  //         },
  //       },
  //     });

  //   if (confirmError) {
  //     console.log("confirm error", confirmError.message);
  //   } else {
  //     // console.log("payment intent", paymentIntent);
  //     if (paymentIntent.status === "succeeded") {
  //       Swal.fire({
  //         title: "Payment Successful!",
  //         icon: "success",
  //       });
  //       const payment = {
  //         email: user.email,
  //         name: user.displayName,
  //         transactionId: paymentIntent.id,
  //         amount: price,
  //         data: new Date(),
  //         status: "success",
  //       };
  //       try {
  //         const { data } = await axiosSecure.post("/funds", payment);
  //         navigate("/fundings");
  //         return data;
  //       } catch (err) {
  //         toast.error(err.message);
  //       }
  //     }
  //   }
  // };

  if (isLoading || !quantity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          {cartItems?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your cart is empty</p>
              <Button className="mt-4" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems?.map((item: CartItem, idx) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={placeholder}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productId.name}</h3>
                    <p className="text-sm text-gray-500">
                      Stock: {item.productId.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        // onClick={() =>
                        //   updateQuantity(item.id, item.quantity - 1)
                        // }
                        onClick={() => handleDecrease(item)}
                        disabled={quantity[idx]?.cartQuantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">
                        {quantity[idx]?.cartQuantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncrease(item)}
                        disabled={
                          quantity[idx]?.cartQuantity >= item.productId.quantity
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      $
                      {(
                        item.productId.price * quantity?.[idx]?.cartQuantity
                      ).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveCartItem(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Complete your purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 font-medium flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input onChange={handleChange} id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={handleChange}
                      id="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      onChange={handleChange}
                      id="address"
                      required
                      defaultValue={userData?.address}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input onChange={handleChange} id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input onChange={handleChange} id="postal" required />
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col">
                <StripePaymentModal
                  handleSubmit={handleSubmit}
                  amount={total}
                  formData={formData}
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
