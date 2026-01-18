import MessageInput from "./MessageInput";
import MessagesArea from "./MessagesArea";
import { useState } from "react";

function ChatWindow({ activeChat }) {
  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select a chat to start messaging
      </div>
    );
  }
  const [messages, setMessages] = useState([
    {name: "Sahil", fromMe: false, text: "Hey ready for contest?" },
    {name: 'Uzma', fromMe: true, text: "Yes! Let's go 🚀" },
  ]);

  return (
    <section className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-white font-semibold">{activeChat?.name}</h2>
      </div>

      <MessagesArea messages={messages} />

      <MessageInput
        onSend={(text) =>
          setMessages((prev) => [...prev, { fromMe: true, text }])
        }
      />
    </section>
  );
}


export default ChatWindow