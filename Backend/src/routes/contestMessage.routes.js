import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { param, query } from "express-validator";
import { getContestChatMessages } from "../controllers/contestMessage.controller.js";

const router = Router()

router.route('/:contestId')
.get(
    verifyJWT, 
    [
        param("contestId")
        .isMongoId()
        .withMessage('Invalid contest Id'),
    ],
    validate,
    getContestChatMessages
)

export default router


