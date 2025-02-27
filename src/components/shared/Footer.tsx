import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">PaperNest</h1>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Your one-stop shop for all things stationery. Quality products for
              creative minds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              {/* <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li> */}
            </ul>
          </div>

          {/* Customer Service */}
          {/* <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/shipping" className="hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>123 Stationery Street</li>
              <li>Craft City, ST 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@papernest.com</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 PaperNest. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
