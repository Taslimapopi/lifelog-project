import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image: "/slide1.jpg",
    tag: "✨ Self Reflection",
    title: "Every Experience Teaches Something",
    description:
      "Life doesn’t teach through comfort. It teaches through moments that challenge us to reflect, adapt, and grow.",
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
      "Use our advanced Gemini AI engine to extract core insights from long stories. Elevate your learning experience.",
    cta: "View Premium Plans",
    link: "/pricing",
  },
];

const SimpleImageSlider = () => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setAnimate(true);
    }, 200);
  };

  const handlePrev = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimate(true);
    }, 200);
  };

  return (
    <div className="w-full h-[450px] md:h-[600px] relative overflow-hidden rounded-3xl shadow-2xl group border border-base-200">
      
      {/* Background Image Slider with Smooth Crossfade */}
      <div className="absolute inset-0 transition-opacity duration-700">
        <img
          src={slides[index].image}
          alt="slider"
          className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[6000ms] ease-out"
        />
      </div>

      {/* Premium Multi-layered Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-base-900/40 via-transparent to-transparent"></div>

      {/* Main Content Area */}
      <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10">
        <div className="max-w-2xl text-white">
          
          {/* Animated Tagline */}
          <span 
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 mb-6 tracking-wide uppercase transition-all duration-500 transform ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {slides[index].tag}
          </span>
          
          {/* Animated Title */}
          <h1 
            className={`text-3xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-md transition-all duration-500 delay-75 transform ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {slides[index].title}
          </h1>

          {/* Animated Description */}
          <p 
            className={`text-sm md:text-xl text-gray-200 mb-8 font-medium leading-relaxed drop-shadow transition-all duration-500 delay-150 transform ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {slides[index].description}
          </p>

          {/* Call-to-action Action Buttons */}
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-500 delay-200 transform ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
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
          </div>

        </div>
      </div>

      {/* Left/Right Direction Controls (Visible on hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="text-lg" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-lg" />
      </button>

      {/* Modern Slide Indicators (Dots) */}
      <div className="absolute bottom-6 right-8 md:right-20 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAnimate(false);
              setTimeout(() => {
                setIndex(i);
                setAnimate(true);
              }, 200);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleImageSlider;
