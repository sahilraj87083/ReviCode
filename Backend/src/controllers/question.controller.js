import { Question } from "../models/question.model";
import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import mongoose from 'mongoose'
import {validationResult} from 'express-validator'
import {normalizeUrl} from '../services/question.services.js'


const createQuestion = asyncHandler(async (req, res) => {

})

const getAllQuestions = asyncHandler(async (req, res) => {

})

const getQuestionById = asyncHandler(async (req, res) => {

})

const updateQuestion = asyncHandler(async (req, res) => {

})

const deleteQuestion = asyncHandler(async (req, res) => {

})


export {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}