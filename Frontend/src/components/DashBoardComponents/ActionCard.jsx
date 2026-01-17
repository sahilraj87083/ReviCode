import {Button} from '../'

function ActionCard({ title, desc, action }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-slate-400 text-sm mt-2">{desc}</p>
      </div>
      <Button variant="ghost" className="mt-6 self-start">
        {action}
      </Button>
    </div>
  );
}

export default ActionCard