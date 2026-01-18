import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Input, ChatSidebar , ChatWindow} from "../components";

function Messages() {
  const containerRef = useRef(null);
  const [activeChat, setActiveChat] = useState(null);

  useGSAP(() => {
    gsap.from(".chat-animate", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-80px)] bg-slate-900 flex"
    >
      <ChatSidebar
        activeChat={activeChat}
        onSelect={setActiveChat}
      />

      <ChatWindow activeChat={activeChat} />
    </div>
  );
}

export default Messages;


