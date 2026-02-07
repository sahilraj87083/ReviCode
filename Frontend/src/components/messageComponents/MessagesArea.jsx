import { useRef, useLayoutEffect } from "react";

// Helper to format time (e.g., "10:30 AM")
const formatTime = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

function MessagesArea({ messages, currentUserId, chatType = "public" }) {
  const containerRef = useRef(null);
  const shouldForceScroll = useRef(true);

  // --- SCROLL LOGIC (Kept identical as it works well) ---
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (messages.length === 0) {
      shouldForceScroll.current = true;
      return;
    }

    if (shouldForceScroll.current) {
      container.scrollTop = container.scrollHeight;
      shouldForceScroll.current = false;
      return;
    }

    const threshold = 150;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;

    const lastMessage = messages[messages.length - 1];
    const isMe = lastMessage?.fromMe;

    if (isMe || isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar"
    >
      {messages.map((msg, i) => {
        // 1. SYSTEM MESSAGES (Centered Pills)
        if (msg.type === "system") {
          return (
            <div key={msg.id || i} className="flex justify-center py-2">
                <span className="bg-slate-800/80 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700/50">
                    {msg.text}
                </span>
            </div>
          );
        }

        // 2. USER MESSAGES
        const isMe = msg.fromMe;
        const prevMsg = messages[i - 1];
        
        // Grouping Logic: Check if previous message was from same sender
        const isSequence = prevMsg && prevMsg.senderId === msg.senderId && prevMsg.type !== "system";
        
        // Avatar/Name Logic
        const avatar = msg.sender?.avatar?.url;
        const name = msg.sender?.fullName || "User";
        const time = formatTime(msg.createdAt);

        return (
          <div
            key={msg.id || i}
            className={`flex flex-col ${isMe ? "items-end" : "items-start"} ${isSequence ? "mt-0.5" : "mt-4"}`}
          >
            {/* SENDER NAME (Only for Public Chat + First message in sequence + Not Me) */}
            {!isMe && chatType === "public" && !isSequence && (
               <span className="text-[10px] text-slate-400 ml-10 mb-1 font-medium">
                  {name}
               </span>
            )}

            <div className={`flex gap-2 max-w-[85%] md:max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              
              {/* AVATAR (Show only if NOT a sequence or it's the first one) */}
              {!isMe ? (
                <div className="w-8 h-8 shrink-0 flex items-end">
                    {!isSequence ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-slate-600">
                            {avatar ? (
                                <img src={avatar} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                name[0]?.toUpperCase()
                            )}
                        </div>
                    ) : (
                        <div className="w-8" /> // Spacer for alignment
                    )}
                </div>
              ) : null}

              {/* MESSAGE BUBBLE */}
              <div
                className={`group relative px-4 py-2 text-sm shadow-sm break-words
                  ${isMe 
                    ? "bg-red-600 text-white rounded-2xl rounded-tr-sm" 
                    : "bg-slate-800 text-slate-200 rounded-2xl rounded-tl-sm"
                  }
                `}
              >
                {/* Text Content */}
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                {/* Timestamp (Floating bottom right inside bubble) */}
                <div className={`text-[9px] mt-1 text-right opacity-70 ${isMe ? "text-red-100" : "text-slate-400"}`}>
                    {time}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Invisible element to ensure bottom spacing */}
      <div className="h-2" /> 
    </div>
  );
}

export default MessagesArea;