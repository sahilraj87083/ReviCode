import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import { isValidObjectId } from 'mongoose'
import {CollectionQuestion} from '../models/collectionQuestion.model.js'


const addQuestionToCollection = asyncHandler( async (req, res) => {
    
})

const removeQuestionFromCollection = asyncHandler( async (req, res) => {
    
})

const bulkAddQuestions = asyncHandler( async (req, res) => {
    
})

const bulkRemoveQuestions = asyncHandler( async (req, res) => {
    
})

const reorderCollectionQuestions = asyncHandler( async (req, res) => {
    
})

const removeAllQuestions = asyncHandler( async (req, res) => {
    
})



export {
    addQuestionToCollection,
    removeQuestionFromCollection,
    bulkAddQuestions,
    bulkRemoveQuestions,
    reorderCollectionQuestions,
    removeAllQuestions,
}