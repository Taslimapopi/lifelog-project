import MessageBubble from "./MessageBubble";
import MessageInput from "./MesssageInput";
import useMessages from "../../hooks/useMessages";
import { useEffect, useRef } from "react";

const AdminMessagePanel = ({ conversation }) => {
  const bottomRef = useRef(null)
  const {
    data: messages = [],
    isPending,
  } = useMessages(conversation._id);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-none border-b p-4 ">
        <h2 className="text-xl font-semibold">{conversation.name}</h2>
        <p className="text-sm text-gray-500">{conversation.email}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            currentRole="admin"
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      

      {/* Reply Box */}
      <MessageInput
        conversationId={conversation._id}
        senderRole="admin"
      />
    </div>
  );
};

export default AdminMessagePanel;