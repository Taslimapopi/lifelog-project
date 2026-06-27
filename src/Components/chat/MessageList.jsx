import useMessages from "../../hooks/useMessages";
import MessageBubble from "./MessageBubble";

const MessageList = ({ conversationId }) => {

  const {
    data: messages = [],
    isPending,
  } = useMessages(conversationId);

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">

      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
        />
      ))}

    </div>
  );
};

export default MessageList;