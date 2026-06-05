import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../Utils";
import { useMutation } from "@tanstack/react-query";
import ErrorPage from "../../pages/ErrorPage";
import { TbFidgetSpinner, TbPhotoPlus } from "react-icons/tb";
import LoadingSpinner from "../../pages/LoadingSpinner";
import Lottie from "lottie-react";
import successAnimation from "../../assets/SuccessLottie.json";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddLessonForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [preview, setPreview] = useState(null);

  const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/lessons", payload),
    onSuccess: () => {
      setShowSuccessAnimation(true);
      setPreview(null);
      setTimeout(() => setShowSuccessAnimation(false), 3000);
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  
  // Watch image field to create a local preview URL
  const selectedImage = watch("image");
  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [selectedImage]);

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    try {
      const imageUrl = await imageUpload(imageFile);
      const lessonData = {
        ...data,
        image: imageUrl,
        author: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };
      await mutateAsync(lessonData);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-base-200 px-4 transition-colors duration-300">
      {/* Success Modal */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-base-100 w-80 rounded-2xl p-8 shadow-2xl text-center border border-success/20">
            <Lottie animationData={successAnimation} loop={false} className="h-40" />
            <h3 className="text-xl font-bold mt-2">Awesome!</h3>
            <p className="text-base-content/70">Lesson added successfully.</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
        <div className="bg-primary p-6 text-black">
          <h2 className="text-3xl font-bold">Add New Lesson</h2>
          <p className="opacity-80">Share your wisdom and experience with the world.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Title Field */}
              <div className="form-control w-full">
                <label className="label font-semibold">Lesson Title</label>
                <input
                  type="text"
                  placeholder="e.g. How to overcome failure"
                  className={`input input-bordered w-full focus:input-primary ${errors.title && 'input-error'}`}
                  {...register("title", { required: "Title is essential" })}
                />
                {errors.title && <span className="text-error text-xs mt-1">{errors.title.message}</span>}
              </div>

              {/* Grid for Selects */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-semibold text-xs uppercase opacity-70">Category</label>
                  <select className="select select-bordered" {...register("category", { required: true })}>
                    <option value="Personal Growth">Personal Growth</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Mistakes Learned">Mistakes Learned</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-xs uppercase opacity-70">Emotional Tone</label>
                  <select className="select select-bordered" {...register("emotionalTone", { required: true })}>
                    <option value="Motivational">Motivational</option>
                    <option value="Sad">Sad</option>
                    <option value="Realization">Realization</option>
                    <option value="Gratitude">Gratitude</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-semibold text-xs uppercase opacity-70">Privacy</label>
                  <select className="select select-bordered" {...register("privacy", { required: true })}>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-xs uppercase opacity-70">Access</label>
                  <select className="select select-bordered" {...register("accessLevel", { required: true })}>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label font-semibold">Detailed Description</label>
                <textarea
                  rows="4"
                  className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
                  placeholder="Share the core lesson here..."
                  {...register("description", { required: "Description cannot be empty" })}
                ></textarea>
                {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Image Upload Area */}
              <div className="form-control h-full">
                <label className="label font-semibold">Lesson Cover Image</label>
                <div className={`relative group h-full min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${preview ? 'border-primary' : 'border-base-300 hover:border-primary bg-base-200/50'}`}>
                  {preview ? (
                    <div className="relative w-full h-full p-2">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                        <p className="text-white font-medium">Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <TbPhotoPlus className="text-5xl mx-auto mb-4 opacity-20" />
                      <p className="text-sm font-medium">Drag and drop or click to upload</p>
                      <p className="text-xs opacity-50 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    {...register("image", { required: "Please upload a cover image" })}
                  />
                </div>
                {errors.image && <span className="text-error text-xs mt-2">{errors.image.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary btn-lg w-full shadow-lg shadow-primary/20"
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Publish Lesson"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLessonForm;