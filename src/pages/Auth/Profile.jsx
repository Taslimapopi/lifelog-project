import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxious";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../Components/Form/Home/LessonCard";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const {role } = useRole()
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()

  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user info from MongoDB
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/users/email/${user.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [user, axiosInstance]);


const { data: myLessons = [] } = useQuery({
  queryKey: ["myLessons", currentUser?.email],
  enabled: !!currentUser?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/lessons?email=${currentUser.email}`);
    return res.data;
  },
});


  console.log(myLessons)

  // Fetch favorite count
  const { data: favCount = 0 } = useQuery({
    queryKey: ["favoritesCount", currentUser?._id],
    enabled: !!currentUser?._id,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons/favorites/count/${currentUser._id}`
      );
      return res.data.count;
    },
  });

  if (!currentUser) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      {/* Profile Card */}
      <div className="bg-white p-5 shadow rounded-lg flex gap-6 items-center">
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />

        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            {currentUser.displayName}
            {currentUser.isUserPremium && (
              <span className="text-yellow-500">⭐ Premium</span>
            )}
          </h3>

          <p className="text-gray-600">{currentUser.email}</p>

          <div className="flex gap-5 mt-3">
            <p className="text-gray-700">
              <strong>{myLessons.length}</strong> Lessons Created
            </p>

            <p className="text-gray-700">
              <strong>{favCount}</strong> Lessons Saved
            </p>
          </div>

          <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">
            Update Profile
          </button>
        </div>
      </div>

      {/* User Lessons */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">Your Public Lessons</h3>

      {myLessons.length === 0 && (
        <p className="text-gray-500">No public lessons created yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myLessons.map((lesson) => (
          <LessonCard lesson={lesson}></LessonCard>
        ))}
      </div>
    </div>
  );
};

export default Profile;
