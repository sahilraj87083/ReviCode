import { ActivityRow } from "../";
import { useState , useEffect } from "react";
import { getUserRecentActivity } from "../../../services/profile.services";


function ActivityTab({ userId }) {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const data = await getUserRecentActivity(userId);
      setActivity(data);
      setLoading(false);
    })();
  }, [userId]);

  if (loading) return <p className="text-slate-400">Loading...</p>;

  if (!activity.length)
    return <p className="text-slate-400">No recent contests</p>;

  return (
    <div className="space-y-3">
      {activity.map((a) => (
        <ActivityRow
          key={a.contestId}
          title={a.contest.title}
          score={a.score}
          rank={`${a.solvedCount}/${a.solvedCount + a.unsolvedCount}`}
        />
      ))}
    </div>
  );
}

export {
    ActivityTab
}