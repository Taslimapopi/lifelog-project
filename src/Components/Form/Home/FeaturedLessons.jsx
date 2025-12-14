import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxious";
import { Link } from "react-router";


const FeaturedLessons = () => {
  const axios = useAxios();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axios.get("/featured-lessons");
      return res.data;
    },
  });

  // console.log(lessons);

  if (isLoading) return <p className="text-center py-20 text-xl">Loading...</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Featured Life Lessons
        </h2>

        {/* Updated Grid for better card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col md:flex-row border border-gray-100" // Added responsiveness and hover effect
            >
              {/* Image Section - Set to fixed width on larger screens */}
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  // Enforce aspect ratio and cover the container
                  className="h-full w-full object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                />
              </div>

              {/* Content Section - Takes the remaining space */}
              <div className="p-6 md:w-2/3 flex flex-col justify-start">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lesson.title}
                </h3>

                {/* Category */}
                <p className="text-sm font-medium text-indigo-600 mb-3 uppercase tracking-wider">
                  Category: {lesson.category}
                </p>

                {/* Full Description */}
                <p className="text-base text-gray-700 leading-relaxed">
                  {lesson.description}
                </p>

                <Link
                  to={`/lessons/${lesson._id}`}
                  className="btn bg-primary mt-6 self-start px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition duration-150"
                >
                  View Details
                </Link>

                {/* Optional: Add a Read More button or other action */}
                {/* <button className="mt-4 self-start px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition duration-150">
                    Read Lesson
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
