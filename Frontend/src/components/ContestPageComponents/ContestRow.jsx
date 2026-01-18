import {Button} from "../";


function ContestRow({ title, status, action }) {
  return (
    <div className="contest-row flex items-center justify-between px-6 py-4">
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-slate-400 text-sm">{status}</p>
      </div>
      <Button size="sm" variant="secondary">
        {action}
      </Button>
    </div>
  );
}

export default ContestRow