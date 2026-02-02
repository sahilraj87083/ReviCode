import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getInbox, getPrivateMessages } from "../controllers/privateMessage.controller.js";
import { param } from "express-validator";

const router = Router()


router.route("/inbox").get(
    verifyJWT, 
    getInbox
);


router.route('/inbox/:otherUserId').get(
    verifyJWT,
    [
        param("otherUserId")
            .isMongoId()
            .withMessage("Invalid Mongodb ID")
    ],
    validate,
    getPrivateMessages
)


export default router
