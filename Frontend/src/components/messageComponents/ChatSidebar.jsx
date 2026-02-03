import { useMemo, useState, useEffect } from "react";
import { Input } from "../";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ChatSidebar({ inbox = [], activeChat, onSelect }) {
  const [searchChat, setSearchChat] = useState("");

  useEffect(() => {
    if (!inbox?.length) return;

    gsap.from(
      `.chat-item-${inbox[0].user._id}`,
      {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  }, [inbox]);


  //  Filter inbox by name
  const filteredInbox = useMemo(() => {
    if (!searchChat.trim()) return inbox;

    return inbox.filter(chat =>
      chat.user.fullName
        .toLowerCase()
        .includes(searchChat.toLowerCase())
    );
  }, [searchChat, inbox]);

  return (
    <aside className="w-80 border-r border-slate-800 flex flex-col bg-slate-900">
      {/* Search */}
      <div className="p-4 border-b border-slate-800">
        <Input
          value={searchChat}
          onChange={(e) => setSearchChat(e.target.value)}
          placeholder="Search chats..."
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {filteredInbox.length === 0 && (
          <div className="text-center text-slate-500 text-sm mt-6">
            No chats found
          </div>
        )}

        {filteredInbox.map((chat) => {
          const isActive =
            activeChat?.user?._id === chat.user._id;

          return (
            <button
              key={chat.user._id}
              onClick={() => onSelect(chat)}
              className={`chat-item-${chat.user._id} w-full flex gap-3 px-4 py-3 text-left border-b border-slate-800
                transition
                ${
                  isActive
                    ? "bg-slate-800"
                    : "hover:bg-slate-800/60"
                }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-slate-700 flex
                              items-center justify-center text-white font-semibold">
                {chat.user.avatar ? (
                  <img
                    src={chat.user.avatar.url}
                    alt={chat.user.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  chat.user.fullName[0]
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium truncate">
                    {chat.user.fullName} 
                  </p>
                  {chat.unreadCount > 0 && (
                      <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}

                  {chat.isNew && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full
                                     bg-green-500/10 text-green-400">
                      New
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 truncate mt-1">
                  {chat.lastMessage || "Start a conversation"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ChatSidebar;
