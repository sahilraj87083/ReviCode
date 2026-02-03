import MessageInput from "./MessageInput";
import MessagesArea from "./MessagesArea";
import { useSocketContext } from "../../contexts/socket.context";

function ChatWindow({ activeChat , messages, send, isTyping}) {
  const {socket} = useSocketContext()

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
      {isTyping && (
        <div className="px-4 text-s italic font-semibold text-green-600 mb-2">
          typing…
        </div>
      )}

      <MessageInput
        onTyping={() =>
            socket.emit("private:typing", { to: activeChat.user._id })
        }
        onSend={(text) => send(text)}
      />
    </section>
  );
}


export default ChatWindow