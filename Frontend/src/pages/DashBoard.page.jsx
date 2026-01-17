import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button , StatCard, ActionCard, RecentRow } from "../components";

function Dashboard() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10">
      <div ref={containerRef} className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, Sahil 👋
            </h1>
            <p className="text-slate-400 mt-1">
              Let’s continue improving your competitive skills.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">
              Practice
            </Button>
            <Button variant="primary">
              Start Contest
            </Button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Contests Played" value="12" />
          <StatCard title="Problems Solved" value="340" />
          <StatCard title="Accuracy" value="72%" />
          <StatCard title="Avg Time / Q" value="3m 20s" />
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ActionCard
              title="Create Collection"
              desc="Organize problems from different platforms."
              action="Create"
            />
            <ActionCard
              title="Host a Contest"
              desc="Generate a contest from your collection."
              action="Host"
            />
            <ActionCard
              title="Join Contest"
              desc="Enter a contest using code or link."
              action="Join"
            />
          </div>
        </section>

        {/* RECENT CONTESTS */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Contests
          </h2>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <RecentRow title="DSA Sprint #12" score="420" rank="5 / 48" />
            <RecentRow title="Binary Search Battle" score="380" rank="9 / 61" />
            <RecentRow title="Graphs Weekly" score="460" rank="2 / 34" />
          </div>
        </section>

      </div>
    </div>
  );
}


export default Dashboard;
