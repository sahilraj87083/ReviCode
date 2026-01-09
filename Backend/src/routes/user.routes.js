import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserProfile
} from '../controllers/user.controller.js'
import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { body } from 'express-validator'


const router = Router()

router.route('/register').post(
        [
            body('email').isEmail().withMessage('Invalid Email'),
            body('username').isLength({min : 3}).withMessage('Username must be at least 3 characters long'),
            body('fullName').isLength({min : 3}).withMessage('Name must be at least 3 characters long'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ],
        registerUser
)

router.route('/login').post(
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginUser
)

router.route('/refresh-token').post(refreshAccessToken)
router.route('/c/:username').get(getUserProfile)

// // secure routes

router.route('/logout').post(verifyJWT, logoutUser)
router.route('/change-password').post(verifyJWT, changeCurrentPassword)
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar)
router.route('/update-coverImage').patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)



export {
    router
}

export default router