import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Copy, AlertTriangle, Clock, HelpCircle, Trophy } from "lucide-react";
import { MetaCard, DifficultyBadge, Button } from "../components";
import { getContestByIdService, startContestService } from "../services/contest.services";
import toast from "react-hot-toast";

function PrivateContestLobby() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [contest, setContest] = useState();

  const fetchContest = async () => {
    try {
        const contest = await getContestByIdService(contestId);
        setContest(contest);
        
        if(contest.status === 'live'){
          navigate(`/contests/${contestId}/live`)
        }
        if(contest?.status === 'ended'){
            navigate('/user/contests')
        }
    } catch (error) {
        toast.error("Contest not found")
        navigate('/user/contests')
    }
  }

  useEffect(() => {
    (async () => {
      await fetchContest()
    })();
  }, [contestId]);


  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
    });
  });

  const startContestHandler = async () => {
      await startContestService(contestId)
      navigate(`/contests/${contestId}/live`)
  }

  const copyCode = () => {
      if (contest?.contestCode) {
        navigator.clipboard.writeText(contest.contestCode);
        toast.success("Code copied!");
      }
  };

  return (
    // FIX: Added proper mobile padding (pt-20) to avoid header collision
    <div className="min-h-screen bg-slate-950 px-4 md:px-6 pt-20 pb-10 selection:bg-red-500/30">
        
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-3xl mx-auto space-y-8">

        {/* HEADER SECTION */}
        <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Trophy size={14} /> Private Contest
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white capitalize tracking-tight">
                {contest?.title}
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                Hosted by <span className="text-white font-medium">{contest?.owner?.fullName}</span>. Get ready to solve!
            </p>
        </div>

        {/* ACTION CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Code Section */}
                <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto text-center md:text-left">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Contest Code</span>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1 pr-4 group hover:border-slate-700 transition-colors">
                        <div className="bg-slate-800 p-2 rounded text-slate-400">
                            <Copy size={18} />
                        </div>
                        <span className="font-mono text-lg text-white tracking-widest select-all">
                           {contest?.contestCode}
                        </span>
                        <button
                            onClick={copyCode}
                            className="ml-2 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                        >
                            Copy
                        </button>
                    </div>
                </div>

                {/* Divider (Mobile Only) */}
                <div className="w-full h-px bg-slate-800 md:hidden"></div>

                {/* Start Button */}
                <div className="w-full md:w-auto">
                    <Button
                        onClick={startContestHandler}
                        size="lg"
                        className="w-full md:w-auto shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-500 border-blue-500 font-semibold text-base py-3 px-8"
                    >
                        Start Contest
                    </Button>
                </div>
            </div>
        </div>

        {/* META STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center hover:bg-slate-900 transition-colors">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
                <HelpCircle size={20} />
             </div>
             <p className="text-2xl font-bold text-white">{contest?.questions.length}</p>
             <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Questions</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center hover:bg-slate-900 transition-colors">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
                <Clock size={20} />
             </div>
             <p className="text-2xl font-bold text-white">{contest?.durationInMin} <span className="text-sm font-medium text-slate-500">min</span></p>
             <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Duration</p>
          </div>
        </div>

        {/* PREVIEW LIST */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/60">
             <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Problem Set</h3>
          </div>
          <div className="divide-y divide-slate-800/50">
            {contest?.questions.map((q, i) => (
              <div
                key={q._id}
                className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
              >
                <span className="text-sm text-slate-300 font-medium truncate pr-4">
                  {i + 1}. {q.title}
                </span>
                <DifficultyBadge level={q.difficulty} />
              </div>
            ))}
          </div>
        </div>

        {/* WARNING ALERT */}
        <div className="flex gap-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-orange-200 text-sm leading-relaxed">
            <AlertTriangle size={24} className="shrink-0 text-orange-500" />
            <div>
                <p className="font-bold text-orange-400 mb-1">Important Notice</p>
                The timer will start immediately after you click <b>Start Contest</b>. Once begun, the contest cannot be paused or restarted. Ensure you have a stable internet connection.
            </div>
        </div>

      </div>
    </div>
  );
}

export default PrivateContestLobby;