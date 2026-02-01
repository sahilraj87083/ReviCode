import { api } from "./api.services";

export const getInboxService = async () => {
    const res = await api.get('/users/chat/inbox')
    return res.data.data
}