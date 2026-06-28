import MessageBubble from "./MessageBubble";
import MessageInput from "./MesssageInput";
import useMessages from "../../hooks/useMessages";

const AdminMessagePanel = ({ conversation }) => {
  const {
    data: messages = [],
    isPending,
  } = useMessages(conversation._id);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">{conversation.name}</h2>
        <p className="text-sm text-gray-500">{conversation.email}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            currentRole="admin"
          />
        ))}
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