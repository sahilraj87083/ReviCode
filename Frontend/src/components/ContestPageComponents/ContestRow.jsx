import {Button} from "../";


function ContestRow({ contest, onNavigate }) {

    const label =
      contest.status === "upcoming"
        ? "Upcoming"
        : contest.status === "live"
        ? "Live"
        : "Ended";

    const action =
      contest.status === "upcoming"
        ? "View"
        : contest.status === "live"
        ? "Resume"
        : "Results";

    return (
      <div className="contest-row flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-white font-medium">{contest.title} </p>
          <div className="flex gap-6 text-slate-400 text-sm pt-0.5">
            <p>{label}</p>
            <p>{contest.visibility}</p>
          </div>
        </div>

        <Button size="sm" variant="secondary" onClick={() => onNavigate(contest)}>
          {action}
        </Button>
      </div>
    );
}


export default ContestRow