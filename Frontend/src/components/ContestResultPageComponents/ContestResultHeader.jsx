import { Timer, Users, Lock, Trophy, CalendarCheck } from "lucide-react";

function ContestResultHeader({ contest }) {
    if (!contest) return null;

    // Helper to determine mode icon & text
    const isGroup = contest.visibility === "shared";
    const ModeIcon = isGroup ? Users : Lock;
    const modeText = isGroup ? "Group Contest" : "Private Contest";

    return (
        <div className="relative overflow-hidden bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg">
            
            {/* Background Decorative Glow (Optional) */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Left Side: Title & Label */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-red-500 uppercase mb-1">
                        <Trophy size={14} />
                        <span>Contest Results</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white capitalize tracking-tight leading-tight">
                        {contest.title}
                    </h1>
                    
                    {/* Contest ID (Small) */}
                    <p className="text-slate-500 text-xs font-mono">
                        Code: {contest.contestCode}
                    </p>
                </div>

                {/* Right Side: Stats Grid */}
                <div className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-0">
                    
                    {/* Stat Badge 1: Status */}
                    <StatusBadge 
                        icon={CalendarCheck} 
                        label="Status" 
                        value={contest.status} 
                        colorClass="text-slate-300 bg-slate-800/50 border-slate-700"
                    />

                    {/* Stat Badge 2: Duration */}
                    <StatusBadge 
                        icon={Timer} 
                        label="Duration" 
                        value={`${contest.durationInMin} Min`} 
                        colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20"
                    />

                    {/* Stat Badge 3: Mode */}
                    <StatusBadge 
                        icon={ModeIcon} 
                        label="Mode" 
                        value={modeText} 
                        colorClass={isGroup ? "text-purple-400 bg-purple-500/10 border-purple-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20"}
                    />

                </div>
            </div>
        </div>
    );
}

// Sub-component for clean badges
function StatusBadge({ icon: Icon, label, value, colorClass }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${colorClass} transition-all hover:scale-[1.02]`}>
            <div className="p-1.5 rounded-full bg-slate-900/30">
                <Icon size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none mb-1">
                    {label}
                </span>
                <span className="text-sm font-semibold capitalize leading-none">
                    {value}
                </span>
            </div>
        </div>
    );
}

export default ContestResultHeader;