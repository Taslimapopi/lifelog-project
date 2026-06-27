import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useAuth from "../../hooks/useAuth";

const MessageInput = ({ conversationId }) => {
  const [text, setText] = useState("");
  const { mutateAsync, isPending } = useSendMessage();
  const { user } = useAuth();

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await mutateAsync({
        conversationId,
        senderId: user.uid,
        senderRole: "user",
        text,
      });

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="input input-bordered flex-1"
      />

      <button
        onClick={handleSend}
        disabled={isPending}
        className="btn btn-primary"
      >
        {isPending ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;
