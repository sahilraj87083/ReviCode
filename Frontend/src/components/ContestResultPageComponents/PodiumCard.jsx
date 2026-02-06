import { Trophy, Medal, Timer, CheckCircle2 } from "lucide-react";

// Sub-component for Top 3 Cards to keep code clean

function PodiumCard({ player, styles, order, height, isWinner }) {
  return (
    <div
      className={`${order} ${styles.bg} ${styles.border} ${styles.glow} ${height} 
      relative flex flex-col items-center justify-center border rounded-2xl p-4 transition-transform hover:scale-[1.02] duration-300`}
    >
      {/* Crown for Winner */}
      {isWinner && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce">
           <Trophy className="w-8 h-8 text-yellow-500 drop-shadow-lg" fill="currentColor" />
        </div>
      )}

      {/* Rank Badge */}
      <div className={`absolute top-3 right-3 text-2xl filter drop-shadow-md`}>
         {styles.icon}
      </div>

      {/* Avatar */}
      <div className={`relative mb-3 ${isWinner ? 'mt-2' : ''}`}>
        <img
            src={player.user?.avatar?.url}
            alt="Profile"
            className={`rounded-full object-cover shadow-2xl ${
                isWinner ? "w-20 h-20 md:w-24 md:h-24 border-4" : "w-16 h-16 md:w-20 md:h-20 border-2"
            } ${styles.text.replace('text', 'border')}`} // Use text color class for border
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-xs font-bold px-2 py-0.5 rounded-full border text-white text-center border-slate-700">
            Rank {player.rank}
        </div>
      </div>

      {/* Name */}
      <h4 className="text-white font-bold text-center truncate w-full px-2">
        {player.user?.fullName}
      </h4>
      <p className={`text-xs ${styles.text} font-medium mb-3`}>
        @{player.user?.username}
      </p>

      {/* Score Pill */}
      <div className="bg-slate-900/80 rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
        <span className={`text-lg md:text-xl font-bold ${styles.text}`}>
            {player.score?.toFixed(1)}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Points
        </span>
      </div>
      
      {/* Extra Stats (Solved) */}
      <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
         <CheckCircle2 size={12} />
         <span>{player.solvedCount} Solved</span>
      </div>

    </div>
  );
}

export default PodiumCard