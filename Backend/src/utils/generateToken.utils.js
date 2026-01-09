import { User } from '../models/user.model.js'
import { ApiError } from './ApiError.utils.js'
import { hashToken } from './hashToken.utils.js';

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = hashToken(refreshToken);
        await user.save({
            validateBeforeSave : false
        })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token", {message : error?.message})
    }
}

export {
    generateAccessAndRefereshTokens
}