"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="max-w-7xl py-16 px-4 mx-auto">
      <motion.div
        className="bg-gradient-to-r from-[#E55050]/10 to-[#FF7A7A]/20 dark:from-[#E55050]/90 dark:to-[#9D2424] rounded-2xl p-8 md:p-12 shadow-lg border border-[#E55050]/20 dark:border-[#E55050]/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Mail className="h-8 w-8 text-[#E55050]" />
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Stay in the Loop
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter for exclusive deals, creative
            inspiration, and be the first to know about new products and special
            offers.
          </motion.p>

          {!submitted ? (
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-slate-800 border-purple-200 dark:border-purple-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-[#E55050] hover:bg-[#C73A3A] transition-all"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing
                  </span>
                ) : (
                  <span className="flex items-center">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 max-w-md mx-auto">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Thank you for subscribing! Check your email for a
                  confirmation.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.p
            variants={itemVariants}
            className="text-xs text-muted-foreground mt-4"
          >
            By subscribing, you agree to receive marketing emails from
            PaperNest. You can unsubscribe at any time.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
