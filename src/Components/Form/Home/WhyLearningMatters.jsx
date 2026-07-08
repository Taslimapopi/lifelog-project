import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  HeartHandshake,
  TrendingUp,
  Lightbulb,
  Shield,
  Sparkles,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
} from "swiper/modules";

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
  },
  {
    id: 2,
    title: "Better Decision Making",
    description:
      "Learning from past mistakes helps you make smarter and more confident decisions.",
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
    title: "Continuous Growth",
    description:
      "Every experience teaches something new and helps you improve every day.",
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Clarity of Thought",
    description:
      "Writing down your experiences helps organize thoughts and gain clarity.",
    icon: Lightbulb,
  },
  {
    id: 6,
    title: "Build Resilience",
    description:
      "Finding lessons inside difficult moments develops mental strength.",
    icon: Shield,
  },
  {
    id: 7,
    title: "Inspired Living",
    description:
      "Reading others' journeys inspires hope, confidence and motivation.",
    icon: Sparkles,
  },
];

const WhyLearningMatters = () => {
  return (
    <section className="relative overflow-hidden bg-base-200 py-24">

      {/* Animated Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[130px] animate-pulse"></div>

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-[150px] animate-pulse"></div>

        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[140px] animate-pulse"></div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="badge badge-primary badge-outline px-5 py-4">
            Learn • Grow • Inspire
          </span>

          <h2 className="mt-5 text-4xl font-bold text-base-content md:text-5xl">
            Why Learning From Life Matters
          </h2>

          <p className="mt-5 text-lg leading-8 text-base-content/70">
            Every experience carries a lesson. Learn from your own journey,
            discover the wisdom of others, and become a better version of
            yourself.
          </p>
        </motion.div>

        <style>{`

.swiper-slide{

transform:scale(.88);

opacity:.65;

transition:.45s;

}

.swiper-slide-active{

transform:scale(1.05)!important;

opacity:1;

}

.swiper-slide-active .card{

background:linear-gradient(135deg,#50E3C2,#0f766e);

color:white;

box-shadow:0 30px 70px rgba(0,0,0,.22);

}

.swiper-slide-active h3{

color:white!important;

}

.swiper-slide-active p{

color:rgba(255,255,255,.88)!important;

}

.swiper-slide-active .icon{

background:rgba(255,255,255,.18);

}

.swiper-slide-active svg{

color:white!important;

}

`}</style>

        <Swiper
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          grabCursor
          loop
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 28,
            stretch: 0,
            depth: 130,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[
            EffectCoverflow,
            Pagination,
            Autoplay,
          ]}
          className="pb-12"
        >
          {benefits.map((item) => {

            const Icon = item.icon;

            return (

              <SwiperSlide
                key={item.id}
                style={{
                  width: "300px",
                }}
              >
                <div
                  className="
                  card
                  rounded-3xl
                  border
                  border-base-300
                  bg-base-100/85
                  backdrop-blur-xl
                  p-8
                  shadow-xl
                  transition-all
                  duration-500
                  h-full
                "
                >

                  <div
                    className="
                    icon
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    transition
                  "
                  >
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-base-content">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-base-content/70">
                    {item.description}
                  </p>

                </div>
              </SwiperSlide>

            );

          })}
        </Swiper>

      </div>
    </section>
  );
};

export default WhyLearningMatters;