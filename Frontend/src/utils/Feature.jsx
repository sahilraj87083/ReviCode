function Feature({ title, desc }) {
  return (
    <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

export default Feature