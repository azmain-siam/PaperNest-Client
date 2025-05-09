import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Pencil,
  Book,
  Palette,
  Scissors,
  Calculator,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../ui/section-header";

const categories = [
  {
    name: "Writing Supplies",
    icon: Pencil,
    description: "Pens, pencils, markers & more",
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-800 dark:text-purple-300",
    borderColor: "border-purple-300 dark:border-purple-800",
  },
  {
    name: "Notebooks & Paper",
    icon: Book,
    description: "Journals, notebooks & paper products",
    color: "bg-pink-100 dark:bg-pink-950",
    textColor: "text-pink-800 dark:text-pink-300",
    borderColor: "border-pink-300 dark:border-pink-800",
  },
  {
    name: "Art Supplies",
    icon: Palette,
    description: "Paints, brushes, canvases & more",
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-800 dark:text-blue-300",
    borderColor: "border-blue-300 dark:border-blue-800",
  },
  {
    name: "Craft Supplies",
    icon: Scissors,
    description: "Scissors, glue, craft paper & more",
    color: "bg-orange-100 dark:bg-orange-950",
    textColor: "text-orange-800 dark:text-orange-300",
    borderColor: "border-orange-300 dark:border-orange-800",
  },
  {
    name: "Office Supplies",
    icon: Calculator,
    description: "Calculators, staplers & organizers",
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-800 dark:text-green-300",
    borderColor: "border-green-300 dark:border-green-800",
  },
  {
    name: "Gift Items",
    icon: Gift,
    description: "Unique stationery gifts & sets",
    color: "bg-yellow-100 dark:bg-yellow-950",
    textColor: "text-yellow-800 dark:text-yellow-300",
    borderColor: "border-yellow-300 dark:border-yellow-800",
  },
];

export function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="container max-w-7xl px-4 mx-auto">
        <SectionHeader
          title="Shop by Category"
          description="Discover our wide range of stationery products organized by category
            to help you find exactly what you need."
        />

        <div className="relative">
          <div className="absolute flex items-center gap-5 justify-center w-full top-full">
            <div className="z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-md bg-background h-10 w-10"
                onClick={scrollLeft}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Scroll left</span>
              </Button>
            </div>
            <div className="z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-md bg-background h-10 w-10"
                onClick={scrollRight}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-6 pt-2 px-2 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="snap-start"
              >
                <Card
                  className={`w-[250px] min-w-[250px] h-full border ${category.borderColor} hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="">
                      <div
                        className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-4 mx-auto`}
                      >
                        <category.icon
                          className={`h-7 w-7 ${category.textColor}`}
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-center mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {category.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className={`w-full mt-4 ${category.textColor}`}
                    >
                      Explore
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
