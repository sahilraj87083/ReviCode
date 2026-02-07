import { NavLink } from "react-router-dom";
import { Layers, Star, ChevronRight, FolderOpen } from "lucide-react";

function PublicCollections() {
  const collections = [
    { id: 1, title: "Blind 75 Essential", count: 75, difficulty: "Mixed", rating: 4.9 },
    { id: 2, title: "Graph Algorithms", count: 30, difficulty: "Hard", rating: 4.8 },
    { id: 3, title: "DP Patterns", count: 50, difficulty: "Medium", rating: 4.7 },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {collections.map((c) => (
        <div
          key={c.id}
          className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-1 transition-all hover:-translate-y-1"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-20 group-hover:via-blue-500 group-hover:opacity-100 transition-all"></div>

          <div className="bg-slate-950/50 rounded-xl p-6 h-full flex flex-col">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                <FolderOpen size={24} />
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{c.title}</h3>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{c.count} Questions</span>
                <span>•</span>
                <span>{c.difficulty}</span>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star size={14} fill="currentColor" /> {c.rating}
                </div>
                <NavLink
                    to={`/collections/${c.id}`}
                    className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                    View <ChevronRight size={14} />
                </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicCollections;