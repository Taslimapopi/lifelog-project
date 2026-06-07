// src/pages/AdminDashboard/AdminChat.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";


const socket = io("http://localhost:3000");
const ADMIN_EMAIL = "admin@lifelog.com";

export default function AdminChat() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", ADMIN_EMAIL);

    // সব user list load
    fetch("http://localhost:3000/chats/users/all")
      .then(r => r.json())
      .then(setUsers);

    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, []);

  const selectUser = (email) => {
    setSelectedUser(email);
    fetch(`http://localhost:3000/chats/${email}`)
      .then(r => r.json())
      .then(setMessages);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    socket.emit("send_message", {
      senderEmail: ADMIN_EMAIL,
      receiverEmail: selectedUser,
      message: input,
      senderRole: "admin"
    });

    setInput("");
  };

  return (
    <div className="flex h-[600px] border rounded-xl overflow-hidden">
      {/* User List */}
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-3 font-bold border-b bg-gray-50">Users</div>
        {users.map((email, i) => (
          <div
            key={i}
            onClick={() => selectUser(email)}
            className={`p-3 cursor-pointer hover:bg-gray-50 border-b text-sm ${
              selectedUser === email ? "bg-primary/10 font-semibold" : ""
            }`}
          >
            {email}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-3 border-b font-semibold bg-gray-50 text-sm">
              {selectedUser}
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    msg.senderRole === "admin"
                      ? "bg-primary text-white self-end rounded-br-none"
                      : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Reply..."
                className="flex-1 border rounded-lg px-3 py-1.5 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}