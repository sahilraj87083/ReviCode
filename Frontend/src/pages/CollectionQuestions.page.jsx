import { useState, useEffect } from "react";
import {AddQuestionPanel, QuestionRow , EmptyQuestionsState} from '../components'
import { addQuestionToCollection, getCollectionAllQuestions, getCollectionById } from "../services/collection.service";
import { useParams } from "react-router-dom";
import { uploadQuestionService } from "../services/question.services";


function CollectionQuestions() {
    const [openAddQuestionPanel, setOpenAddQuestionPanel] = useState(false);
    const {collectionId} = useParams()
    // console.log(collectionId)

    const [questions, setquestions] = useState([])
    const [collection, setcollection] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
      try {
        const response = await getCollectionAllQuestions(collectionId)

        setquestions(response.questions)
        setcollection(response.collection)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }
    useEffect( () => {
      fetchData()
    }, [collectionId])

    const handleAddQuestion = async (formData) => {
    console.log(formData);
      try {
        const uploadedQuestion = await uploadQuestionService(formData)
        await addQuestionToCollection(collectionId, uploadedQuestion._id)
        // console.log("Added")
        await fetchData()
      } catch (error) {
        console.error("Add question failed:", error);
      }

      setOpenAddQuestionPanel(false);
    };


  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* COLLECTION HEADER */}
        <div className="mb-12 flex flex-col gap-6">

        {/* Top row: title + action */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">
                {collection.name}
            </h1>

            {collection.description && (
                <p className="mt-2 text-slate-400 max-w-2xl">
                {collection.description}
                </p>
            )}
            </div>

            {/* Action */}
            <button
            onClick={() => setOpenAddQuestionPanel(true)}
            className="self-start px-5 py-2.5
            bg-red-600 hover:bg-red-500
            rounded-md text-sm font-semibold
            transition"
            >
            + Add Question
            </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-800">
            {collection.questionsCount} Questions
            </span>

            <span
            className={`px-3 py-1 rounded-full ${
                collection.isPublic
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
            >
            {collection.isPublic ? "Public" : "Private"}
            </span>
        </div>
        </div>


        {/* QUESTIONS LIST */}
        {!isLoading && questions.length === 0 ? (
            <EmptyQuestionsState
              onAdd={() => setOpenAddQuestionPanel(true)}
            />
          ) : (
            <div className="space-y-4">
              {questions.map((q, index) => (
                <QuestionRow key={q.question._id} q={q.question} index={index} />
              ))}
            </div>
          )}



        {openAddQuestionPanel && <AddQuestionPanel
            open={openAddQuestionPanel}
            onClose={() => setOpenAddQuestionPanel(false)}
            onSubmit={handleAddQuestion}
        />}


      </div>
    </main>
  );
}

export default CollectionQuestions;
