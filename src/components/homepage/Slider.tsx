import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import back2school from "@/assets/images/back2school.jpg";
import megaSale from "@/assets/images/mega-sale.png";
import superDiscount from "@/assets/images/super-discount.jpg";
import studentSale from "@/assets/images/studentSale.jpg";

const slides = [
  {
    image: back2school,
    title: "Back to School Sale",
    description: "Get up to 50% off on all school supplies",
  },
  {
    image: superDiscount,
    title: "New Collection",
    description: "Check out our latest premium stationery",
  },
  {
    image: studentSale,
    title: "Student",
    description: "Check out our latest premium stationery",
  },
  {
    image: megaSale,
    title: "Art Supplies",
    description: "Professional art supplies for creative minds",
  },
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-7xl px-4  mt-6 mx-auto">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-[250px] md:h-[500px] object-cover"
              />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            </div> */}
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 cursor-pointer rounded-full ${
                currentSlide === index ? "bg-black/60" : "bg-black/30"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
