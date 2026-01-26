import { api } from "./api.services";

export const getUserProfileService = async (username) => {
    const res = await api.get(`/users/c/${username}`);
    return res.data.data;
};

export const getUserRecentActivity = async (userId) => {
  const res = await api.get(`/stats/${userId}/history?limit=3`);
  return res.data.data.history;
};
