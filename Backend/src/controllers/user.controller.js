import {ApiError} from '../utils/ApiError.utils.js'
import {ApiResponse} from '../utils/ApiResponse.utils.js'
import {asyncHandler} from '../utils/AsyncHandler.utils.js'
import {uploadOnCloudinary, deleteFromCloudinary} from '../utils/cloudinary.utils.js'
import { generateAccessAndRefereshTokens } from '../utils/generateToken.utils.js'
import {hashToken} from '../utils/hashToken.utils.js'
import {User} from '../models/user.model.js'



const registerUser = asyncHandler(async(req, res) => {

})

const loginUser = asyncHandler(async(req, res) => {

})

const logoutUser = asyncHandler(async(req, res) => {

})


const refreshAccessToken = asyncHandler( async (req, res) => {
    
})

const changeCurrentPassword = asyncHandler(async(req, res) => {

})

const getCurrentUser = asyncHandler(async(req, res) => {

})

const updateAccountDetails = asyncHandler(async(req, res) => {

})

const updateUserAvatar = asyncHandler(async(req, res) => {

})

const updateUserCoverImage = asyncHandler(async(req, res) => {

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
}


