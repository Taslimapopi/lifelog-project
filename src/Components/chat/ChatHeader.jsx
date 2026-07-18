const ChatHeader = ({ setIsChatOpen }) => {
  return (
    <div className="flex  items-center justify-between border-b p-4">

      <div>
        <h2 className="font-semibold text-lg text-gray-800">
          Chat with Admin
        </h2>

        <p className="text-xs text-gray-800">
          Usually replies within a few minutes
        </p>
      </div>

      <button
        onClick={() => setIsChatOpen(false)}
        className="text-gray-800"
      >
        ✖
      </button>

    </div>
  );
};

export default ChatHeader;