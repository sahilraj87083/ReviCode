import ContestRow from "./ContestRow";

function ContestList({ contests, loading, hasMore, onLoadMore }) {
  return (
    <div
      className="
        max-h-[70vh] overflow-y-auto
        divide-y divide-slate-700/40
        bg-slate-900/60 border border-slate-700/50 rounded-xl
      "
      onScroll={(e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
          onLoadMore();
        }
      }}
    >
      {contests.map(c => (
        <ContestRow key={c._id} contest={c} />
      ))}

      {loading && (
        <div className="p-4 text-center text-slate-400">Loading…</div>
      )}

      {/* {!hasMore && (
        <div className="p-4 text-center text-slate-500">No more contests</div>
      )} */}

      {!loading && contests.length === 0 && (
        <div className="p-6 text-center text-slate-400">
            No contests found
        </div>
      )}

    </div>
  );
}

export default ContestList;
