import { formatMessageTime } from "./FormatMessageDate";

const MessageBubble = ({ message, currentRole }) => {
  const isMine = message.senderRole === currentRole;

  //   const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  const time = formatMessageTime(message.createdAt);

  return (
      <div className={`mb-4 flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        <div
          className={`rounded-4xl px-4 py-2 ${
            isMine
              ? "bg-primary text-white rounded-br-sm"
              : "bg-gray-200 text-black rounded-bl-sm"
          }`}
        >
          {message.text}
        </div>

        <p
          className={`mt-1 text-[.75rem] text-gray-500 ${
            isMine ? "text-right" : "text-left"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;