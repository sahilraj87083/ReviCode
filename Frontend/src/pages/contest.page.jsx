import { useRef, useState } from "react";
import { Input, Button, Select, ContestRow } from "../components";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


function Contests() {
    const containerRef = useRef(null);
    const navigate = useNavigate()

    const heroRef = useRef(null);
    const actionRef = useRef(null);
    const navRef = useRef(null);
    const activeRef = useRef(null);

    const [contestCode, setContestCode] = useState("");
    const [contestCollection, setContestCollection] = useState("");
    const [contestQuestionCount, setContestQuestionCount] = useState(4)
    const [contestDuration , setContestDuration] = useState(90)
    const [contestVisibility, setContestVisiblity] = useState("private")



    const QUESTION_COUNT_OPTIONS = [
        { label: "2 Questions", value: 2 },
        { label: "3 Questions", value: 3 },
        { label: "4 Questions", value: 4 },
        { label: "5 Questions", value: 5 },
    ];

    const DURATION_OPTIONS = [
        { label: "30 Minutes", value: 30 },
        { label: "60 Minutes", value: 60 },
        { label: "90 Minutes", value: 90 },
        { label: "120 Minutes", value: 120 },
    ];

    const VISIBILITY_OPTIONS = [
        { label: "Private", value: "private" },
        { label: "Shared", value: "shared" },
        { label: "Public", value: "public" },
    ];

    const collectionOptions = [
        { label: "DSA Core", value: "1" },
        { label: "Binary Search", value: "2" },
    ];

    useGSAP(
      () => {
        // HERO
        gsap.from(heroRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });

        // ACTION CARDS
        gsap.from(actionRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        });

        // NAV CARDS
        gsap.from(navRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        });

        // ACTIVE CONTESTS
        gsap.from(".contest-row", {
          scrollTrigger: {
            trigger: ".active-contests",
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });

        
      },
      { scope: containerRef }
    );


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10">
      <div ref={containerRef} className="max-w-6xl mx-auto space-y-10">

        {/* HERO */}
        <section ref={heroRef} className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">
            Compete. Practice. Improve.
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Create contests from your collections or join existing contests
            and challenge yourself.
          </p>
        </section>

        {/* ACTIONS */}
        <section  ref = {actionRef} className="grid md:grid-cols-2 gap-8">

            {/* JOIN CONTEST */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">
                Join a Contest
                </h2>

                <Input
                label="Contest Code"
                placeholder="Enter contest code"
                value={contestCode}
                onChange={(e) => setContestCode(e.target.value)}
                />

                <Button
                variant="primary"
                className="w-full"
                onClick={() => console.log("Join contest", contestCode)}
                >
                Join Contest
                </Button>

                <p className="text-xs text-slate-400">
                You can also join using a shared contest link.
                </p>
            </div>

            {/* CREATE CONTEST */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">
                Create a Contest
            </h2>

            <Select
                label="Collection"
                placeholder="Select collection"
                value = {contestCollection}
                onChange = {(e) => (setContestCollection(e.target.value))}
                options={collectionOptions}
            />

            <div className="grid grid-cols-2 gap-4">
                <Select
                value = {contestQuestionCount}
                onChange = {(e) => (setContestQuestionCount(e.target.value))}
                label="Questions"
                placeholder="Select count"
                options={QUESTION_COUNT_OPTIONS}
                />

                <Select
                value = {contestDuration}
                onChange = {(e) => (setContestDuration(e.target.value))}
                label="Duration"
                placeholder="Select duration"
                options={DURATION_OPTIONS}
                />
            </div>

            <Select
                value = {contestVisibility}
                onChange = {(e) => (setContestVisiblity(e.target.value))}
                label="Visibility"
                placeholder="Select visibility"
                options={VISIBILITY_OPTIONS}
            />

            <Button variant="primary" className="w-full">
                Create Contest
            </Button>
            </div>


        </section>
        
        {/* MY CONTESTS NAV */}
        <section ref={navRef} className="flex flex-col gap-2">
          <div className="flex text-center justify-center ">
              <div
                  onClick={(e) => navigate("/created-contests")}
                  className="cursor-pointer w-full bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 hover:border-red-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 "
              >
                  <h3 className="text-lg font-semibold text-white">
                  All Contests
                  </h3>
                  <p className="text-slate-400 text-sm mt-2">
                  Contests you have participated
                  </p>
              </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
                <div
                  onClick={(e) => navigate("/created-contests")}
                  className="cursor-pointer bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 hover:border-red-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                  <h3 className="text-lg font-semibold text-white">
                  Created Contests
                  </h3>
                  <p className="text-slate-400 text-sm mt-2">
                  Contests you have created
                  </p>
                </div>

                <div
                    onClick={() => navigate("/joined-contests")}
                    className="cursor-pointer bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 hover:border-red-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                    <h3 className="text-lg font-semibold text-white">
                    Joined Contests
                    </h3>
                    <p className="text-slate-400 text-sm mt-2">
                    Contests you have participated in
                    </p>
                </div>
          </div>
          
        

        </section>

        {/* ACTIVE CONTESTS */}
        <section ref={activeRef} className="space-y-4 active-contests">
          <h2 className="text-xl font-semibold text-white">
            Your Active Contests
          </h2>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl divide-y divide-slate-700/40">
            <ContestRow
              title="DSA Sprint #14"
              status="Live"
              action="Resume"
            />
            <ContestRow
              title="Graphs Weekly"
              status="Upcoming"
              action="View"
            />
          </div>
        </section>

      </div>
    </div>
  );
}



export default Contests;
