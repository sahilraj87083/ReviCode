import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import mongoose, { isValidObjectId } from 'mongoose'
import { Contest } from "../models/contest.model.js";
import {Collection} from "../models/collection.model.js"
import { ContestParticipant } from '../models/contestParticipant.model.js'
import { QuestionAttempt } from '../models/questionAttempt.model.js'
import { createContestService } from '../services/contest.services.js'
import { CollectionQuestion } from '../models/collectionQuestion.model.js'
import crypto from 'crypto'



const createContest = asyncHandler(async (req, res) => {
    const { collectionId, title, durationInMin, visibility, questionCount } = req.body;

    if(!isValidObjectId(collectionId)){
        throw new ApiError(400, "Invalid collection ID");
    }

    if (!questionCount || questionCount <= 0) {
        throw new ApiError(400, "questionCount must be greater than 0");
    }

    const collection = await Collection.findOne(
        {
            _id : collectionId,
            ownerId : req.user._id
        }
    )

    if (!collection) throw new ApiError(404, "Collection not found");

    let questionIds;
    try {
        questionIds = await collection.getRandomQuestionIds(questionCount);
    } catch (err) {
        throw new ApiError(400, "Not enough questions in collection");
    }


    const contest = await createContestService(
        {
            title,
            owner : req.user._id,
            questionIds,
            durationInMin,
            visibility
        }
    )

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Contest created", contest)
        )

})


const joinContest = asyncHandler(async (req, res) => {

})


const submitContest = asyncHandler(async (req, res) => {

})



const getLeaderboard = asyncHandler(async (req, res) => {

})


const getContest = asyncHandler(async (req, res) => {

})


export {
    createContest,
    joinContest,
    submitContest,
    getLeaderboard,
    getContest
}