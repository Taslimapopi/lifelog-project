import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { FaHeart, FaComment, FaArrowRight } from "react-icons/fa";
import useAxios from "../../../hooks/useAxious";

const CATEGORIES = [
  { id: "relationships", label: "Relationships", emoji: "❤️", category: "relationships", color: "from-pink-400 to-rose-600" },
  { id: "career", label: "Career & Tech", emoji: "💼", category: "career", color: "from-blue-400 to-indigo-600" },
  { id: "mental-health", label: "Mental Health", emoji: "🧠", category: "mental", color: "from-teal-400 to-emerald-600" },
  { id: "finance", label: "Finance & Wealth", emoji: "💵", category: "finance", color: "from-amber-400 to-yellow-600" },
  { id: "health", label: "Health & Fitness", emoji: "🍎", category: "health", color: "from-green-400 to-emerald-600" },
];

const InteractiveMoodFinder = () => {
  const [selectedCategory, setSelectedCategory] = useState("relationships");
  const axiosInstance = useAxios()

  // Fetch lessons based on the selected category
  const { data = {}, isLoading } = useQuery({
    queryKey: ["categoryLessons", selectedCategory],
    queryFn: async () => {
      const res = await axiosInstance.get(`/public-lessons?category=${selectedCategory}&limit=3`);
      return res.data;
    },
  });

  const lessons = data.result || [];

  return (
    <section className="py-20 bg-base-200/50 border-t border-base-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
            Explore Topics
          </span>
          <h2 className="text-4xl font-extrabold mt-4 mb-4 tracking-tight text-base-content">
            Explore Lessons by Category
          </h2>
          <p className="text-gray-500">
            Select a topic category below to discover valuable real-life lessons shared by our community members.
          </p>
        </div>

        {/* Category Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-r ${cat.color} text-white scale-105 shadow-lg`
                    : "bg-base-100 hover:bg-base-300 text-base-content border border-base-300"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Container */}
        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-ring loading-lg text-primary"></span>
            </div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-12 bg-base-100 rounded-2xl border border-dashed border-base-300">
              <p className="text-gray-400 text-lg italic">
                No lessons found under the category "{selectedCategory}" yet.
              </p>
              <Link to="/auth/profile" className="btn btn-primary btn-sm mt-4 text-black font-bold">
                Share one now!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Lesson Image */}
                    {lesson.image && (
                      <figure className="h-44 overflow-hidden relative">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md text-xs px-2.5 py-1 rounded-full font-semibold">
                          {lesson.category}
                        </span>
                      </figure>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="card-title text-lg font-bold text-base-content line-clamp-2 mb-2 hover:text-primary transition">
                        <Link to={`/lessons/${lesson._id}`}>{lesson.title}</Link>
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="px-6 pb-6 pt-2 border-t border-base-200 flex justify-between items-center text-gray-400 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-error" /> {lesson.likes?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment className="text-info" /> {lesson.commentsCount || 0}
                      </span>
                    </div>
                    
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="btn btn-ghost btn-xs text-primary font-bold hover:bg-primary/10 flex items-center gap-1"
                    >
                      Read <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default InteractiveMoodFinder;
