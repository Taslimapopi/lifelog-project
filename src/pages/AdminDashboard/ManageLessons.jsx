import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({
    category: "",
    visibility: "",
    flagged: "",
  });

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["allLessons", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", { params: filters });
      return res.data;
    },
  });

  const { data: stats = {} } = useQuery({
    queryKey: ["lessonStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/stats/all");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Lesson?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/lessons/${id}`);
      Swal.fire("Deleted!", "Lesson removed successfully!", "success");
      refetch();
    }
  };

  // const markFeatured = async (id) => {
  //   await axiosSecure.patch(`/lessons/feature/${id}`);
  //   Swal.fire("Updated!", "Lesson marked as featured!", "success");
  //   refetch();
  // };

  const markFeatured = async (id) => {
    const res = await axiosSecure.patch(`/lessons/feature/${id}`);

    Swal.fire(
      "Updated!",
      res.data.isFeatured
        ? "Lesson marked as featured!"
        : "Lesson removed from featured!",
      "success"
    );

    refetch();
  };

  const markReviewed = async (id) => {
    await axiosSecure.patch(`/lessons/review/${id}`);
    Swal.fire("Updated!", "Lesson marked as reviewed!", "success");
    refetch();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Lessons</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">Total: {stats.total}</div>
        <div className="p-4 bg-white shadow rounded">
          Public: {stats.publicLessons}
        </div>
        <div className="p-4 bg-white shadow rounded">
          Premium: {stats.premiumLessons}
        </div>
        <div className="p-4 bg-white shadow rounded">
          Flagged: {stats.flagged}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationship">Relationship</option>
          <option value="Mistake Learned">Mistake Learned</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) =>
            setFilters({ ...filters, visibility: e.target.value })
          }
        >
          <option value="">All Visibility</option>
          <option value="free">Public</option>
          <option value="premium">Premium</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, flagged: e.target.value })}
        >
          <option value="">Flag Filter</option>
          <option value="true">Flagged Only</option>
        </select>
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto">
        <table className="w-full border shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Visibility</th>
              <th className="p-3 border">Flags/reported</th>
              <th className="p-3 border">Details</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="text-center">
                <td className="p-3 border">{lesson.title}</td>
                <td className="p-3 border">{lesson?.author?.name}</td>
                <td className="p-3 border">{lesson.category}</td>
                <td className="p-3 border">{lesson.accessLevel}</td>
                <td className="p-3 border">
                  {lesson.isFlagged ? "⚠️ Flagged" : "--"}
                </td>
                <td className="p-3 border">
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-primary btn-xs mr-3  text-black"
                  >
                    Update
                  </Link>
                  <Link to={`/lessons/${lesson._id}`}>
                    <button className="btn bg-blue-400 btn-xs mr-3  text-black hover:bg-blue-700">
                      Details
                    </button>
                  </Link>
                </td>
                <td className="p-3 border flex gap-2 justify-center">
                  {/* {lesson.isFeatured ? (
                    <button className="px-3 py-1 bg-yellow-300 text-gray-600 rounded btn-xs btn ">
                      Featured ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => markFeatured(lesson._id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded  btn-xs"
                    >
                      Feature
                    </button>
                  )} */}

                  <button
                    onClick={() => markFeatured(lesson._id)}
                    className={`px-3 py-1 rounded btn-xs text-white ${
                      lesson.isFeatured
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {lesson.isFeatured ? "Unfeature" : "Feature"}
                  </button>

                  {lesson.isReviewed ? (
                    <button
                      disabled
                      className="px-3 py-1 bg-green-300 text-gray-600 rounded cursor-not-allowed btn btn-xs"
                    >
                      Reviewed ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => markReviewed(lesson._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded btn-xs"
                    >
                      Review
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
