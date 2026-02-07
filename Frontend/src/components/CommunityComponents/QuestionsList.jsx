import { CheckCircle2, Circle, ArrowUpRight, Filter } from "lucide-react";

function QuestionsList() {
  // Mock Data
  const questions = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "48%", status: "solved", tags: ["Array", "Hash Table"] },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: "39%", status: "unsolved", tags: ["Linked List", "Math"] },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "33%", status: "attempted", tags: ["Sliding Window"] },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "35%", status: "unsolved", tags: ["Binary Search"] },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "32%", status: "solved", tags: ["DP", "String"] },
    { id: 42, title: "Trapping Rain Water", difficulty: "Hard", acceptance: "59%", status: "unsolved", tags: ["Two Pointers"] },
  ];

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Hard": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-slate-400";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "solved") return <CheckCircle2 size={18} className="text-green-500" />;
    if (status === "attempted") return <Circle size={18} className="text-yellow-500" />;
    return <Circle size={18} className="text-slate-600" />;
  };

  return (
    <div className="w-full space-y-6">
      
      {/* --- FILTERS BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          
          {/* Search */}
          <input 
            type="text" 
            placeholder="Search questions..." 
            className="w-full md:w-96 bg-slate-950 border border-slate-800 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-slate-600 transition-colors"
          />

          {/* Filter Chips */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
             <FilterButton label="All" active />
             <FilterButton label="Easy" color="text-emerald-400" />
             <FilterButton label="Medium" color="text-yellow-400" />
             <FilterButton label="Hard" color="text-red-400" />
             <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg transition ml-auto md:ml-0">
                <Filter size={14} /> Tags
             </button>
          </div>
      </div>

      {/* --- QUESTIONS TABLE --- */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-7 md:col-span-6">Title</div>
            <div className="col-span-2 text-center hidden md:block">Acceptance</div>
            <div className="col-span-4 md:col-span-3 text-right md:text-center">Difficulty</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-800/50">
            {questions.map((q) => (
                <div 
                    key={q.id} 
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-800/50 transition-colors group cursor-pointer"
                >
                    {/* Status */}
                    <div className="col-span-1 flex justify-center">
                        {getStatusIcon(q.status)}
                    </div>

                    {/* Title */}
                    <div className="col-span-7 md:col-span-6">
                        <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors truncate">
                            {q.id}. {q.title}
                        </div>
                        {/* Mobile Tags View */}
                        <div className="md:hidden flex gap-2 mt-1">
                             {q.tags.slice(0,1).map(t => <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{t}</span>)}
                        </div>
                    </div>

                    {/* Acceptance */}
                    <div className="col-span-2 text-center text-sm text-slate-500 hidden md:block">
                        {q.acceptance}
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-4 md:col-span-3 flex justify-end md:justify-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                        </span>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Pagination / Load More */}
        <div className="p-4 border-t border-slate-800 flex justify-center">
            <button className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 transition">
                Load More <ArrowUpRight size={14} />
            </button>
        </div>

      </div>
    </div>
  );
}

function FilterButton({ label, color = "text-slate-300", active }) {
    return (
        <button className={`
            px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
            ${active 
                ? "bg-slate-700 border-slate-600 text-white" 
                : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
            }
            ${!active && color !== "text-slate-300" ? `hover:${color}` : ""}
        `}>
            {label}
        </button>
    )
}

export default QuestionsList;