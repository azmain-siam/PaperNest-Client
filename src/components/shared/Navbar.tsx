"use client";

import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              PaperNest
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <a href="/products" className="hover:text-primary">
                Products
              </a>
              <a href="/about" className="hover:text-primary">
                About
              </a>
              <a href="/contact" className="hover:text-primary">
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md hover:bg-accent">
            Home
          </a>
          <a
            href="/products"
            className="block px-3 py-2 rounded-md hover:bg-accent"
          >
            Products
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded-md hover:bg-accent"
          >
            About
          </a>
          <a
            href="/contact"
            className="block px-3 py-2 rounded-md hover:bg-accent"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
