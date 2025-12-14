import { useEffect, useState } from "react";

// 👉 Slide data এখানে থাকবে
const slides = [
  {
    image: "/slide1.jpg",
    title: "Every Experience Teaches Something",
    description:
      "Life doesn’t teach through comfort. It teaches through moments that challenge us to grow.",
  },
  {
    image: "/slide2.jpg",
    title: "Growth Comes From Reflection",
    description:
      "When we pause, reflect, and learn from mistakes, we become stronger than before.",
  },
  {
    image: "/slide3.jpg",
    title: "Consistency Builds Confidence",
    description:
      "Small steps taken every day create lasting change and inner strength.",
  },
];

const SimpleImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[320px] md:h-[420px] relative overflow-hidden rounded-xl">
      <img
        src={slides[index].image}
        alt="slider"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-xl text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            {slides[index].title}
          </h2>
          <p className="text-sm md:text-lg opacity-90">
            {slides[index].description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleImageSlider;
