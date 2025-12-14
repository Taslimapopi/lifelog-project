import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Real-Life Wisdom",
    description:
      "Life lessons come from real experiences, making them more practical and impactful than theory alone.",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Better Decision Making",
    description:
      "Learning from past mistakes helps you make smarter and more confident decisions in the future.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Emotional Growth",
    description:
      "Reflecting on life experiences builds emotional intelligence and inner strength.",
    icon: HeartHandshake,
  },
  {
    id: 4,
    title: "Continuous Self-Improvement",
    description:
      "Every experience teaches something new, helping you grow consistently over time.",
    icon: TrendingUp,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const WhyLearningMatters = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Learning From Life Matters
          </h2>
          <p className="mt-4 text-gray-600">
            Life itself is the greatest teacher. Every experience holds a lesson
            that shapes who we become.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 mb-5">
                  <Icon className="text-lime-600 w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;
