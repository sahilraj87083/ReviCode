function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

export default StatCard