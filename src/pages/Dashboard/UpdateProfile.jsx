import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxious";
import Swal from "sweetalert2";


import { useNavigate } from "react-router";
import { imageUpload } from "../../Components/Utils";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: user?.displayName,
    },
  });

  const onSubmit = async (data) => {
    try {
      let photoURL = user.photoURL;

      // 🔹 new image selected
      if (data.image?.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      // 🔹 Firebase update
      await updateUserProfile(data.displayName, photoURL);

      // 🔹 MongoDB update (email based)
      await axiosInstance.patch(
        `/users/update-profile/${user.email}`,
        {
          displayName: data.displayName,
          photoURL,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Profile update failed", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("displayName", { required: true })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Display Name"
        />

        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />

        <img
          src={user?.photoURL}
          className="w-24 h-24 rounded-full border object-cover"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
