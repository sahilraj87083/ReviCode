import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import mongoose, { isValidObjectId } from 'mongoose'
import { Contest } from "../models/contest.model.js";
import {ContestParticipant} from '../models/contestParticipant.model.js'
import { QuestionAttempt } from '../models/questionAttempt.model.js'
import { createContestService } from '../services/contest.services.js'



const createContest = asyncHandler(async (req, res) => {

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