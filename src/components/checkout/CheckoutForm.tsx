import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetClientSecretMutation } from "@/redux/features/orders/ordersApi";

interface IFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY as string);

const CheckoutForm = ({
  onSuccess,
  handleFormSubmit,
  amount,
}: {
  onSuccess: () => void;
  handleFormSubmit: () => void;
  amount: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getClientSecret] = useGetClientSecretMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { data } = await getClientSecret({
      amount: amount,
      currency: "USD",
    });

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret, // Secret key from .env
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      handleFormSubmit();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded-lg" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

const StripePaymentModal = ({
  handleSubmit,
  formData,
  amount,
}: {
  handleSubmit: () => void;
  formData: IFormData;
  amount: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Elements stripe={stripePromise}>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="w-full">
          <Button
            disabled={
              !(
                formData.name &&
                formData.email &&
                formData.address &&
                formData.city &&
                formData.postal
              )
            }
            onClick={() => setOpen(true)}
            className="w-full"
          >
            Pay with Stripe
          </Button>
        </div>

        <DialogContent className="max-w-md p-6">
          <h2 className="text-lg font-semibold mb-4">Enter Payment Details</h2>
          <CheckoutForm
            onSuccess={() => setOpen(false)}
            handleFormSubmit={handleSubmit}
            amount={amount}
          />
        </DialogContent>
      </Dialog>
    </Elements>
  );
};

export default StripePaymentModal;
