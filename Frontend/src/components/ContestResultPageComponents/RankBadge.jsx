function RankBadge({ rank }) {
  const color =
    rank === 1
      ? "bg-yellow-500"
      : rank === 2
      ? "bg-gray-400"
      : rank === 3
      ? "bg-orange-600"
      : "bg-slate-600";

  return (
    <span className={`px-3 py-1 rounded text-sm font-semibold ${color}`}>
      Rank #{rank}
    </span>
  );
}

export default RankBadge;
