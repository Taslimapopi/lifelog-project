import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Track Your Life Lessons",
    description:
      "Capture your personal growth journey by saving meaningful life lessons and experiences.",
    bg: "/hero1.jpg",
  },
  {
    id: 2,
    title: "Learn From Others",
    description:
      "Explore public lessons shared by people around the world and grow together.",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Unlock Premium Wisdom",
    description:
      "Upgrade to premium and access exclusive lessons designed for deep personal growth.",
    bg: "bg-gradient-to-r from-purple-500 to-pink-600",
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 flex items-center justify-center ${slides[index].bg}`}
        >
          <div className="text-center text-white px-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {slides[index].title}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {slides[index].description}
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:scale-105 transition">
                Get Started
              </button>
              <button className="px-6 py-3 border border-white rounded-full font-semibold hover:bg-white hover:text-gray-800 transition">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
