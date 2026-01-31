import { useState, useRef, useEffect} from "react";
import { Button, PublicMetaCards } from "../components";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams, useNavigate } from "react-router-dom";
import { getContestByIdService, startContestService } from "../services/contest.services";
import { getAllParticipantsService, leaveContestService } from "../services/contestParticipant.service";
import { useUserContext } from "../contexts/UserContext";
import { useSocketContext } from "../contexts/socket.context";
import toast from 'react-hot-toast'
import { useContestChat } from "../hooks/useContestChat";
import MessagesArea from '../components/messageComponents/MessagesArea'
import MessageInput from '../components/messageComponents/MessageInput'

function GroupContestLobby() {
  const containerRef = useRef(null);

  const [contest, setContest] = useState()
  const [participants, setParticipants] = useState()
  const [contestQuestions, setContestQuestions] = useState()

  const navigate = useNavigate()

  const { user } = useUserContext()
  const { socket } = useSocketContext()

  // ---- Mock state (replace with backend/socket later)
  const isHost = user?._id === contest?.owner?._id;
  // contest?.status; // upcoming | live | ended
  const chatEnabled = contest?.status !== "live";

  const { contestId } = useParams()

  const { messages , send } = useContestChat({
      contestId,
      phase: "lobby",
  });


  const fetchContest = async () => {
    try {
      const contest = await getContestByIdService(contestId);
      setContest(contest);
      setContestQuestions(contest.questions);

      if(contest.status === 'live')  navigate(`/contests/${contestId}/live`);
      if(contest?.status === 'ended') navigate('/user/contests')

    } catch (error) {
      toast.error("Contest not found")
      navigate('/user/contests')
    }
  };

  // Fetch contest once
  useEffect(()=>{
      fetchContest();
  }, [contestId])


  // Poll participants every X seconds
  useEffect(() => {
      let interval ;

      const fetchParticipants = async () => {
          const data = await getAllParticipantsService(contestId);
          // console.log(data)
          setParticipants(data)
      }
      fetchParticipants()

      interval = setInterval(fetchParticipants, 5000); // 5s polling

      return () => clearInterval(interval); // cleanup
  }, [contestId])


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
  }

  const startContestHandler = async () => {
      await startContestService(contest._id)

      socket.emit("contest:system", {
          contestId,
          message: "Contest started",
          phase: "lobby",
      });
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10">
      <div ref={containerRef} className="max-w-6xl mx-auto space-y-6">

        {/* ---------------- TOP BAR ---------------- */}
        <section className="flex items-center justify-between bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
          <div>
            <h1 className="text-xl font-semibold text-white capitalize">
              {contest?.title}
            </h1>
            <p className="text-sm text-slate-400">
              Status: {contest?.status === "upcoming" ? "Waiting Room" : contest?.status}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              contest?.status === "upcoming"
                ? "bg-green-600"
                : contest?.status === "live"
                ? "bg-red-600"
                : "bg-slate-600"
            }`}
          >
            {contest?.status.toUpperCase()}
          </span>
        </section>

        {/* ---------------- CONTEST META ---------------- */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PublicMetaCards label="Contest Code" value={contest?.contestCode} copy />
          <PublicMetaCards label="Questions" value={`${contest?.questions.length}`} />
          <PublicMetaCards label="Duration" value={`${contest?.durationInMin} MIN`} />
        </section>


        {/* ---------------- HOST CONTROLS  ---------------- */}
        <section className="bg-slate-800/60 border text-center border-slate-700 rounded-lg p-4 text-sm text-slate-300">
          {isHost ? contest?.status === "upcoming" && (
              <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Host Controls
                </h3>

                <Button variant="primary"
                onClick = {startContestHandler}
                >
                  Start Contest
                </Button>
              </div>
            ) : contest?.status === "upcoming" ? <>
              Waiting for host to start the contest.  Once started, no new users can join.
            </> : <>
              Contest is live. Joining is disabled.
            </>}
        </section>

        {/* ---------------- MAIN GRID ---------------- */}
        <section className="grid md:grid-cols-3 gap-3">

          {/* PARTICIPANTS */}
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Participants ({participants?.length})
            </h2>

            <div className="space-y-3">
              {participants?.map((p) => {
                const isUserItself = p.user._id === user?._id;
                const isUserHost = p.user._id === contest?.owner?._id;
 
                return (
                  (
                    <div
                      key={p._id}
                      className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3"
                    >
                      <span className="text-white">
                        {p.user.fullName}
                        {isUserHost && (
                          <span className="ml-2 text-xs text-red-400">(Host)</span>
                        )}
                      </span>

                      <div >
                        <span className="text-xs text-slate-400 mr-3">
                          {p.joinedAt ? "Ready" : "Joined"}
                        </span>
                        {!isHost && isUserItself && (
                          <Button variant="danger" onClick={leaveContest}>
                            <i className="ri-logout-box-r-line"></i>
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                )
              }
            )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">

            {/* CHAT */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 flex flex-col h-[550px]">
              <h3 className="text-lg font-semibold text-white mb-2">
                Chat
              </h3>
              <MessagesArea
                messages={messages} currentUserId={user._id}
              />
              {messages
                .filter(m => m.messageType === "system")
                .map(m => (
                  <div
                    key={m._id}
                    className="text-center text-xs text-slate-400 py-1"
                  >
                    {m.message}
                  </div>
                ))}

              {chatEnabled && (
                <MessageInput
                  onSend={(msg) => send(msg)}
                />
              )}
            </div>

          </div>
        </section>

        {/* ---------------- QUESTION PREVIEW ---------------- */}
        <section className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Questions in this contest
          </h2>

          <div className="space-y-3">
            {contestQuestions?.map((q, i) => (
              <div
                key={q._id}
                className="flex items-center justify-between bg-slate-800/60 px-4 py-3 rounded-lg"
              >
                <span className="text-white">
                  {i + 1}. {q.title}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    q.difficulty === "easy"
                      ? "bg-green-500/10 text-green-400"
                      : q.difficulty === "medium"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
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
  );
}

export default GroupContestLobby;
