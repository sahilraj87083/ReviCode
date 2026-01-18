import { useState } from "react";
import {Input} from '../'

function ChatSidebar({ activeChat, onSelect }) {
  const [searchChat, setSearchChat] = useState("")
  const chats = [
    { id: 1, name: "Sahil", last: "Bro contest was fire 🔥" },
    { id: 2, name: "Uzma", last: "Contest starts in 5 mins" },
    { id: 3, name: "Rahul", last: "Let's practice DP today" },
  ];

  return (
    <aside className="w-80 border-r border-slate-800 flex flex-col">
      {/* Search */}
      <div className="p-4">
        <Input
        value = {searchChat}
        onChange = {(e) => {
          setSearchChat(e.target.value)
        }}
          placeholder="Search chats..."
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none"
        />
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat)}
            className={`chat-animate w-full text-left px-4 py-3 border-b border-slate-800
              ${
                activeChat?.id === chat.id
                  ? "bg-slate-800"
                  : "hover:bg-slate-800/60"
              }
            `}
          >
            <p className="text-white font-medium">
              {chat.name}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {chat.last}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar