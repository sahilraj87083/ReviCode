import { useMemo, useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Helper: Format date to "10:30 AM" or "Feb 24"
const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  
  // Check if it's today
  const isToday = date.toDateString() === now.toDateString();
  
  return isToday 
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

function ChatSidebar({ inbox = [], activeChat, onSelect }) {
  const [searchChat, setSearchChat] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Refs for animation
  const headerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // GSAP: Smooth toggle animation
  useGSAP(() => {
    if (isSearchOpen) {
      // Search Enter
      gsap.fromTo(searchContainerRef.current, 
        { x: 20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Header Enter
       gsap.fromTo(headerRef.current, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isSearchOpen]);

  const handleCloseSearch = () => {
    setSearchChat("");
    setIsSearchOpen(false);
  };

  const filteredInbox = useMemo(() => {
    if (!searchChat.trim()) return inbox;
    return inbox.filter((chat) =>
      chat.user.fullName.toLowerCase().includes(searchChat.toLowerCase())
    );
  }, [searchChat, inbox]);

  return (
    <aside className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-900 h-full">
      
      {/* --- HEADER --- */}
      <div className="h-20 px-4 flex items-center justify-between shrink-0 border-b border-slate-800 relative overflow-hidden">
        
        {!isSearchOpen ? (
          // Default View
          <div ref={headerRef} className="w-full flex items-center justify-between">
            <div>
                 <h2 className="text-white font-bold text-xl tracking-tight">Messages</h2>
                 <p className="text-slate-500 text-xs font-medium">{inbox.length} conversations</p>
            </div>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all hover:text-white border border-slate-700 hover:border-slate-600"
            >
              <i className="ri-search-line text-lg"></i>
            </button>
          </div>
        ) : (
          // Search View
          <div ref={searchContainerRef} className="w-full flex items-center gap-3">
            <button onClick={handleCloseSearch} className="text-slate-400 hover:text-white transition p-1">
               <i className="ri-arrow-left-line text-xl"></i>
            </button>
            
            <div className="flex-1 relative">
               <input
                 ref={searchInputRef}
                 value={searchChat}
                 onChange={(e) => setSearchChat(e.target.value)}
                 placeholder="Search messages..."
                 className="w-full h-10 pl-4 pr-4 text-sm rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-slate-500 focus:outline-none placeholder:text-slate-500 transition-all"
               />
               {searchChat && (
                 <button 
                    onClick={() => setSearchChat("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                 >
                    <i className="ri-close-fill"></i>
                 </button>
               )}
            </div>
          </div>
        )}
      </div>

      {/* --- CHAT LIST --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredInbox.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3 opacity-60">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                 <i className="ri-chat-smile-2-line text-3xl"></i>
             </div>
             <p className="text-sm font-medium">
                {isSearchOpen ? "No user found" : "No conversations yet"}
             </p>
          </div>
        ) : (
            <div className="flex flex-col">
                {filteredInbox.map((chat) => {
                // Determine if active (compare conversationId or fallback to user id)
                const isActive = activeChat?.conversationId === chat.conversationId;
                const timeDisplay = formatTime(chat.lastAt);

                return (
                    <button
                    key={chat.conversationId || chat.user._id}
                    onClick={() => onSelect(chat)}
                    className={`group w-full flex items-center gap-3 px-4 py-4 text-left border-b border-slate-800/50 transition-all duration-200
                        ${isActive 
                            ? "bg-slate-800 border-l-4 border-l-red-500 pl-[12px]" // Active: Darker bg + Red Border
                            : "hover:bg-slate-800/40 border-l-4 border-l-transparent hover:border-l-slate-700"
                        }`}
                    >
                    {/* Avatar Area */}
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg overflow-hidden border border-slate-600 shadow-sm">
                            {chat.user.avatar ? (
                                <img src={chat.user.avatar.url} alt={chat.user.fullName} className="w-full h-full object-cover"/>
                            ) : (
                                chat.user.fullName[0]?.toUpperCase()
                            )}
                        </div>
                        {/* Optional Online Dot */}
                        {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div> */}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                        <div className="flex justify-between items-baseline">
                            <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                                {chat.user.fullName}
                            </h3>
                            <span className={`text-[10px] font-medium shrink-0 ${chat.unreadCount > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                                {timeDisplay}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center gap-2">
                            <p className={`text-xs truncate max-w-[85%] ${
                                chat.unreadCount > 0 ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'
                            }`}>
                                {chat.isNew && <span className="text-blue-400 font-semibold mr-1">New •</span>}
                                {chat.lastMessage || "Start a conversation"}
                            </p>
                            
                            {chat.unreadCount > 0 && (
                                <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-red-600 text-[10px] font-bold px-1.5 rounded-full text-white shadow-sm">
                                    {chat.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                    </button>
                );
                })}
            </div>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;