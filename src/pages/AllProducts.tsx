import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductCard from "@/components/productsPage/ProductCard";
import FilterSidebar from "@/components/productsPage/FilterSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface IProduct {
  _id: string;
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
  "Writing",
  "Office Supplies",
  "Art Supplies",
  "Educational",
  "Technology",
];

export default function ProductsPage() {
  const { data } = useGetAllProductsQuery(undefined);
  const products = data?.data;
  // const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showInStock, setShowInStock] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter products based on all criteria
  useEffect(() => {
    if (!products) return;
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

    if (priceRange[0] > 0 || priceRange[1] < 500)
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
    <div className="max-w-7xl mx-auto px-4  py-12">
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

          {/* filter sidebar */}
          <FilterSidebar
            setIsFiltersOpen={setIsFiltersOpen}
            isFiltersOpen={isFiltersOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            showInStock={showInStock}
            setShowInStock={setShowInStock}
          />
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
        {filteredProducts?.length === 0 ? (
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
