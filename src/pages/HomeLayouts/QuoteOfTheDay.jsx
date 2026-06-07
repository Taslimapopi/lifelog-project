import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteOfTheDay() {
  const [quotes, setQuotes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .get("https://lifelog-server.vercel.app/quotes-all")
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Auto rotate — প্রতি 5 সেকেন্ডে
  useEffect(() => {
    if (quotes.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes]);

  const initials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const copyQuote = () => {
    const quote = quotes[current];
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (quotes.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const quote = quotes[current];

  return (
    <div>
      {/* Section Title */}
      <div className="text-center mt-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Words That <span className="text-primary">Inspire</span>
        </h2>
        <p className="text-base-content/60 text-sm md:text-base max-w-md mx-auto">
          A new quote every day to fuel your journey of growth and reflection.
        </p>
      </div>
      <section className="relative py-16 pb-4 overflow-hidden">
        {/* Background blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-[32px] bg-base-100/80 backdrop-blur-xl border border-base-300 shadow-2xl overflow-hidden"
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />

          <div className="p-8 md:pt-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              Quote of the Day
            </div>
            {/* Section Title */}

            {/* Quote — AnimatePresence দিয়ে smooth transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
              >
                {/* Big quote icon */}
                <div className="text-7xl text-primary/20 mb-4">❝</div>

                {/* Quote text */}
                <blockquote className="text-xl md:text-3xl leading-relaxed italic font-medium border-l-4 border-primary pl-6">
                  "{quote.text}"
                </blockquote>

                {/* Author */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/15 ring ring-primary/30 flex items-center justify-center font-bold text-primary">
                      {initials(quote.author)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{quote.author}</h3>
                      <p className="text-sm opacity-60">Inspirational Author</p>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyQuote}
                    className="btn btn-primary"
                  >
                    {copied ? "✓ Copied" : "📋 Copy Quote"}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 pb-6">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-base-300"
                }`}
              />
            ))}
          </div>

          {/* Progress bar  */}
          <motion.div
            key={current}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"
          />
        </motion.div>
      </section>
    </div>
  );
}
