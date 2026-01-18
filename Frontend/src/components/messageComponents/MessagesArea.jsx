import { useEffect, useRef } from "react";

function MessagesArea({ messages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // if (!containerRef.current) return;

    // containerRef.current.scrollTo({
    //   top: containerRef.current.scrollHeight,
    //   behavior: "smooth",
    // });
    const container = containerRef.current;
    if (!container) return;

    const nearBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      200;

    if (nearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-md px-4 py-2 rounded-lg text-sm
            ${
              msg.fromMe
                ? "ml-auto bg-red-600 text-white"
                : "bg-slate-800 text-slate-200"
            }
          `}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}



export default MessagesArea