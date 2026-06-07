// src/Components/Chat/UserChat.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";

const socket = io("http://localhost:3000");

const ADMIN_EMAIL = "admin@lifelog.com"; // আপনার admin email

export default function UserChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;

    // Room এ join
    socket.emit("join_room", user.email);

    // পুরনো messages load
    fetch(`http://localhost:3000/chats/${user.email}`)
      .then(r => r.json())
      .then(setMessages);

    // নতুন message আসলে
    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      senderEmail: user.email,
      receiverEmail: ADMIN_EMAIL,
      message: input,
      senderRole: "user"
    });

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-xl z-50 flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 rounded-t-2xl flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="font-semibold">Support Chat</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 text-sm mt-4">
                👋 Hi! How can we help you?
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                  msg.senderEmail === user.email
                    ? "bg-primary text-white self-end rounded-br-none"
                    : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}