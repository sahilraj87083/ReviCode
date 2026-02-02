import { useRef, useState } from "react";
import { ChatSidebar , ChatWindow} from "../components";
import { useInbox } from '../hooks/useInbox.js'
import { usePrivateChat } from "../hooks/usePrivateChat.js";

function Messages() {
  const containerRef = useRef(null);
  const [activeChat, setActiveChat] = useState();
  const { inbox } = useInbox()
  const { messages, send, loadMore, hasMore } = usePrivateChat({ otherUserId : activeChat?.user?._id})


  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-80px)] bg-slate-900 flex"
    >
      <ChatSidebar
        inbox = {inbox}
        activeChat={activeChat}
        onSelect={setActiveChat}
      />

      <ChatWindow activeChat={activeChat} messages = {messages} send = {send} />
    </div>
  );
}

export default Messages;


