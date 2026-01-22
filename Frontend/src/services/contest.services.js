import { api } from "./api.services";

/* CREATE */
export const createContestService = (data) =>
  api.post("/contests", data).then(res => res.data.data);

/* GET CONTEST */
export const getContestService = (contestId) =>
  api.get(`/contests/${contestId}/start`).then(res => res.data.data);

/* JOIN */
export const joinContestService = (contestId) =>
  api.post(`/contests/${contestId}/join`).then(res => res.data.data);

/* START (host only) */
export const startContestService = (contestId) =>
  api.patch(`/contests/${contestId}/start`).then(res => res.data.data);

/* SUBMIT */
export const submitContestService = (contestId, attempts) =>
  api.post(`/contests/${contestId}/submit`, { attempts });

/* LEADERBOARD */
export const getLeaderboardService = (contestId) =>
  api.get(`/contests/${contestId}/leaderboard`).then(res => res.data.data);

/* MY RANK */
export const getMyRankService = (contestId) =>
  api.get(`/contests/${contestId}/me`).then(res => res.data.data);
