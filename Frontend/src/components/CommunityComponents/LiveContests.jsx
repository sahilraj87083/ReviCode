import { NavLink } from "react-router-dom";
import { Timer, Trophy, Users, ArrowRight, Calendar } from "lucide-react";

function LiveContests() {
  const contests = [
    { id: 1, title: "Weekly Sprint #45", questions: 4, time: "90 min", participants: 120, status: "live" },
    { id: 2, title: "Bi-Weekly Battle", questions: 3, time: "60 min", participants: 85, status: "upcoming" },
    { id: 3, title: "Dynamic Programming Bash", questions: 5, time: "120 min", participants: 340, status: "upcoming" },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contests.map((c) => (
        <div
          key={c.id}
          className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/10"
        >
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-4">
             <div className={`
                px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
                ${c.status === "live" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}
             `}>
                {c.status === "live" && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                {c.status}
             </div>
             <Trophy className="text-slate-700 group-hover:text-yellow-500 transition-colors" size={20} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{c.title}</h3>
          
          <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
             <div className="flex items-center gap-1.5"><Timer size={14} /> {c.time}</div>
             <div className="flex items-center gap-1.5"><Users size={14} /> {c.participants}</div>
          </div>

          <NavLink
            to={`/contests/${c.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-white font-semibold group-hover:bg-red-600 transition-all"
          >
            {c.status === "live" ? "Join Now" : "Register"} <ArrowRight size={16} />
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default LiveContests;