import { asyncHandler } from '../utils/AsyncHandler.utils.js'
import { paginate } from '../utils/pagination.utils.js'
import { getConversationMessagesService, clearConversationService} from '../services/privateMessage.service.js'
import { getPrivateRoom } from '../utils/getPrivateRoom.js'
import { ApiResponse } from '../utils/ApiResponse.utils.js'
import { PrivateMessage } from '../models/privateMessage.model.js'


const getPrivateMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const {p , l} = req.query

    const {skip , page , limit} = paginate({p , l});

    const room = getPrivateRoom(req.user._id, userId);

    const exists = await PrivateMessage.exists({
        conversationId: room,
        $or: [
            { senderId: req.user._id },
            { receiverId: req.user._id }
        ]
     });

    if (!exists) throw new ApiError(403, "Not authorized");

    const message = await getConversationMessagesService({
        userId : req.user._id,
        room,
        limit,
        skip
    });

    return res.status(200).json(
        new ApiResponse(200, "message fetched successfully", { messages : message.reverse()})
    )

})

const clearPrivateConversation = asyncHandler (async (req, res) => {
    const { userId } = req.params

    const room = getPrivateRoom(req.user._id, userId)

    await clearConversationService(room, req.user._id);

    return res.status(200).json( new ApiResponse(200, "Chat cleared successfully", {}))
})

export {
    getPrivateMessages,
    clearPrivateConversation
}