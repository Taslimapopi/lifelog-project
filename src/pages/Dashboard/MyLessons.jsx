import React from "react";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxious";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyLessons = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient()
  const axiosSecure = useAxiosSecure()

  const { data: myLessons = [] } = useQuery({
    queryKey: ["myLessons", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });

  // Delete mutation
  const { mutateAsync: deleteLesson } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/lessons/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Lesson has been deleted.", "success");
      queryClient.invalidateQueries(["myLessons"]); // list reload
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete lesson!", "error");
    },
  });

  // SweetAlert confirmation + delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await deleteLesson(id);
    }
  };

  return (
    <div>
      my lessons : {myLessons.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Access Level</th>
              <th>CreatedAt</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myLessons.map((lesson, index) => (
              <tr>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={lesson.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{lesson.title.slice(0,20)}...</div>
                      <span>Visibility: {lesson.privacy}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-50">{lesson.accessLevel}</div>
                  <br />
                </td>
                <td>
                  <div className="text-sm opacity-50">{lesson.createdAt}</div>
                  <br />
                </td>
                <td>
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-primary btn-xs mr-3  text-black"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-primary btn-xs text-black"
                  >
                    Delete
                  </button>
                </td>
                <th>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="btn btn-primary btn-xs  text-black"
                  >
                    details
                  </Link>
                </th>
              </tr>
            ))}

            {/* row 2 */}

            {/* row 3 */}

            {/* row 4 */}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
