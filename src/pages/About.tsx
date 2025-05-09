import { motion } from "framer-motion";
import { Users, Heart, Globe, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "5K+", label: "Products" },
  { number: "15+", label: "Years Experience" },
  { number: "50+", label: "Countries Served" },
];

const values = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer First",
    description:
      "We prioritize customer satisfaction in everything we do, ensuring the best shopping experience.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Quality Products",
    description:
      "We carefully curate our collection to bring you the finest stationery products from around the world.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Sustainability",
    description:
      "We're committed to eco-friendly practices and sustainable product sourcing.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description:
      "We strive for excellence in our service, products, and customer support.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With 15 years in the stationery industry, Sarah founded PaperNest with a vision to bring quality writing materials to creative minds worldwide.",
  },
  {
    name: "Michael Chen",
    role: "Creative Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Michael brings his artistic vision and deep understanding of design to curate our unique product collection.",
  },
  {
    name: "Emma Davis",
    role: "Customer Experience",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Emma ensures that every customer interaction with PaperNest is memorable and satisfying.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co.com/4R9WNWB0/rsz-1joanna-kosinska-bf2vsubyhcq-unsplash.jpg"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative text-center text-white max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Crafting Stories Through Stationery
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We believe in the power of putting pen to paper and the magic that
            happens when creativity meets quality stationery.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2009, PaperNest began with a simple mission: to
                provide high-quality stationery that inspires creativity and
                productivity. What started as a small local store has grown into
                a global community of stationery enthusiasts.
              </p>
              <p className="text-gray-600">
                Over the years, we've carefully curated our collection,
                partnering with artisans and manufacturers who share our passion
                for quality and craftsmanship. Every product in our store has
                been selected with our customers' needs in mind.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://i.ibb.co.com/4wmP6mFV/rsz-jason-leung-gwzzetd0ad4-unsplash.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeIn} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product selection
              to customer service.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center p-6 rounded-lg bg-gray-50"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind PaperNest who make it all possible.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Start Your Creative Journey
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover our curated
              collection of premium stationery.
            </p>
            <Button size="lg" variant="secondary" className="group">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
