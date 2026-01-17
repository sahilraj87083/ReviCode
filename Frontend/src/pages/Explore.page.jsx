import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {LiveContests, PublicCollections, TopCreators} from '../components'

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

