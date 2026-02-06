import { FileBarChart2 } from "lucide-react";
import QuestionRow from "./QuestionRow";

function QuestionBreakdown({ attempts, questions }) {
    if (!attempts || attempts.length === 0) return null;

    return (
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileBarChart2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                    Question Breakdown
                </h3>
            </div>

            <div className="flex flex-col gap-3">
                {attempts.map((attempt, i) => {
                    // Find the matching question detail using ID
                    const questionDetail = questions?.find(
                        (q) => q._id === attempt.questionId
                    );

                    return (
                        <QuestionRow 
                            key={attempt.questionId} 
                            index={i} 
                            attempt={attempt} 
                            question={questionDetail} 
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionBreakdown;