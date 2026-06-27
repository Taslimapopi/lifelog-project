import { useState } from "react";
import useConversations from "../../hooks/useConversations";

const AdminChat = () => {
  const { data: conversations = [] } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="grid grid-cols-12 h-[80vh]">
      <div className="col-span-4 border-r">
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setSelectedConversation(conversation)}
            className="p-4 border-b cursor-pointer hover:bg-gray-100"
          >
            <h3>{conversation.name}</h3>
            <p>{conversation.email}</p>
          </div>
        ))}
      </div>

      <div className="col-span-8">
        {selectedConversation ? (
          <h2>{selectedConversation.name}</h2>
        ) : (
          <div className="flex h-full items-center justify-center">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
