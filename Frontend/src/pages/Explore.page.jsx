import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Explore() {
  const containerRef = useRef(null);
  const [tab, setTab] = useState("contests");

  useGSAP(
    () => {
      gsap.from(".explore-hero", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".explore-section", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pb-20"
    >
      {/* HERO */}
      <section className="explore-hero max-w-7xl mx-auto pt-20 pb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Discover. Compete. Improve.
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Explore live contests, public collections and top problem solvers from
          the ReviClash community.
        </p>
      </section>

      {/* TABS */}
      <div className="max-w-7xl mx-auto flex justify-center gap-6 mb-12">
        {["contests", "collections", "creators"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                tab === t
                  ? "bg-red-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }
            `}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto space-y-16">
        {tab === "contests" && <LiveContests />}
        {tab === "collections" && <PublicCollections />}
        {tab === "creators" && <TopCreators />}
      </div>
    </div>
  );
}

export default Explore;

function LiveContests() {
  return (
    <section className="explore-section">
      <h2 className="text-2xl font-semibold text-white mb-6">
        🔴 Live Contests
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              bg-slate-900/60 
              border border-slate-700/50 
              rounded-xl p-6 
              hover:border-red-500 
              hover:scale-[1.02]
              transition
            "
          >
            <h3 className="text-white font-semibold">
              DSA Sprint #{i}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              5 Questions • 45 mins
            </p>

            <NavLink
              to={`/contests/demo-${i}`}
              className="
                inline-block mt-4 
                text-sm font-medium text-red-400 
                hover:text-red-300
              "
            >
              Join Contest →
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}

function PublicCollections() {
  return (
    <section className="explore-section">
      <h2 className="text-2xl font-semibold text-white mb-6">
        📚 Popular Collections
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              bg-slate-900/60 
              border border-slate-700/50 
              rounded-xl p-6 
              hover:border-slate-400 
              transition
            "
          >
            <h3 className="text-white font-semibold">
              Blind 75 – Part {i}
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Handpicked interview questions
            </p>

            <NavLink
              to={`/collections/demo-${i}`}
              className="
                inline-block mt-4 
                text-sm font-medium text-red-400 
                hover:text-red-300
              "
            >
              View Collection →
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}
function TopCreators() {
  return (
    <section className="explore-section">
      <h2 className="text-2xl font-semibold text-white mb-6">
        🏆 Top Creators
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="
              bg-slate-900/60 
              border border-slate-700/50 
              rounded-xl p-6 
              text-center 
              hover:border-red-500 
              transition
            "
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-700 mb-3" />
            <h4 className="text-white font-semibold">
              user_{i}
            </h4>
            <p className="text-slate-400 text-xs mt-1">
              1200+ problems solved
            </p>

            <button
              className="
                mt-3 px-4 py-1.5 text-sm 
                bg-red-600 hover:bg-red-500 
                text-white rounded-md
              "
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
