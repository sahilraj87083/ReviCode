import { api } from "./api.services";

export const getMessageService = async ( contestId ) => {
    const res = await api.get(`/contest/chat/${contestId}`);
    return res.data.data.messages;
;
}