import BlogSection from "@/components/homepage/Blogs";
import FeaturedProducts from "@/components/homepage/Featured";
import Hero from "@/components/homepage/Hero";
import BannerSlider from "@/components/homepage/Slider";
import Testimonials from "@/components/homepage/Testimonials";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <Hero />
      <FeaturedProducts />
      <BlogSection />
      <Testimonials />
    </div>
  );
};

export default Home;
