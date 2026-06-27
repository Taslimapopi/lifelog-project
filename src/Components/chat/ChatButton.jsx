import { MessageCircle } from "lucide-react";

const ChatButton = ({ setIsChatOpen }) => {
  return (
    <button
      onClick={() => setIsChatOpen(true)}
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