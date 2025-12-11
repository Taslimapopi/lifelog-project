import { FaLock } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxious";

const LessonCard = ({ lesson }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/users/email/${user?.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [axiosInstance, user]);

  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    creator,
    accessLevel,
    createdAt,
    image,
  } = lesson;

  const isPremium = accessLevel === "premium";
  const isUserPremium = currentUser?.isUserPremium === true;

  const shortDescription =
    description?.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  const handleClick = () => {
    if (isPremium && !isUserPremium) {
      navigate("/pricing"); // ❌ Not premium → send to pricing
    } else {
      navigate(`/lessons/${_id}`); // ✅ Premium user → show details
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg border p-4 relative ${
        isPremium && !isUserPremium ? "opacity-60 blur-[1px]" : ""
      }`}
    >
      {/* Lock Badge for non-premium users */}
      {isPremium && !isUserPremium && (
        <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full">
          <FaLock />
        </div>
      )}

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />

      <div className="mt-4 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-xl font-bold">{title}</h2>

        {/* Category & Tone */}
        <p className="text-sm text-gray-500">
          Category: <span className="font-semibold">{category}</span>
        </p>

        <p className="text-sm text-blue-500 font-medium">
          Tone: {emotionalTone}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm">{shortDescription}</p>

        {/* Creator */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src={creator?.photo}
            alt="creator"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <p className="text-gray-700 font-medium">{creator?.name}</p>
        </div>

        {/* Access Level */}
        <p
          className={`text-sm mt-2 font-bold ${
            accessLevel === "premium" ? "text-red-600" : "text-green-600"
          }`}
        >
          Access: {accessLevel}
        </p>

        {/* Created Date */}
        <p className="text-xs text-gray-400">
          Created At: {new Date(createdAt).toLocaleDateString()}
        </p>

        {/* Details Button */}
        {/* {!isPremium || isUserPremium ? (
          <Link to={`/lessons/${_id}`}>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              See Details
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="w-full mt-4 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
          >
            Premium Lesson – Upgrade to view
          </button>
        )} */}
        <button
          onClick={handleClick}
          className={`w-full mt-4 py-2 rounded-lg text-white transition
          ${
            isPremium && !isUserPremium
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
        >
          {isPremium && !isUserPremium
            ? "Premium Lesson – Upgrade to view"
            : "See Details"}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
