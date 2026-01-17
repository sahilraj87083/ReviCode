import { NavLink } from "react-router-dom";



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

export default LiveContests