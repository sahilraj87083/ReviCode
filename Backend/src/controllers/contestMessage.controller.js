import { asyncHandler } from "../utils/AsyncHandler.utils.js"
import { getContestMessagesService , createContestMessageService, createSystemMessageService} from '../services/contestMessage.service.js'
import { paginate } from "../utils/pagination.utils.js"


const getContestChatMessages = asyncHandler( async (req, res) => {

    const { contestId } = req.params;
    const {p , l} = req.query
    const {skip , page , limit} = paginate({p , l});
    const room = getPrivateRoom(req.user._id, userId);

    const messages = await getContestMessagesService({
        contestId,
        skip,
        limit,
    });

    return res.status(200).json(
        new ApiResponse(200, "message fetched successfully", { messages : messages.reverse()})
    )

})


export {
    getContestChatMessages
}