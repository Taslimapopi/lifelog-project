import { motion } from "framer-motion";
import { BookOpen, Brain, HeartHandshake, TrendingUp, Lightbulb, Shield, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const benefits = [
  {
    id: 1,
    title: "Real-Life Wisdom",
    description:
      "Life lessons come from real experiences, making them more practical and impactful than theory alone.",
    icon: BookOpen,
    color: "bg-lime-100",
    iconColor: "text-lime-600",
  },
  {
    id: 2,
    title: "Better Decision Making",
    description:
      "Learning from past mistakes helps you make smarter and more confident decisions in the future.",
    icon: Brain,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Emotional Growth",
    description:
      "Reflecting on life experiences builds emotional intelligence and inner strength.",
    icon: HeartHandshake,
    color: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: 4,
    title: "Continuous Self-Improvement",
    description:
      "Every experience teaches something new, helping you grow consistently over time.",
    icon: TrendingUp,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 5,
    title: "Clarity of Thought",
    description:
      "Writing down your experiences organizes your thoughts and gives you a clearer perspective on life's challenges.",
    icon: Lightbulb,
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: 6,
    title: "Build Resilience",
    description:
      "Revisiting tough moments and finding the lessons within them builds the mental strength to face future challenges.",
    icon: Shield,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 7,
    title: "Inspired Living",
    description:
      "Reading others' journeys sparks motivation and reminds you that growth is always possible, no matter where you start.",
    icon: Sparkles,
    color: "bg-secondary-100",
    iconColor: "text-teal-600",
  },
];




const WhyLearningMatters = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Learning From Life Matters
          </h2>
          <p className="mt-4 text-gray-600">
            Life itself is the greatest teacher. Every experience holds a lesson
            that shapes who we become.
          </p>
        </motion.div>

        {/* Swiper Coverflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

         <style>{`
  .swiper-slide {
    transform: scale(0.88);
    transition: transform 0.4s ease;
  }
  .swiper-slide-active {
    transform: scale(1.08) !important;
  }
  .swiper-slide-active > div {
    background-color: var(--color-primary) !important;
    color: black !important;
  }
  .swiper-slide-active > div h3,
  .swiper-slide-active > div p {
    color: white !important;
  }
`}</style>

          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="pb-12"
            style={{ width: "100%" }}
          >
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <SwiperSlide
                  key={item.id}
                  style={{ width: "280px" }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col gap-4 select-none">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full ${item.color}`}
                    >
                      <Icon className={`${item.iconColor} w-7 h-7`} />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyLearningMatters;