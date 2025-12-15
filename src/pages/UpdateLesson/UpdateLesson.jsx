import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxious";
import { useMutation, useQuery } from "@tanstack/react-query";

import ErrorPage from "../../pages/ErrorPage";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../Components/Utils";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateLessonForm = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure()
  const { id } = useParams();
  const navigate = useNavigate()

  // Fetch old lesson data
  const { data: lesson = {}, isLoading, isError } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Mutation: Update request
  const {
    isLoading: isPending,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.put(`/update-lessons/${id}`, payload),
    onSuccess: () => {
      alert("Lesson updated successfully!");
      navigate('/dashboard/my-lessons')
      mutationReset();
    },
    onError: (err) => console.log(err),
  });

  // Form setup with defaultValues (NOT values)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      emotionalTone: "",
      privacy: "",
      description: "",
    },
  });

  // When lesson data changes, reset the form values
  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title || "",
        category: lesson.category || "",
        emotionalTone: lesson.emotionalTone || "",
        privacy: lesson.privacy || "",
        description: lesson.description || "",
      });
    }
  }, [lesson, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = lesson?.image;

      if (data.image && data.image.length > 0) {
        imageUrl = await imageUpload(data.image[0]);
      }

      const updatedLesson = {
        image: imageUrl,
        title: data.title,
        category: data.category,
        emotionalTone: data.emotionalTone,
        privacy: data.privacy,
        description: data.description,
      };

      await mutateAsync(updatedLesson);

      reset({
        title: "",
        category: "",
        emotionalTone: "",
        privacy: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>Loading lesson...</p>;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">

            {/* Title */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Lesson Title</label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                type="text"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Category</label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("category")}
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>

            {/* Emotional Tone */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Emotional Tone</label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("emotionalTone")}
              >
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>
            </div>

            {/* Privacy */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Privacy</label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("privacy")}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Description</label>
              <textarea
                className="block rounded-md w-full h-32 px-4 py-3 border-lime-300 bg-white focus:outline-lime-500"
                {...register("description")}
              ></textarea>
            </div>
          </div>

          {/* Right side: image + submit */}
          <div className="space-y-6 flex flex-col">
            {/* Image */}
            <div className="p-4 w-full rounded-lg">
              <p className="mb-2 text-gray-600">Current Image:</p>
              <img
                src={lesson?.image}
                alt="lesson"
                className="h-32 rounded-md mb-3 border"
              />

              <div className="file_upload px-5 py-3 border-4 border-dotted border-gray-300 rounded-lg">
                <label className="flex flex-col items-center">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    {...register("image")}
                  />
                  <div className="bg-lime-500 text-white rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
                    Change Image
                  </div>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white rounded shadow-md bg-lime-500"
              disabled={isPending}
            >
              {isPending ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update Lesson"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
