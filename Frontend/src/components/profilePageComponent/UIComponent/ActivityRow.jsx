function ActivityRow({ title, score, rank }) {
  return (
    <div className="flex items-center justify-between bg-slate-800/40 rounded-lg p-4">
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-slate-400 text-sm">Solved {rank}</p>
      </div>
      <span className="text-slate-200 font-semibold">{score}</span>
    </div>
  );
}

export {
    ActivityRow
}