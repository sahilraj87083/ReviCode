import { PrivateMessage } from '../models/privateMessage.model.js'
import { getPrivateRoom } from '../utils/getPrivateRoom.js'


export const createPrivateMessageService = async ({from , to, message}) => {
    const room = getPrivateRoom(from, to);

    const msg = await PrivateMessage.create({
        conversationId : room,
        senderId : from,
        receiverId : to,
        message : message
    })

    return msg;

}

export const getConversationMessagesService = async ({userId, room, skip, limit}) => {
    return PrivateMessage.find(
        {
            conversationId : room,
            deletedFor : { $ne : userId}

        },
        
    )
            .sort({createdAt : -1})
            .skip(skip)
            .limit(limit)
            .lean()
}

export const clearConversationService = async ( room , userId) => {
    await PrivateMessage.updateMany(
        { conversationId: room },
        { $addToSet : { deletedFor : userId}}
    );
}