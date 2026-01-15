import mongoose , {isValidObjectId} from "mongoose";
import { Follow } from "../models/follow.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import {asyncHandler} from "../utils/AsyncHandler.utils.js";
import { followUserService } from "../services/follow.services.js";

const followUser = asyncHandler(async (req, res) => {
    const {targetUserId} = req.params
    const currUser = req.user._id;

    if(!isValidObjectId(targetUserId)){
        throw new ApiError(400, "Invalid user ID");
    }

    if (targetUserId.toString() === currUser.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    await followUserService({
        followerId : currUser,
        followingId : targetUserId
    })

    return res
        .status(201)
        .json(new ApiResponse(201, "User followed"));
})

const unfollowUser = asyncHandler(async (req, res) => {

})

const getFollowers = asyncHandler(async (req, res) => {

})


const getFollowing = asyncHandler(async (req, res) => {

})


const getFollowStatus = asyncHandler(async (req, res) => {

})

export {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getFollowStatus
}