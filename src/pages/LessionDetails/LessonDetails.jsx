import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaLock,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: lesson = {}, isLoading, refetch } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons/${id}`
      );
      return res.data;
    },
  });

  const {
    title,
    description,
    category,
    emotionalTone,
    createdAt,
    updatedAt,
    accessLevel,
    image,
    author,
    likes = [],
    favorites = [],
  } = lesson;

  const isPremiumLesson = accessLevel === "premium";
  const isUserPremium = user?.membership === "premium";

  // If premium content blocked
  if (isPremiumLesson && !isUserPremium) {
    return (
      <div className="relative text-center py-20 px-6">
        <div className="text-3xl font-bold text-red-600 flex justify-center gap-3">
          <FaLock /> Premium Lesson
        </div>
        <p className="text-gray-500 mt-4">
          This lesson is available only for premium members.
        </p>

        <button
          onClick={() => navigate("/pricing")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  // Like Toggle Handler
  const toggleLike = async () => {
    if (!user) return alert("Please log in to like this lesson.");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/lessons/${id}/toggleLike`,
      {
        userId: user._id,
      }
    );

    refetch();
  };

  // Favorite Toggle Handler
  const toggleFavorite = async () => {
    if (!user) return alert("Please log in to save favorites.");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/lessons/${id}/toggleFavorite`,
      {
        userId: user._id,
      }
    );

    refetch();
  };

  // Safe check
  const isLiked = likes?.some((uid) => String(uid) === String(user?._id));
  const isFavorited = favorites?.some(
    (uid) => String(uid) === String(user?._id)
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      {/* Featured Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover rounded-xl shadow"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6">{title}</h1>

      {/* Metadata */}
      <div className="mt-3 text-gray-500 text-sm flex flex-col gap-1">
        <p>Category: {category}</p>
        <p>Emotional Tone: {emotionalTone}</p>
        <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(updatedAt).toLocaleDateString()}</p>
        <p>Visibility: Public</p>
      </div>

      <hr className="my-6" />

      {/* Description */}
      <div className="text-lg leading-relaxed text-gray-700">
        {description}
      </div>

      <hr className="my-6" />

      {/* Author Card */}
      <div className="p-5 rounded-xl bg-gray-50 shadow-sm border flex gap-4 items-center">
        <img
          src={author?.photo}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold">{author?.name}</h3>
          <p className="text-sm text-gray-500">
            Total Lessons: {author?.totalLessons || 0}
          </p>

          <Link to={`/author/${author?._id}`}>
            <button className="mt-2 text-blue-600 underline">
              View all lessons by this author →
            </button>
          </Link>
        </div>
      </div>

      <hr className="my-6" />

      {/* Stats */}
      <div className="flex gap-6 text-lg font-semibold">
        <p>❤️ {likes.length} Likes</p>
        <p>🔖 {favorites.length} Favorites</p>
        <p>👀 {Math.floor(Math.random() * 10000)} Views</p>
      </div>

      <hr className="my-6" />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={toggleLike}
          className="px-5 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />} Like
        </button>

        <button
          onClick={toggleFavorite}
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg flex items-center gap-2"
        >
          {isFavorited ? <FaBookmark /> : <FaRegBookmark />} Favorite
        </button>

        <button className="px-5 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2">
          <FaFlag /> Report
        </button>
      </div>

      <hr className="my-6" />

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Comments</h2>

        <textarea
          placeholder="Write a comment..."
          className="w-full p-3 border rounded-lg"
        ></textarea>

        <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg">
          Post Comment
        </button>

        <div className="mt-6">
          <p className="text-gray-500 italic">Comments will appear here...</p>
        </div>
      </div>

      <hr className="my-10" />

      {/* Recommended Lessons */}
      <h2 className="text-2xl font-bold mb-4">Recommended Lessons</h2>
      <p className="text-gray-500">
        You can show 6 recommended lessons here (based on category/tone)
      </p>
    </div>
  );
};

export default LessonDetails;
