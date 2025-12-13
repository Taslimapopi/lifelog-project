import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  // Load all users
  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setAllUsers(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  // Promote User to Admin
  const handleMakeAdmin = async (user) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.name} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote!",
    });

    if (confirm.isConfirmed) {
      //   const res = await axiosSecure.patch(`/users/${user._id}`);
      const res = await axiosSecure.patch(`/users/${user._id}`, {
        role: "admin",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", `${user.name} is now an admin!`, "success");

        // Update UI without reload
        const updated = allUsers.map((u) =>
          u._id === user._id ? { ...u, role: "admin" } : u
        );

        setAllUsers(updated);
      }
    }
  };

  // Delete User
  const handleDelete = async (user) => {
    const confirm = await Swal.fire({
      title: "Delete Account?",
      text: `You are about to delete ${user.name}'s account!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${user._id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "User account removed.", "success");
        setAllUsers(allUsers.filter((u) => u._id !== user._id));
      }
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-lg">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        All Users: {allUsers.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Make Admin</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>{user.totalLessons || 0}</td>

                {/* Admin Promote */}
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Promote
                    </button>
                  )}
                </td>

                {/* Delete User */}
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

export default ManageUser;
