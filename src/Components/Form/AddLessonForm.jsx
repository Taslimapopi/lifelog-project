import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../Utils";
import useAxios from "../../hooks/useAxious";
import { useMutation } from "@tanstack/react-query";
import ErrorPage from "../../pages/ErrorPage";
import { TbFidgetSpinner } from "react-icons/tb";

const AddLessonForm = () => {
  const { user } = useAuth();
  const axios = useAxios();

  // useMutation hook useCase

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axios.post("/lessons", payload),
    onSuccess: (data) => {
      console.log(data);
      alert('data post success')
      mutationReset()
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { title, category, emotionalTone, privacy, description, image,accessLevel } =
      data;
    const imageFile = image[0];
    // const imageUrl =await imageUpload(imageFile);
    // const lessonData = { image: imageUrl,title, category, emotionalTone, privacy,description,
    //   author:{
    //     name: user?.displayName,
    //     email: user?.email,
    //     image: user?.photoURL
    //   }

    // }
    try {
      const imageUrl = await imageUpload(imageFile);
      const lessonData = {
        image: imageUrl,
        title,
        category,
        emotionalTone,
        privacy,
        accessLevel,
        description,
        author: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      // await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData),
      await mutateAsync(lessonData);
      reset();
    } catch (err) {
      console.log(err);
    }
    //  console.table(lessonData)
    // from my previous addLesson.jsx
    //  axios.post('/lessons',lessonData)
    //   .then(res=>{
    //     console.log('after lesson post',res.data)
    //     alert('lesson created')
    //   })
  };
  if (isPending) return <p>loading...</p>
  if (isError) return <ErrorPage />

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Lesson Title"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 100,
                    message: "title cannot be too long",
                  },
                })}
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                {...register("category", { required: "Category is required" })}
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career"> Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>
            {/* Emotional Tone */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Emotional Tone
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="Emotional Tone"
                {...register("emotionalTone", {
                  required: "Emotional Tone is required",
                })}
              >
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>
            </div>
            {/* Privacy */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Privacy
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="Privacy"
                {...register("privacy", { required: "Privacy is required" })}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              {errors.privacy && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.privacy.message}
                </p>
              )}
            </div>
            {/* Access Level */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Access Level
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="accessLevel"
                {...register("accessLevel", { required: "Access Level is required" })}
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
              {errors.accessLevel && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.accessLevel.message}
                </p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write Lesson description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              {/* <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div> */}

              {/* Quantity */}
              {/* <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div> */}
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}

            {/* <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              Save & Continue
            </button> */}
             {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              {isPending ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Save & Continue'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
