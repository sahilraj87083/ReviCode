import { useState } from "react";
import {Input} from '../'

function MessageInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping?.();
};

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            isChat
            onSend={sendMessage}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default MessageInput