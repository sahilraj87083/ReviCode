import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Code2, 
  Search, 
  Layers, 
  Users, 
  Zap,
  FileQuestion 
} from "lucide-react";
import { LiveContests, PublicCollections, TopCreators, QuestionsList } from "../components";

function Community() {
  const [activeTab, setActiveTab] = useState("questions"); 
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    // Added 'pt-14 md:pt-20' to push the whole page down below the fixed global header
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30 pb-20 pt-14 md:pt-20 relative">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* FLOATING HEADER (Local) */}
      {/* Changed 'top-0' to 'top-14 md:top-20' so it sticks BELOW the main app header */}
      <header className="sticky top-14 md:top-20 z-40 px-4 py-4 mb-5 flex justify-end items-center pointer-events-none">
        
        {/* NAVIGATION TABS */}
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-4 flex items-center bg-black/60 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl gap-1 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
            <TabButton active={activeTab === "questions"} onClick={() => setActiveTab("questions")} icon={FileQuestion} label="Problems" />
            <TabButton active={activeTab === "contests"} onClick={() => setActiveTab("contests")} icon={Zap} label="Contests" />
            <TabButton active={activeTab === "collections"} onClick={() => setActiveTab("collections")} icon={Layers} label="Collections" />
            <TabButton active={activeTab === "creators"} onClick={() => setActiveTab("creators")} icon={Users} label="Creators" />
        </div>

      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-6">
          
          {/* Dynamic Header Text */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight">
              {activeTab === "questions" && <>Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Problems.</span></>}
              {activeTab === "contests" && <>Compete & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Conquer.</span></>}
              {activeTab === "collections" && <>Learn from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Best.</span></>}
              {activeTab === "creators" && <>Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Legends.</span></>}
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              {activeTab === "questions" && "Browse thousands of coding problems, filter by difficulty, and track your progress."}
              {activeTab === "contests" && "Join live battles, test your skills, and climb the global leaderboard."}
              {activeTab === "collections" && "Curated problem sets to master Data Structures and Algorithms."}
              {activeTab === "creators" && "Follow top competitive programmers and see their latest activity."}
            </p>
          </div>

          <div ref={contentRef}>
            {activeTab === "questions" && <QuestionsList />}
            {activeTab === "contests" && <LiveContests />}
            {activeTab === "collections" && <PublicCollections />}
            {activeTab === "creators" && <TopCreators />}
          </div>

      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
                ${active 
                    ? "bg-slate-800 text-white shadow-lg shadow-black/50" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }
            `}
        >
            <Icon size={16} className={active ? "text-white" : ""} />
            <span className="hidden md:inline">{label}</span>
        </button>
    );
}

export default Community;