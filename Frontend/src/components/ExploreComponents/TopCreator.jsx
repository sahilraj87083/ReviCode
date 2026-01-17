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

export default TopCreators