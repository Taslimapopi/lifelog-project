import { useState } from "react";
import useConversations from "../../hooks/useConversations";
import AdminSidebar from "./AdminSidebar";
import AdminMessagePanel from "./AdminMessagePanel";

const AdminChat = () => {
  const { data: conversations = [], isPending } = useConversations();

  const [selectedConversation, setSelectedConversation] = useState(null);

  if (isPending) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-xl">
      <div className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-600">Support Chat</h2>
        <p className="text-sm text-gray-500">
          Reply to user support requests.
        </p>
      </div>

      <div className="grid h-[75vh] grid-cols-12">
        <AdminSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />

        <div className="col-span-8 h-full min-h-0 bg-gray-50">
          {selectedConversation ? (
            <AdminMessagePanel conversation={selectedConversation} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-6xl">💬</div>

              <h2 className="mt-4 text-xl font-semibold text-gray-400">
                Select a Conversation
              </h2>

              <p className="mt-2 text-gray-500">
                Choose a user from the left to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;