const MessageBubble = ({ message }) => {
  const isUser = message.senderRole === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
max-w-[75%]
rounded-xl
px-4
py-2

${isUser ? "bg-primary text-white" : "bg-gray-100"}
`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
