import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxious";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch logged-in user from DB
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/users/email/${user.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [axiosInstance, user]);

  // ⛔ FIX: Don't load favorites until currentUser exists
  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", currentUser?._id, category, tone],
    enabled: !!currentUser?._id, // <-- important fix
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons/favorites/${currentUser._id}?category=${category}&emotionalTone=${tone}`
      );
      return res.data;
    },
  });

  // Remove from favorites
  const removeMutation = useMutation({
    mutationFn: async (lessonId) => {
      await axiosInstance.patch("/lessons/remove-favorite", {
        lessonId,
        userId: currentUser._id,
      });
    },
    onSuccess: () => refetch(),
  });

  // Loading state
  if (!currentUser) {
    return (
      <p className="text-center py-10 text-gray-500">Loading your profile...</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationship">Relationship</option>
          <option value="Mistake Learned">Mistake Learned</option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Tones</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Sad">Sad</option>
          <option value="Motivational">Motivational</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Tone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {favorites.map((lesson) => (
            <tr key={lesson._id} className="border-b">
              <td className="p-3">{lesson.title}</td>
              <td className="p-3">{lesson.category}</td>
              <td className="p-3">{lesson.emotionalTone}</td>

              <td className="p-3 flex gap-3">
                <Link to={`/lessons/${lesson._id}`}>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    Details
                  </button>
                </Link>

                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This lesson will be removed from your favorites.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, remove it",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeMutation.mutate(lesson._id, {
                          onSuccess: () => {
                            Swal.fire(
                              "Removed!",
                              "Lesson removed from favorites.",
                              "success"
                            );
                          },
                        });
                      }
                    });
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {favorites.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No favorite lessons found.
        </p>
      )}
    </div>
  );
};

export default MyFavorites;
