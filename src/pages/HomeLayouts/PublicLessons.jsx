import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import LessonCard from "../../Components/Form/Home/LessonCard";

const PublicLessons = () => {
  const [page, setPage] = useState(0);
  const limit = 6; // প্রতি পেজে ৬টি item

  const { data, isLoading } = useQuery({
    queryKey: ["publicLessons", page],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public-lessons?page=${page}&limit=${limit}`
      );
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalPages = Math.ceil(data.total / limit);

  // pagination buttons array
  const pages = [...Array(totalPages).keys()]; // [0,1,2,3,4...]

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-center">
        All Public Lessons ({data.total})
      </h2>

      {/* Lessons Grid */}
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        {data.data.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>

      {/* Number Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded border 
              ${
                num === page
                  ? "bg-lime-500 text-white border-lime-500"
                  : "bg-white text-gray-700 border-gray-300"
              }
            `}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PublicLessons;
