import ConversationCard from "./ConversationCard";

const AdminSidebar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}) => {
  return (
    <div className="col-span-4 border-r bg-white">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search user..."
          className="input input-bordered w-full"
        />
      </div>

      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationCard
            key={conversation._id}
            conversation={conversation}
            active={selectedConversation?._id === conversation._id}
            onClick={() => setSelectedConversation(conversation)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;