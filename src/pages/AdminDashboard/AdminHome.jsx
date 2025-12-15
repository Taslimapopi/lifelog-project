import { useQuery } from "@tanstack/react-query";

import {
  MdPeople,
  MdMenuBook,
  MdReportProblem,
  MdWorkspacePremium,
} from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // users
  const { data: users = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // lesson stats
  const { data: lessonStats = {} } = useQuery({
    queryKey: ["lesson-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/stats/all");
      return res.data;
    },
  });

  // top contributors
  const { data: topUsers = [] } = useQuery({
    queryKey: ["top-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-users");
      return res.data;
    },
  });

  // today lessons
  const { data: todayLessons = [] } = useQuery({
    queryKey: ["today-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons?sort=newest&limit=5");
      return res.data.result;
    },
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      <p className="text-gray-500">Platform overview & activity summary</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<MdPeople />}
          title="Total Users"
          value={users.length}
        />
        <StatCard
          icon={<MdMenuBook />}
          title="Public Lessons"
          value={lessonStats.publicLessons}
        />
        <StatCard
          icon={<MdWorkspacePremium />}
          title="Premium Lessons"
          value={lessonStats.premiumLessons}
        />
        <StatCard
          icon={<MdReportProblem />}
          title="Flagged Lessons"
          value={lessonStats.flagged}
        />
      </div>

      {/* <div>
        <Link to="/dashboard/profile/update">
          <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">
            Update Profile
          </button>
        </Link>
      </div> */}

      {/* Top Contributors */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Most Active Contributors</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col items-center border p-4 rounded"
            >
              <img
                src={user.photoURL}
                className="w-20 h-20 rounded-full object-cover"
              />
              <h4 className="font-semibold mt-3">{user.displayName}</h4>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today Lessons */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Today’s New Lessons</h3>

        <ul className="space-y-3">
          {todayLessons.map((lesson) => (
            <li
              key={lesson._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{lesson.title}</p>
                <p className="text-sm text-gray-500">{lesson.category}</p>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
      <div className="text-3xl text-primary">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default AdminDashboard;
