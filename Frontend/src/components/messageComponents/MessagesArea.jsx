import { useRef, useLayoutEffect } from "react";

function MessagesArea({ messages, currentUserId, chatType = "public" }) {
  const containerRef = useRef(null);
  
  // This ref tracks if we should force-scroll to bottom next time we get messages.
  // We initialize it as true so the very first load works.
  const shouldForceScroll = useRef(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. DETECT CHAT SWITCH (Reset)
    // If messages are cleared (length 0), it means we changed chats.
    // We arm the trigger to force-scroll when data arrives.
    if (messages.length === 0) {
      shouldForceScroll.current = true;
      return;
    }

    // 2. FORCE SCROLL (Initial Load of new chat)
    if (shouldForceScroll.current) {
      container.scrollTop = container.scrollHeight;
      shouldForceScroll.current = false;
      return;
    }

    // 3. SMART SCROLL (New Message)
    // For subsequent updates, only scroll if user is near bottom or sent the message.
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
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
    >
      {messages.map((msg, i) => {
        if (msg.type === "system") {
          return (
            <div
              key={msg.id || i}
              className="text-center text-xs text-slate-400"
            >
              {msg.text}
            </div>
          );
        }

        const isMe = msg.fromMe;
        const avatar = msg.sender?.avatar?.url;
        const name = msg.sender?.fullName || "User";

        return (
          <div
            key={msg.id || i}
            className={`flex items-end gap-2 ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {!isMe && (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-xs text-white">
                {avatar ? (
                  <img src={avatar} alt={name} className="w-full h-full" />
                ) : (
                  name[0]?.toUpperCase()
                )}
              </div>
            )}

            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words ${
                isMe
                  ? "bg-red-600 text-white rounded-br-none"
                  : "bg-slate-800 text-slate-200 rounded-bl-none"
              }`}
            >
              {!isMe && chatType === 'public' && (
                <p className="text-xs text-slate-400 mb-1">{name}</p>
              )}
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesArea;