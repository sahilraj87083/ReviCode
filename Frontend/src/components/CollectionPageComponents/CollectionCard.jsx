// import { useNavigate } from "react-router-dom";

// function CollectionCard({ collection }) {
//   const navigate = useNavigate()
//   return (
//     <div
//       className="
//         bg-slate-900/60 
//         border border-slate-700/50 
//         rounded-xl 
//         p-6 
//         flex flex-col 
//         justify-between 
//         hover:border-red-500 
//         transition
//       "
//     >
//       {/* TOP */}
//       <div>
//         <div className="flex items-start justify-between gap-3">
//           <h3 className="text-lg font-semibold text-white">
//             {collection.name}
//           </h3>
//           <span
//             className={`px-2 py-0.5 rounded text-xs font-medium
//               ${
//                 collection.isPublic
//                   ? "bg-green-600/20 text-green-400"
//                   : "bg-slate-700/40 text-slate-300"
//               }
//             `}
//           >
//             {collection.isPublic ? "Public" : "Private"}
//           </span>
//         </div>

//         {collection.description && (
//           <p className="text-slate-400 text-sm mt-2 line-clamp-2">
//             {collection.description}
//           </p>
//         )}
//       </div>

//       {/* ACTIONS */}
//       <div className="mt-6 flex gap-3">
//         <button
//           onClick={() => {
//             navigate('/user/collection/questions')
//           }}
//           className="
//             text-sm font-medium text-red-400 
//             hover:text-red-300 transition
//           "
//         >
//           Open
//         </button>

//         <button
//         onClick={() => {
//             navigate('/user/contests')
//           }}
//           className="
//             text-sm font-medium text-slate-400 
//             hover:text-white transition
//           "
//         >
//           Create Contest
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CollectionCard

function CollectionCard({ collection, onCreateContest }) {
  return (
    <div
      className="p-5 rounded-xl border border-slate-800
      bg-slate-900/60 hover:border-red-500/40
      transition flex flex-col justify-between"
    >
      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">
          {collection.name}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2">
          {collection.description || "No description"}
        </p>

        <div className="mt-3 flex gap-2 text-xs text-slate-400">
          <span className="px-2 py-0.5 bg-slate-800 rounded">
            {collection.questionsCount} Questions
          </span>
          <span className="px-2 py-0.5 bg-slate-800 rounded">
            {collection.isPublic ? "Public" : "Private"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <a
          // href={`/collections/${collection._id}`}
          href="/user/collection/questions"
          className="flex-1 text-center px-3 py-2 text-white
          border border-slate-700 rounded-md hover:text-slate-200
          text-sm hover:border-white transition"
        >
          View
        </a>

        <button
          onClick={() => onCreateContest(collection)}
          className="flex-1 px-3 py-2 text-white
          bg-red-600 hover:bg-red-500
          rounded-md text-sm font-semibold transition"
        >
          Create Contest
        </button>
      </div>
    </div>
  );
}

export default CollectionCard;
