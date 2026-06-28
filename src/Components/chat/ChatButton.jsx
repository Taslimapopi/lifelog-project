import { MessageCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const ChatButton = ({ setIsChatOpen }) => {
  const { user } = useAuth();
const navigate = useNavigate();

const handleChatClick = () => {
  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to chat with the admin.",
      confirmButtonText: "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login");
      }
    });

    return;
  }

  setIsChatOpen(true);
};
  return (
    <button
      onClick={handleChatClick}
      className="
      fixed
      bottom-6
      right-6
      z-50

      w-14
      h-14

      rounded-full

      bg-primary
      text-white

      shadow-xl

      hover:scale-110

      transition-all
      duration-300
      "
    >
      <MessageCircle className="mx-auto" />
    </button>
  );
};

export default ChatButton;