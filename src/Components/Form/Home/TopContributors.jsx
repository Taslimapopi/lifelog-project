import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxious";

const TopContributors = () => {
  const axios = useAxios();
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axios.get("/top-users");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading top contributors...</p>;
  if (error) return <p>Error loading contributors</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Top 3 Premium Contributors
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {data.map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-center p-4 border rounded w-40"
          >
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt={user.displayName}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-center">{user.displayName}</h3>
            <p className="text-sm text-gray-500 text-center">{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;
