import { useState } from "react";
import {Input} from '../'

function MessageInput() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("send:", message);
    setMessage("");
  };

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900">
      <div className="flex items-center gap-3 w-full">

        {/* Input takes full width */}
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            isChat
            onSend={sendMessage}
            className="w-full"
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={sendMessage}
          className="
            px-4 py-2
            bg-red-600 hover:bg-red-500
            text-white rounded-md
            font-medium transition
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput