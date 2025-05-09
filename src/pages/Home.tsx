import BlogSection from "@/components/homepage/Blogs";
import { CategoriesSection } from "@/components/homepage/Categories";
import FeaturedProducts from "@/components/homepage/Featured";
import Hero from "@/components/homepage/Hero";
import { NewsletterSection } from "@/components/homepage/Newsletter";
import OffersSection from "@/components/homepage/Offers";
// import { OffersSection } from "@/components/homepage/Offers";
import BannerSlider from "@/components/homepage/Slider";
import Testimonials from "@/components/homepage/Testimonials";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <Hero />
      <OffersSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BlogSection />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default Home;
