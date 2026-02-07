import MessageInput from "./MessageInput";
import MessagesArea from "./MessagesArea";
import { useSocketContext } from "../../contexts/socket.context";
import { Phone, Video, Info, ArrowLeft } from "lucide-react";

function ChatWindow({ activeChat, messages, send, isTyping, onBack }) {
  const { socket } = useSocketContext();

  // 1. EMPTY STATE (No chat selected)
  if (!activeChat) {
    return (
      <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-slate-900 h-full border-l border-slate-800/50">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <i className="ri-chat-smile-3-line text-5xl text-slate-500"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your Messages</h3>
        <p className="text-slate-500 text-sm max-w-xs text-center">
          Send private photos and messages to a friend or group.
        </p>
      </div>
    );
  }

  // 2. ACTIVE CHAT UI
  return (
    <section 
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col h-[100dvh] md:static md:h-full md:z-auto md:w-full md:bg-slate-900"
    >
      
      {/* --- HEADER --- */}
      <div className="h-16 px-3 md:px-4 flex items-center justify-between shrink-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-10">
        
        {/* LEFT: Back Btn + Avatar + Name */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 overflow-hidden mr-2">
          {/* Back Button (Mobile) */}
          <button 
            onClick={onBack}
            className="md:hidden -ml-1 p-2 text-slate-300 hover:text-white rounded-full active:bg-slate-800 transition"
          >
            <ArrowLeft size={22} />
          </button>

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                {activeChat.user.avatar ? (
                    <img 
                        src={activeChat.user.avatar.url} 
                        alt="avatar" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-sm font-bold text-white">
                        {activeChat.user.fullName[0]?.toUpperCase()}
                    </span>
                )}
              </div>
            </div>
            {/* Online Indicator */}
            {isTyping && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-bounce"></span>
            )}
          </div>

          {/* Name & Status */}
          <div className="flex flex-col overflow-hidden justify-center">
            <h2 className="text-white font-semibold text-sm md:text-base truncate leading-tight">
              {activeChat?.user?.fullName}
            </h2>
            
            <div className="h-4 flex items-center">
                {isTyping ? (
                    <span className="text-xs font-medium text-green-400 animate-pulse flex items-center gap-1">
                        typing<span className="tracking-widest">...</span>
                    </span>
                ) : (
                    <span className="text-xs text-slate-400 truncate">
                        Online
                    </span>
                )}
            </div>
          </div>
        </div>

        {/* RIGHT: Actions */}
        {/* FIX: Removed 'hidden sm:block' to show on mobile */}
        <div className="flex items-center gap-4 text-slate-400 shrink-0">
            <button className="hover:text-white transition p-1">
                <Phone size={20} />
            </button>
            <button className="hover:text-white transition p-1">
                <Video size={22} />
            </button>
            <button className="hover:text-white transition p-1">
                <Info size={22} />
            </button>
        </div>
      </div>

      {/* --- MESSAGES AREA --- */}
      <div className="flex-1 overflow-hidden relative bg-slate-950 flex flex-col">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>
          
          <MessagesArea messages={messages} chatType="private" />
      </div>
      

      {/* --- INPUT AREA --- */}
      <div className="shrink-0 bg-slate-900 border-t border-slate-800 pb-safe"> 
        <MessageInput
          onTyping={() =>
            socket.emit("private:typing", { to: activeChat.user._id })
          }
          onSend={(text) => send(text)}
        />
      </div>
    </section>
  );
}

export default ChatWindow;