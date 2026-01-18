function MessagesArea() {
  const messages = [
    { fromMe: false, text: "Hey ready for contest?" },
    { fromMe: true, text: "Yes! Let's go 🚀" },
    { fromMe: false, text: "Join link sent" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
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