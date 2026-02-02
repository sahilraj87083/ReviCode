import { PrivateMessage } from '../models/privateMessage.model.js'
import { getPrivateRoom } from '../utils/getPrivateRoom.js'


export const createPrivateMessageService = async ({senderId , to, message}) => {
    const room = getPrivateRoom(senderId, to);

    const msg = await PrivateMessage.create({
        conversationId : room,
        senderId : senderId,
        receiverId : to,
        message : message
    })

    const populated = await msg.populate({
        path: "senderId",
        select: "fullName avatar username",
    });

    return populated;

}

export const getConversationMessagesService = async ({userId, room, skip, limit}) => {
    return PrivateMessage.find(
        {
            conversationId : room,
            deletedFor : { $ne : userId}

        },
        
    ).populate("senderId", "fullName avatar")
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