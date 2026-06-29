import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useConversation from "../../hooks/useConversation";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MesssageInput";
import { useState } from "react";

const ChatModal = ({ isChatOpen, setIsChatOpen }) => {
  const { mutateAsync, data, isPending } = useConversation();
  const [conversationId, setConversationId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const createConversation = async () => {
      if (!isChatOpen || !user || conversationId) return;

      try {
        await mutateAsync({
          userId: user.uid,
          name: user.displayName,
          photo: user.photoURL
        });
      } catch (error) {
        console.error(error);
      }
    };

    createConversation();
  }, [isChatOpen, conversationId, user, mutateAsync]);

  useEffect(() => {
    if (data?._id) {
      setConversationId(data._id);
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
        <div className="m-6 flex h-[400px] w-[380px] items-center justify-center rounded-xl bg-white">
          Starting chat...
        </div>
      </div>
    );
  }

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
      <div  className="
    absolute
    bottom-4
    right-4

    h-[70vh]
    w-[calc(100vw-2rem)]

    max-w-[380px]
    max-h-[650px]

    flex
    flex-col
    overflow-hidden
    rounded-2xl
    bg-white
    shadow-2xl
  ">
        <ChatHeader setIsChatOpen={setIsChatOpen} />

        <MessageList conversationId={conversationId} />

        <MessageInput conversationId={conversationId} senderRole="user" />
      </div>
    </div>
  );
};

export default ChatModal;
