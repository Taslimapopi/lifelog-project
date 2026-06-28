const MessageBubble = ({ message, currentRole }) => {
  const isMine = message.senderRole === currentRole;

  return (
    <div className={`flex mb-4 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2 ${
          isMine
            ? "bg-primary text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;