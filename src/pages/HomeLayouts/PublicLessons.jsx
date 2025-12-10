import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import LessonCard from "../../Components/Form/Home/LessonCard";

const PublicLessons = () => {
  const [page, setPage] = useState(0);
  const limit = 8;

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("newest");

  const { data, isLoading } = useQuery({
    queryKey: ["publicLessons", page, search, category, tone, sort],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public-lessons`,
        {
          params: { page, limit, search, category, tone, sort },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalPages = Math.ceil(data.total / limit);
  const pages = [...Array(totalPages).keys()];

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Public Lessons ({data.total})
      </h2>

      {/* ----------- Search + Filter + Sort Section ----------- */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search lessons..."
          className="border px-4 py-2 rounded w-64"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />

        {/* Category Filter */}
        <select
          className="border px-4 py-2 rounded"
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        {/* Emotional Tone Filter */}
        <select
          className="border px-4 py-2 rounded"
          onChange={(e) => {
            setTone(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>

        {/* Sort */}
        <select
          className="border px-4 py-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mostSaved">Most Saved</option>
        </select>
      </div>

      {/* ----------- Lessons Grid ------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.data.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>

      {/* -------- Pagination -------- */}
      <div className="flex justify-center mt-10 gap-2">
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded border 
            ${num === page ? "bg-lime-500 text-white" : "bg-white text-gray-700"}
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
