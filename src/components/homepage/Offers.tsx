"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const offers = [
  {
    title: "Free Shipping Over $30",
    desc: "Skip the delivery fee on all orders above $30",
    tag: "Limited Time",
    code: "FREESHIP30",
  },
  {
    title: "Flat 20% Off",
    desc: "On premium art notebooks this week.",
    tag: "Hot Deal",
    code: "ART20",
  },
  {
    title: "Welcome Offer",
    desc: "First-time buyer? Enjoy 10% off.",
    tag: "New",
    code: "WELCOME10",
  },
];

export default function SpecialOffers() {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon copied!", {
      description: `Code: ${code}`,
    });
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl px-4 mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Special Offers</h2>
        <p className="text-gray-600">
          Use these exclusive coupon codes during checkout and save big!
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-sm bg-white hover:shadow-md transition">
                <CardContent className="p-6 space-y-4">
                  <span className="text-sm inline-block px-3 py-1 bg-secondary text-primary rounded-full font-medium">
                    {offer.tag}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {offer.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{offer.desc}</p>

                  <div className="flex items-center justify-between mt-2 p-2 pl-3 border rounded-md bg-gray-50">
                    <code className="font-mono text-lg font-bold text-primary">
                      {offer.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(offer.code)}
                    >
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                  </div>

                  {/* <Button className="w-full mt-4">Shop Now</Button> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
