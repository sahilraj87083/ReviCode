import MessageInput from "./MessageInput";
import MessagesArea from "./MessagesArea";

function ChatWindow({ activeChat }) {
  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-white font-semibold">
          {activeChat.name}
        </h2>

        {/* Optional actions */}
        <span className="text-xs text-slate-400">
          Online
        </span>
      </div>

      {/* Messages */}
      <MessagesArea />

      {/* Input */}
      <MessageInput />
    </section>
  );
}

export default ChatWindow