import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 10 Bullet Journal Ideas",
    excerpt: "Get creative with your journaling with these inspiring ideas...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 15, 2024",
  },
  {
    id: 2,
    title: "Essential Art Supplies for Beginners",
    excerpt: "Starting your art journey? Here's what you need...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 10, 2024",
  },
  {
    id: 3,
    title: "How to Organize Your Desk",
    excerpt: "Tips and tricks for a productive workspace...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Feb 5, 2024",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BlogSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600">
            Tips, tricks, and inspiration for your creative journey
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={item}
              // whileHover={}
              className="bg-white dark:bg-transparent dark:border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <motion.a
                  href={`/blog/${blog.id}`}
                  className="text-primary font-medium hover:underline inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Read More →
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
