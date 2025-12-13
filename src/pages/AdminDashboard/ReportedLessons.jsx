import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete lesson?",
      text: "This action is permanent",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/lessons/${id}`);
      Swal.fire("Deleted!", "Lesson removed successfully", "success");
      refetch();
    }
  };

  const handleIgnore = async (id) => {
    await axiosSecure.patch(`/lessons/${id}/ignore-reports`);
    Swal.fire("Ignored!", "Reports cleared", "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🚩 Reported Lessons</h1>

      <div className="overflow-x-auto">
        <table className="w-full border shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Reports</th>
              <th className="p-3 border">View Details</th>
              <th className="p-3 border">Report Info</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="text-center">
                <td className="p-3 border">{lesson.title}</td>

                <td className="p-3 border font-semibold">
                  {lesson.reports?.length || 0}
                </td>

                {/* 🔍 View Lesson Details */}
                <td className="p-3 border">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="text-blue-600 underline font-medium"
                    target="_blank"
                  >
                    View Lesson
                  </Link>
                </td>

                {/* 🧾 View Reports */}
                <td className="p-3 border">
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="text-indigo-600 underline"
                  >
                    View Reports
                  </button>
                </td>

                {/* ⚙️ Actions */}
                <td className="p-3 border flex gap-2 justify-center">
                  <button
                    onClick={() => handleIgnore(lesson._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Ignore
                  </button>

                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🪟 Reports Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Reports for: {selectedLesson.title}
            </h2>

            <ul className="space-y-3">
              {selectedLesson.reports.map((r, i) => (
                <li key={i} className="border p-3 rounded">
                  <p>
                    <b>Reason:</b> {r.reason}
                  </p>
                  <p className="text-sm text-gray-500">
                    Reporter: {r.reporterEmail}
                  </p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedLesson(null)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
