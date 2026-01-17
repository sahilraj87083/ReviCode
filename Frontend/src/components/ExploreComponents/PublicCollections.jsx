import { NavLink } from "react-router-dom";



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

export default PublicCollections