import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/admin/profile/${user?.email}`)
      .then((res) => setAdmin(res.data));
  }, [axiosSecure, user?.email]);

  if (!admin) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl text-center">
      <img
        src={admin.photo}
        alt="Admin"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />

      <h2 className="text-2xl font-bold">{admin.name}</h2>
      <p className="text-gray-500">{admin.email}</p>
      

      <span className="inline-block mt-4 px-4 py-1 bg-red-600 text-white rounded-full text-sm">
        ADMIN
      </span>
    </div>
  );
};

export default AdminProfile;
