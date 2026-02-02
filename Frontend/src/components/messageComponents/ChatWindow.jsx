import MessageInput from "./MessageInput";
import MessagesArea from "./MessagesArea";

function ChatWindow({ activeChat , messages, send}) {
  

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select a chat to start messaging
      </div>
    );
  }


  return (
    <section className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-white font-semibold">{activeChat?.user?.fullName}</h2>
      </div>

      <MessagesArea messages={messages} />

      <MessageInput
        onSend={(text) => send(text)}
      />
    </section>
  );
}


export default ChatWindow