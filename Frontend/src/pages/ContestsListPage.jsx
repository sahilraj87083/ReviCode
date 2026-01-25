import { useEffect } from "react";
import { useContestList } from "../hooks/useContestList";
import ContestList from "../components/ContestPageComponents/ContestList.jsx";

function ContestListPage({ type }) {
    const { contests, fetchMore, loading, hasMore , totalContest} = useContestList(type);

    useEffect(() => {
        fetchMore();
    }, [type]);

    return (
        <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white capitalize mb-6">
                {type} contests
            </h1>
            <h1 className="text-xl font-bold text-white capitalize mb-6">
                Total Contests : {totalContest}
            </h1>
        </div>

        <ContestList
            contests={contests}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={fetchMore}
        />
        </div>
    );
}

export default ContestListPage;
