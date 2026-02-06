import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

function QuestionRow({ index, attempt, question }) {
    
    // 1. Determine Status Styles
    const getStatusConfig = (status) => {
        switch (status) {
            case "solved":
                return {
                    color: "text-green-400",
                    bg: "bg-green-400/10 border-green-400/20",
                    icon: CheckCircle2,
                    label: "Solved"
                };
            case "attempted":
                return {
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10 border-yellow-400/20",
                    icon: AlertCircle,
                    label: "Attempted"
                };
            default: // unattempted or failed
                return {
                    color: "text-red-400",
                    bg: "bg-red-400/10 border-red-400/20",
                    icon: XCircle,
                    label: "Unsolved"
                };
        }
    };

    const config = getStatusConfig(attempt.status);
    const StatusIcon = config.icon;

    // 2. Determine Difficulty Styles
    const getDifficultyColor = (diff) => {
        switch (diff) {
            case "easy": return "text-green-400 bg-green-400/10";
            case "medium": return "text-yellow-400 bg-yellow-400/10";
            case "hard": return "text-red-400 bg-red-400/10";
            default: return "text-slate-400 bg-slate-700/50";
        }
    };

    // 3. Helper to format time (e.g., 76 -> 1m 16s)
    const formatTime = (seconds) => {
        if (!seconds) return "0s";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    return (
        <div className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200">
            
            {/* Left: Question Details */}
            <div className="flex items-start gap-4">
                {/* Q Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-bold font-mono">
                    Q{index + 1}
                </div>

                <div className="flex flex-col gap-1">
                    {/* Title */}
                    <h4 className="text-white font-medium text-base md:text-lg leading-tight">
                        {question?.title || "Unknown Question"}
                    </h4>
                    
                    {/* Metadata Row */}
                    <div className="flex items-center gap-3">
                        {/* Difficulty Badge */}
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wide ${getDifficultyColor(question?.difficulty)}`}>
                            {question?.difficulty || "N/A"}
                        </span>
                        
                        {/* ID (Optional, usually hidden or small) */}
                        <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                           ID: {attempt.questionId.slice(-6)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Status & Time */}
            <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 md:gap-8 mt-2 md:mt-0 pl-14 md:pl-0 border-t border-slate-700/50 md:border-t-0 pt-3 md:pt-0">
                
                {/* Time Taken */}
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={14} />
                    <span className="font-mono text-sm font-medium">
                        {formatTime(attempt.timeSpent)}
                    </span>
                </div>

                {/* Status Pill */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bg} ${config.color}`}>
                    <StatusIcon size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {config.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default QuestionRow;