import { useState } from "react";
import { Smile, Paperclip, Mic } from "lucide-react";

function MessageInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-3 py-3 md:px-4 md:py-4 bg-slate-900 border-t border-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto w-full">
        
        {/* --- ATTACHMENT ACTIONS --- */}
        <div className="flex items-center gap-1 shrink-0 text-slate-400">
           {/* FIX: Removed 'hidden sm:block' to make it visible on mobile */}
           <button className="p-2 hover:bg-slate-800 rounded-full transition hover:text-white">
              <Smile size={24} />
           </button>
           <button className="p-2 hover:bg-slate-800 rounded-full transition hover:text-white">
              <Paperclip size={22} />
           </button>
        </div>

        {/* --- MAIN INPUT --- */}
        <div className="flex-1 relative bg-slate-800/50 rounded-2xl border border-slate-700/50 focus-within:border-slate-600 focus-within:bg-slate-800 transition-all">
          <input
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="w-full bg-transparent text-white px-4 py-3 focus:outline-none placeholder:text-slate-500 text-base"
            autoComplete="off"
          />
        </div>

        {/* --- SEND BUTTON --- */}
        <div className="shrink-0">
           {message.trim() ? (
             <button 
                onClick={handleSend}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 transition-transform active:scale-95"
             >
                <i className="ri-send-plane-fill text-xl ml-0.5"></i>
             </button>
           ) : (
             <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <Mic size={22} />
             </button>
           )}
        </div>

      </div>
    </div>
  );
}

export default MessageInput;