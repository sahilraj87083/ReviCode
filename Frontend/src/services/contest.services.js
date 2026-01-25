import { api } from "./api.services";

/* CREATE */
export const createContestService = (data) =>
    api.post("/contests", data).then(res => res.data.data);

/* START (host only) */
export const startContestService = (contestId) =>
    api.post(`/contests/${contestId}/start`).then(res => res.data.data);


/* GET ACTIVE CONTEST */
export const getActiveContestsService = () =>
    api.get("/contests/active").then(res => res.data.data);

/* GET All CONTEST */
export const getAllContestsService = async () => {
    const res = await api.get("/contests/all")
    return res.data.data
}

/* GET CREATED CONTEST */
export const getCreatedContestsService = async () => {
    const res = await api.get("/contests/created")
    return res.data.data
}

/* GET JOINED CONTEST */
export const getJoinedContestsService = async () => {
    const res = await api.get("/contests/joined")
    return res.data.data
}



/* GET CONTEST by ID */
export const getContestByIdService = (contestId) =>
    api.get(`/contests/${contestId}`).then(res => res.data.data);

/* LEADERBOARD */
export const getLeaderboardService = (contestId) =>
    api.get(`/contests/${contestId}/leaderboard`).then(res => res.data.data);


