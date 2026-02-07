import { useState, useRef, useEffect } from "react";
import { Button, PublicMetaCards } from "../components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams, useNavigate } from "react-router-dom";
import { getContestByIdService, startContestService } from "../services/contest.services";
import { getAllParticipantsService, leaveContestService } from "../services/contestParticipant.service";
import { useUserContext } from "../contexts/UserContext";
import { useSocketContext } from "../contexts/socket.context";
import toast from 'react-hot-toast';
import { useContestChat } from "../hooks/useContestChat";
import MessagesArea from '../components/messageComponents/MessagesArea';
import MessageInput from '../components/messageComponents/MessageInput';
import { 
  Users, 
  MessageSquare, 
  Play, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  X, 
  ChevronDown 
} from "lucide-react";

function GroupContestLobby() {
  const containerRef = useRef(null);
  const chatSheetRef = useRef(null);

  const [contest, setContest] = useState();
  const [participants, setParticipants] = useState();
  const [contestQuestions, setContestQuestions] = useState();
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserContext();
  const { socket } = useSocketContext();

  const isHost = user?._id === contest?.owner?._id;
  const chatEnabled = contest?.status !== "live";

  const { contestId } = useParams();

  const { messages, send } = useContestChat({
    contestId,
    phase: "lobby",
  });

  const fetchContest = async () => {
    try {
      const contest = await getContestByIdService(contestId);
      setContest(contest);
      setContestQuestions(contest.questions);

      if (contest.status === 'live') navigate(`/contests/${contestId}/live`);
      if (contest?.status === 'ended') navigate('/user/contests');

    } catch (error) {
      toast.error("Contest not found");
      navigate('/user/contests');
    }
  };

  useEffect(() => {
    fetchContest();
  }, [contestId]);

  useEffect(() => {
    let interval;
    const fetchParticipants = async () => {
      const data = await getAllParticipantsService(contestId);
      setParticipants(data);
    };
    fetchParticipants();
    interval = setInterval(fetchParticipants, 5000);
    return () => clearInterval(interval);
  }, [contestId]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("contest:lobby:join", { contestId });
    return () => {
      socket.emit("contest:lobby:leave", { contestId });
    };
  }, [contestId, socket]);

  const leaveContest = async () => {
    await leaveContestService(contest._id);
    socket.emit("contest:lobby:leave", { contestId: contest._id });
    navigate("/user/contests");
  };

  const startContestHandler = async () => {
    await startContestService(contest._id);
    socket.emit("contest:system", {
      contestId,
      message: "Contest started",
      phase: "lobby",
    });
  };

  useEffect(() => {
    if (!socket) return;
    const handleStart = ({ contestId }) => {
      navigate(`/contests/${contestId}/live`);
    };
    socket.on("contest:started", handleStart);
    return () => {
      socket.off("contest:started", handleStart);
    };
  }, [socket, navigate]);

  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  // Chat Sheet Animation
  useGSAP(() => {
    if (isChatOpen && chatSheetRef.current) {
      gsap.fromTo(chatSheetRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isChatOpen]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 md:px-6 pt-20 pb-24 md:pb-10 selection:bg-red-500/30">
      
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto space-y-6">

        {/* ---------------- TOP BAR ---------------- */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {contest?.title}
                </h1>
                <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                    contest?.status === "upcoming"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : contest?.status === "live"
                        ? "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                >
                    {contest?.status}
                </span>
            </div>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Clock size={14} /> Waiting for host to start...
            </p>
          </div>

          {/* Host Controls */}
          {isHost && contest?.status === "upcoming" ? (
             <Button 
                variant="primary" 
                onClick={startContestHandler} 
                className="w-full md:w-auto shadow-lg shadow-green-900/20 bg-green-600 hover:bg-green-500 border-green-500"
             >
                <Play size={18} className="mr-2 fill-current" /> Start Contest
             </Button>
          ) : (
             <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-800">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                Waiting for host...
             </div>
          )}
        </section>

        {/* ---------------- INFO GRID ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN: Participants & Meta */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Meta Cards */}
                <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <PublicMetaCards label="Code" value={contest?.contestCode} copy />
                    <PublicMetaCards label="Questions" value={contest?.questions.length} />
                    <PublicMetaCards label="Duration" value={`${contest?.durationInMin} m`} />
                </section>

                {/* Participants List */}
                <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <Users size={18} className="text-blue-500" /> Participants <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{participants?.length}</span>
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                        {participants?.map((p) => {
                            const isUserItself = p.user._id === user?._id;
                            const isUserHost = p.user._id === contest?.owner?._id;

                            return (
                            <div
                                key={p._id}
                                className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-700">
                                        {p.user.fullName[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white">{p.user.fullName}</span>
                                            {isUserItself && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">YOU</span>}
                                            {isUserHost && <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">HOST</span>}
                                        </div>
                                        <p className="text-xs text-slate-500">@{p.user.username}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                                        <CheckCircle2 size={12} /> Ready
                                    </div>
                                    {!isHost && isUserItself && (
                                        <button 
                                            onClick={leaveContest}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Leave Contest"
                                        >
                                            <LogOut size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* RIGHT COLUMN: Chat (Desktop) & Questions */}
            <div className="space-y-6 h-full flex flex-col">
                
                {/* DESKTOP CHAT */}
                <section className="hidden lg:flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden h-[400px]">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center shrink-0">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <MessageSquare size={18} className="text-indigo-500" /> Lobby Chat
                        </h3>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    </div>
                    
                    {/* FIX: Added 'flex flex-col' so flex-1 works on MessagesArea */}
                    <div className="flex-1 overflow-hidden bg-slate-950/30 relative flex flex-col">
                         <MessagesArea messages={messages} currentUserId={user._id} />
                    </div>
                    
                    {chatEnabled && (
                        <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
                           <MessageInput onSend={(msg) => send(msg)} />
                        </div>
                    )}
                </section>

                {/* QUESTIONS PREVIEW */}
                <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex-1">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Problem Set Preview
                    </h2>
                    <div className="space-y-3">
                        {contestQuestions?.map((q, i) => (
                        <div
                            key={q._id}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800"
                        >
                            <span className="text-slate-300 text-sm font-medium truncate pr-4 flex-1">
                                {i + 1}. {q.title}
                            </span>
                            <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide border ${
                                    q.difficulty === "easy"
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : q.difficulty === "medium"
                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                }`}
                            >
                                {q.difficulty}
                            </span>
                        </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
      </div>

      {/* ---------------- MOBILE FLOATING CHAT BUTTON ---------------- */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl shadow-indigo-900/50 z-40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
         <MessageSquare size={24} fill="currentColor" />
         <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950"></span>
      </button>

      {/* ---------------- MOBILE CHAT SHEET (Overlay) ---------------- */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={() => setIsChatOpen(false)}
          ></div>

          {/* Sheet Container */}
          <div 
            ref={chatSheetRef}
            className="absolute bottom-0 left-0 right-0 h-[85vh] bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col border-t border-slate-700"
          >
            {/* Drag Handle / Header */}
            <div className="h-14 flex items-center justify-between px-6 border-b border-slate-800 shrink-0 cursor-pointer" onClick={() => setIsChatOpen(false)}>
                 <div className="w-10 h-1 bg-slate-700 rounded-full absolute left-1/2 -translate-x-1/2 top-3"></div>
                 <h2 className="text-lg font-bold text-white mt-2">Lobby Chat</h2>
                 <button className="text-slate-400 hover:text-white mt-2">
                    <ChevronDown size={24} />
                 </button>
            </div>

            {/* FIX: Added 'flex flex-col' here as well */}
            <div className="flex-1 overflow-hidden relative bg-slate-950/30 flex flex-col">
               <MessagesArea messages={messages} currentUserId={user._id} />
            </div>

            {/* Input Area */}
            {chatEnabled && (
               <div className="p-3 bg-slate-900 border-t border-slate-800 pb-safe shrink-0">
                  <MessageInput onSend={(msg) => send(msg)} />
               </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default GroupContestLobby;