import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import useAxios from "../../../hooks/useAxious";

const FeaturedLessons = () => {
  const axios = useAxios();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axios.get("/featured-lessons");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-base-200 py-24">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/15 blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/15 blur-[140px] animate-float-medium"></div>
        </div>

        <div className="relative z-10 flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-base-200/40 py-24">

      {/* Animated Mesh */}
      <div className="absolute inset-0">

        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[130px] animate-float-slow"></div>

        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[150px] animate-float-medium"></div>

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[130px] animate-float-fast"></div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}

        <div className="mb-14 text-center">

          <span className="badge badge-primary badge-outline px-5 py-3">
            Featured Collection
          </span>

          <h2 className="mt-5 text-4xl font-bold text-base-content md:text-5xl">
            Featured Life Lessons
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-base-content/70">
            Explore hand-picked stories and meaningful experiences shared by our
            community to inspire your personal growth.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-2">

          {lessons.map((lesson) => (

            <article
              key={lesson._id}
              className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-primary/10
              bg-base-100/80
              backdrop-blur-xl
              shadow-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-primary/20
            "
            >
              <div className="flex flex-col md:flex-row">

                {/* Image */}

                <div className="relative h-52 md:w-60 overflow-hidden">

                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col p-6">

                  <div className="badge badge-primary badge-outline w-fit">
                    {lesson.category}
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-base-content">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-base-content/70 line-clamp-3">
                    {lesson.description.slice(0, 120)}...
                  </p>

                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="
                    btn
                    btn-primary
                    btn-sm
                    mt-5
                    w-fit
                    gap-2
                  "
                  >
                    Read Lesson

                    <ArrowRight
                      size={16}
                      className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    />

                  </Link>

                </div>

              </div>
            </article>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedLessons;