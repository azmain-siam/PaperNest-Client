import { motion } from "framer-motion";

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
    </motion.div>
  );
};

export default SectionHeader;
