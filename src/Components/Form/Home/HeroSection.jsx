// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const slides = [
//   {
//     image: "/slide1.jpg",
//     tag: "✨ Self Reflection",
//     title: "Every Experience Teaches Something",
//     description:
//       "Life doesn’t teach through comfort. It teaches through moments that challenge us to reflect, adapt, and grow.",
//     cta: "Explore Logs",
//     link: "/public-lessons",
//   },
//   {
//     image: "/slide2.jpg",
//     tag: "🌱 Continuous Growth",
//     title: "True Wisdom Comes From Within",
//     description:
//       "When we pause, write down our experiences, and learn from mistakes, we build a legacy of wisdom for others.",
//     cta: "Share Your Story",
//     link: "/add-lessons",
//   },
//   {
//     image: "/slide3.jpg",
//     tag: "⚡ Powered by AI",
//     title: "Summarize Lessons in Seconds",
//     description:
//       "Use our advanced Gemini AI engine to extract core insights from long stories. Elevate your learning experience.",
//     cta: "View Premium Plans",
//     link: "/pricing",
//   },
// ];

// const SimpleImageSlider = () => {
//   const [index, setIndex] = useState(0);
//   const [animate, setAnimate] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 6000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleNext = () => {
//     setAnimate(false);
//     setTimeout(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//       setAnimate(true);
//     }, 200);
//   };

//   const handlePrev = () => {
//     setAnimate(false);
//     setTimeout(() => {
//       setIndex((prev) => (prev - 1 + slides.length) % slides.length);
//       setAnimate(true);
//     }, 200);
//   };

//   return (
//     <div className="w-full h-[450px] md:h-[600px] relative overflow-hidden rounded-3xl shadow-2xl group border border-base-200">
      
//       {/* Background Image Slider with Smooth Crossfade */}
//       <div className="absolute inset-0 transition-opacity duration-700">
//         <img
//           src={slides[index].image}
//           alt="slider"
//           className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[6000ms] ease-out"
//         />
//       </div>

//       {/* Premium Multi-layered Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
//       <div className="absolute inset-0 bg-gradient-to-t from-base-900/40 via-transparent to-transparent"></div>

//       {/* Main Content Area */}
//       <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10">
//         <div className="max-w-2xl text-white">
          
//           {/* Animated Tagline */}
//           <span 
//             className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 mb-6 tracking-wide uppercase transition-all duration-500 transform ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//             }`}
//           >
//             {slides[index].tag}
//           </span>
          
//           {/* Animated Title */}
//           <h1 
//             className={`text-3xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-md transition-all duration-500 delay-75 transform ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//             }`}
//           >
//             {slides[index].title}
//           </h1>

//           {/* Animated Description */}
//           <p 
//             className={`text-sm md:text-xl text-gray-200 mb-8 font-medium leading-relaxed drop-shadow transition-all duration-500 delay-150 transform ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//             }`}
//           >
//             {slides[index].description}
//           </p>

//           {/* Call-to-action Action Buttons */}
//           <div 
//             className={`flex flex-wrap gap-4 transition-all duration-500 delay-200 transform ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//             }`}
//           >
//             <Link 
//               to={slides[index].link} 
//               className="btn btn-primary text-black font-black hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
//             >
//               {slides[index].cta} <FaArrowRight />
//             </Link>
//             <Link 
//               to="/public-lessons" 
//               className="btn btn-outline border-white/40 hover:border-white text-white hover:bg-white/10 transition-all font-bold"
//             >
//               Browse Library
//             </Link>
//           </div>

//         </div>
//       </div>

//       {/* Left/Right Direction Controls (Visible on hover) */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
//         aria-label="Previous Slide"
//       >
//         <FaChevronLeft className="text-lg" />
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
//         aria-label="Next Slide"
//       >
//         <FaChevronRight className="text-lg" />
//       </button>

//       {/* Modern Slide Indicators (Dots) */}
//       <div className="absolute bottom-6 right-8 md:right-20 flex gap-2 z-20">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => {
//               setAnimate(false);
//               setTimeout(() => {
//                 setIndex(i);
//                 setAnimate(true);
//               }, 200);
//             }}
//             className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
//               i === index ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimpleImageSlider;



import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  // ── আগের ৩টা ──
  {
    image: "/slide1.jpg",
    tag: "✨ Self Reflection",
    title: "Every Experience Teaches Something",
    description:
      "Life doesn't teach through comfort. It teaches through moments that challenge us to reflect, adapt, and grow.",
    cta: "Explore Logs",
    link: "/public-lessons",
  },
  {
    image: "/slide2.jpg",
    tag: "🌱 Continuous Growth",
    title: "True Wisdom Comes From Within",
    description:
      "When we pause, write down our experiences, and learn from mistakes, we build a legacy of wisdom for others.",
    cta: "Share Your Story",
    link: "/add-lessons",
  },
  {
    image: "/slide3.jpg",
    tag: "⚡ Powered by AI",
    title: "Summarize Lessons in Seconds",
    description:
      "Use our advanced AI engine to extract core insights from long stories. Elevate your learning experience.",
    cta: "View Premium Plans",
    link: "/pricing",
  },

  // ── নতুন ৫টা ──
  {
    image: "/slide4.jpg",
    tag: "📖 Daily Journaling",
    title: "Small Notes. Big Transformations.",
    description:
      "A single sentence written today can become the lesson that changes your tomorrow. Start your journaling habit now.",
    cta: "Start Journaling",
    link: "/add-lessons",
  },
  {
    image: "/slide5.jpg",
    tag: "🤝 Community Wisdom",
    title: "Learn From Those Who Lived It",
    description:
      "Thousands of real people sharing real lessons. Discover stories that resonate, inspire, and help you grow faster.",
    cta: "Browse Community",
    link: "/public-lessons",
  },
  {
    image: "/slide6.jpg",
    tag: "🧠 Deep Insights",
    title: "Turn Failures Into Fuel",
    description:
      "Every setback holds a secret lesson. LifeLog helps you uncover patterns in your experiences and turn them into personal breakthroughs.",
    cta: "Explore Insights",
    link: "/public-lessons",
  },
  {
    image: "/slide7.jpg",
    tag: "🔒 Your Private Space",
    title: "A Safe Place for Your Thoughts",
    description:
      "Write freely without judgment. Your private logs stay yours — secure, personal, and always within reach when you need them most.",
    cta: "Write Privately",
    link: "/add-lessons",
  },
  {
    image: "/slide8.jpg",
    tag: "🚀 Level Up Daily",
    title: "Track Your Growth Over Time",
    description:
      "Watch yourself evolve. LifeLog's analytics dashboard shows how your mindset, habits, and wisdom have grown with every entry.",
    cta: "View Dashboard",
    link: "/dashboard",
  },
];

const SLIDE_DURATION = 6000;

// Staggered container — children একে একে animate হবে
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// প্রতিটা text item এর animation
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const containerRef = useRef(null);

  // Timer + progress bar reset ও start
  const startTimer = () => {
    clearTimeout(timerRef.current);
    clearInterval(progressIntervalRef.current);
    setProgress(0);
    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      goNext();
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [index]);

  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Mouse parallax — background image টা mouse follow করবে subtly
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Background image slide transition
  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "6%" : "-6%",
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.04,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-6%" : "6%",
      opacity: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeIn" },
    }),
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-[90vh] relative overflow-hidden rounded-b-3xl shadow-2xl group border border-base-200 -mt-18"
    >
      {/* ── Background: Crossfade + Parallax ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={`bg-${index}`}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{
            translateX: mousePos.x * -10,
            translateY: mousePos.y * -6,
          }}
        >
          <img
            src={slides[index].image}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

      {/* ── Main Content: Staggered Animation ── */}
      <div className="absolute inset-0 flex items-center px-8 md:px-20 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${index}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl text-white"
          >
            {/* Tag */}
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 mb-6 tracking-wide uppercase"
            >
              {slides[index].tag}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-md"
            >
              {slides[index].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-xl text-gray-200 mb-8 font-medium leading-relaxed"
            >
              {slides[index].description}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                to={slides[index].link}
                className="btn btn-primary text-black font-black hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                {slides[index].cta} <FaArrowRight />
              </Link>
              <Link
                to="/public-lessons"
                className="btn btn-outline border-white/40 hover:border-white text-white hover:bg-white/10 transition-all font-bold"
              >
                Browse Library
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Prev / Next Buttons ── */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="text-lg" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 cursor-pointer"
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-lg" />
      </button>

      {/* ── Bottom Bar: Dots + Progress + Counter ── */}
      <div className="absolute bottom-6 left-8 right-8 md:left-20 md:right-20 z-30 flex items-center gap-4">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide Counter */}
        <span className="text-white/40 text-xs font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;