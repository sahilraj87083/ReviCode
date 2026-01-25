import { useEffect } from "react";
import { useContestList } from "../hooks/useContestList";
import ContestList from "../components/ContestPageComponents/ContestList.jsx";

function ContestListPage({ type }) {
    const { contests, fetchMore, loading, hasMore } = useContestList(type);

    useEffect(() => {
        fetchMore();
    }, [type]);

    return (
        <div className="min-h-screen bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-white capitalize mb-6">
            {type} contests
        </h1>

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
