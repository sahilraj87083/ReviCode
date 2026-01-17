function RecentRow({ title, score, rank }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40 last:border-none">
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-slate-400 text-sm">Score: {score}</p>
      </div>
      <span className="text-slate-300 text-sm">{rank}</span>
    </div>
  );
}

export default RecentRow