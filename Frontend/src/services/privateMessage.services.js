import { api } from "./api.services";

export const getInboxService = async () => {
    const res = await api.get('/users/chat/inbox')
    return res.data.data
}

export const getPrivateMessagesService = async (otherUserId) => {
    const res = await api.get(`/users/chat/inbox/${otherUserId}`)
    return res.data.data.messages
}