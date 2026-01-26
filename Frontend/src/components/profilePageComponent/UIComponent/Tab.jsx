function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium transition
        ${
          active
            ? "text-white border-b-2 border-red-500"
            : "text-slate-400 hover:text-white"
        }`}
    >
      {label}
    </button>
  );
}

export {
    Tab
}