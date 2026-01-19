function EmptyQuestionsState({ onAdd }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-12 text-center">
      <h3 className="text-xl font-semibold text-white">
        No questions yet
      </h3>
      <p className="text-slate-400 mt-2">
        Add your first question to start practicing.
      </p>
      <button
        onClick={onAdd}
        className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-500 rounded-md text-sm font-semibold transition"
      >
        Add Question
      </button>
    </div>
  );
}

export default EmptyQuestionsState
