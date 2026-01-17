function Step({ number, text }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-red-600/10 text-red-500 text-2xl font-bold flex items-center justify-center mb-4">
        {number}
      </div>
      <p className="text-slate-300">{text}</p>
    </div>
  );
}

export default Step