import { useRef, useState } from "react";
import { ChatSidebar , ChatWindow} from "../components";
import { useInbox } from '../hooks/useInbox.js'

function Messages() {
  const containerRef = useRef(null);
  const [activeChat, setActiveChat] = useState();
  const { inbox } = useInbox()


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

      <ChatWindow activeChat={activeChat} />
    </div>
  );
}

export default Messages;


