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


/* GET CONTEST by ID */
export const getContestByIdService = (contestId) =>
    api.get(`/contests/${contestId}`).then(res => res.data.data);

/* LEADERBOARD */
export const getLeaderboardService = (contestId) =>
    api.get(`/contests/${contestId}/leaderboard`).then(res => res.data.data);


