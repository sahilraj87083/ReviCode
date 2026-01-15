import {Follow} from '../models/follow.model.js'
import { ApiError } from '../utils/ApiError.utils.js'


const followUserService = async (
    {
        followerId,
        followingId
    }
) => {
    try {
        await Follow.create({
            followerId : followerId,
            followingId : followingId
        })
    } catch (error) {
        if(error.code === 11000){
           throw new ApiError(200, "Already following");
        }

        throw new ApiError(500, "Server error while following the user");
    }
}


export {
    followUserService
}