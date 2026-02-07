import { UserPlus, Award } from "lucide-react";

function TopCreators() {
  const creators = [
    { id: 1, name: "sahilsingh", solved: 1450, rank: 1, avatar: "https://ui-avatars.com/api/?name=Sahil+Singh&background=0D8ABC&color=fff" },
    { id: 2, name: "uzmakhan", solved: 1320, rank: 2, avatar: "https://ui-avatars.com/api/?name=Uzma+Khan&background=10b981&color=fff" },
    { id: 3, name: "alex_code", solved: 1250, rank: 3, avatar: "https://ui-avatars.com/api/?name=Alex+C&background=f43f5e&color=fff" },
    { id: 4, name: "dev_master", solved: 980, rank: 4, avatar: "https://ui-avatars.com/api/?name=Dev+M&background=8b5cf6&color=fff" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {creators.map((c) => (
        <div
          key={c.id}
          className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors"
        >
          {/* Rank Badge for Top 3 */}
          {c.rank <= 3 && (
            <div className={`absolute top-0 right-4 w-8 h-10 flex items-center justify-center rounded-b-lg font-bold text-sm shadow-lg
                ${c.rank === 1 ? 'bg-yellow-500 text-black' : c.rank === 2 ? 'bg-slate-300 text-black' : 'bg-orange-700 text-white'}
            `}>
                #{c.rank}
            </div>
          )}

          <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-slate-700 to-slate-800 mb-4 group-hover:from-red-500 group-hover:to-purple-500 transition-all">
            <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full border-4 border-slate-900 object-cover" />
          </div>

          <h4 className="text-white font-bold text-lg">{c.name}</h4>
          
          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm mt-1 mb-4">
             <Award size={14} className="text-red-500" /> 
             <span>{c.solved} Solved</span>
          </div>

          <button className="w-full py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-semibold text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group-hover:border-transparent">
             <UserPlus size={16} /> Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default TopCreators;