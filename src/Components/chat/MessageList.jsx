import { useEffect, useRef } from "react";
import useMessages from "../../hooks/useMessages";
import MessageBubble from "./MessageBubble";
import useAuth from "../../hooks/useAuth";

const MessageList = ({ conversationId }) => {
  const bottomRef = useRef(null)
  const {user} = useAuth()

  const {
    data: messages = [],
    isPending,
  } = useMessages(conversationId);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);


  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
  {messages.length === 0 ? (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-4 text-5xl">👋</div>

      <h2 className="text-lg font-semibold">
        Hi, {user?.displayName || "there"}
      </h2>

      <p className="mt-2 max-w-xs text-sm text-gray-500">
        How can we help you today? Start the conversation by sending your first
        message.
      </p>
    </div>
  ) : (
    <>
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          currentRole="user"
        />
      ))}

      <div ref={bottomRef} />
    </>
  )}
</div>
  );
};

export default MessageList;