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
  const { role } = useRole();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const [currentUser, setCurrentUser] = useState(null);

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Profile Overview
      </h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Avatar */}
        <div className="relative">
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-100 shadow"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold text-gray-800">
              {currentUser.displayName}
            </h3>

            {currentUser.isUserPremium && (
              <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full border border-yellow-300">
                Premium
              </span>
            )}

            <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full capitalize border border-indigo-200">
              {role}
            </span>
          </div>

          <p className="text-gray-500 mt-1">{currentUser.email}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-5">
            <div>
              <p className="text-sm text-gray-500">Lessons Created</p>
              <p className="text-xl font-bold text-gray-800">
                {myLessons.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Lessons Saved</p>
              <p className="text-xl font-bold text-gray-800">{favCount}</p>
            </div>
          </div>

          {/* Action */}
          <Link to="/dashboard/profile/update">
            <button className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
              Update Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Public Lessons
        </h3>

        {myLessons.length === 0 && (
          <p className="text-gray-500">
            You haven’t published any public lessons yet.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
