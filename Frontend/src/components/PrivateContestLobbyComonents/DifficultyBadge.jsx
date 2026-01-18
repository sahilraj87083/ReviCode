function DifficultyBadge({ level }) {
  const map = {
    easy: "text-green-400 bg-green-500/10",
    medium: "text-yellow-400 bg-yellow-500/10",
    hard: "text-red-400 bg-red-500/10",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[level]}`}>
      {level}
    </span>
  );
}


export default DifficultyBadge