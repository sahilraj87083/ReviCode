import { Question } from "../models/question.model";
import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import mongoose, { isValidObjectId } from 'mongoose'
import {validationResult} from 'express-validator'
import {normalizeUrlservice, uploadQuestionService} from '../services/question.services.js'


const uploadQuestion = asyncHandler(async (req, res) => {

    const { title, platform, problemUrl, difficulty, topics } = req.body;

    if (!title?.trim() || !platform || !problemUrl?.trim() || !difficulty) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const question = await uploadQuestionService({
        ownerId : req.user._id,
        title : title,
        platform : platform,
        problemUrl : problemUrl,
        difficulty : difficulty,
        topics : topics

    })

    return res
    .status(201)
    .json(new ApiResponse(201, "Question added successfully", question));

})

const getAllQuestions = asyncHandler(async (req, res) => {

})

const getQuestionById = asyncHandler(async (req, res) => {
    const {questionId} = req.params

    if(!isValidObjectId(questionId)){
        throw new ApiError(400, "Invalid question ID");
    }

    const question = await Question.findOne({
        _id : questionId,
        ownerId : req.user._id,
        isDeleted : false
    })

    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    return res.status(200).json(new ApiResponse(200, "Question fetched", question))
})

const updateQuestion = asyncHandler(async (req, res) => {

})

const deleteQuestion = asyncHandler(async (req, res) => {

})


export {
    uploadQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}