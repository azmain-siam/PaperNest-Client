import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
}

const categories = [
  "All Categories",
  "Notebooks",
  "Writing Tools",
  "Art Supplies",
  "Office Supplies",
  "Paper Products",
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Premium Leather Journal",
    price: 29.99,
    category: "Notebooks",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality leather journal with premium paper.",
  },
  {
    id: 2,
    name: "Fountain Pen Set",
    price: 89.99,
    category: "Writing Tools",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
    description: "Elegant fountain pen set with multiple nibs.",
  },
  {
    id: 3,
    name: "Artist Sketchbook",
    price: 19.99,
    category: "Art Supplies",
    inStock: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Professional grade sketchbook for artists.",
  },
  // Add more products as needed
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showInStock, setShowInStock] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter products based on all criteria
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Stock filter
    if (showInStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Update active filters
    const newActiveFilters: string[] = []; 
    if (selectedCategory !== "All Categories")
      newActiveFilters.push(selectedCategory);
    if (showInStock) newActiveFilters.push("In Stock Only");
    if (priceRange[0] > 0 || priceRange[1] < 100)
      newActiveFilters.push(`$${priceRange[0]} - $${priceRange[1]}`);
    setActiveFilters(newActiveFilters);

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, showInStock, products]);

  const removeFilter = (filter: string) => {
    if (filter === "In Stock Only") {
      setShowInStock(false);
    } else if (filter.includes("$")) {
      setPriceRange([0, 100]);
    } else {
      setSelectedCategory("All Categories");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">
            Browse our collection of premium stationery
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Price Range (${priceRange[0]} - ${priceRange[1]})
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showInStock}
                    onCheckedChange={(checked) =>
                      setShowInStock(checked as boolean)
                    }
                  />
                  <Label htmlFor="inStock">Show only in-stock items</Label>
                </div>
              </div>

              <SheetFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setPriceRange([0, 100]);
                    setShowInStock(false);
                  }}
                >
                  Reset Filters
                </Button>
                <Button onClick={() => setIsFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-1 hover:text-primary"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">
              No products found matching your criteria
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
                setPriceRange([0, 100]);
                setShowInStock(false);
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-medium text-primary">
                      ${product.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Button variant="link" size="sm" asChild>
                      <a href={`/products/${product.id}`}>View Details</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
