import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";

interface IFilterSidebarProps {
  setIsFiltersOpen: (open: boolean) => void;
  isFiltersOpen: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  priceRange: number[];
  setPriceRange: (range: [number, number]) => void;
  showInStock: boolean;
  setShowInStock: (inStock: boolean) => void;
}

const FilterSidebar = ({
  setIsFiltersOpen,
  isFiltersOpen,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceRange,
  setPriceRange,
  showInStock,
  setShowInStock,
}: IFilterSidebarProps) => {
  return (
    <div className="font-primary">
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

            <div className="flex flex-col space-y-4">
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
  );
};

export default FilterSidebar;
