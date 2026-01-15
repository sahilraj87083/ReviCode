import { Router } from "express";
import { param, query } from "express-validator";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowStatus
} from "../controllers/follow.controller.js";

const router = Router();

// fixed paths first

// get followers
router.route("/followers/:userId")
.get(
    verifyJWT,
    [
        param("userId")
            .isMongoId()
            .withMessage("Invalid user ID"),

        query("page")
            .optional()
            .isInt({ min: 1 }),

        query("limit")
            .optional()
            .isInt({ min: 1, max: 50 }),
    ],
    validate,
    getFollowers
);

// get following 
router.route("/following/:userId")
.get(
    verifyJWT,
    [
        param("userId")
            .isMongoId()
            .withMessage("Invalid user ID"),

        query("page")
            .optional()
            .isInt({ min: 1 }),

        query("limit")
            .optional()
            .isInt({ min: 1, max: 50 }),
    ],
    validate,
    getFollowing
);

// follow stats
router.route("/status/:targetUserId")
.get(
    verifyJWT,
    [
        param("targetUserId")
            .isMongoId()
            .withMessage("Invalid user ID"),
    ],
    validate,
    getFollowStatus
);


// generic follow/unfollow last
// follow user
router.route("/:targetUserId")
.post(
    verifyJWT,
    [
        param("targetUserId")
            .isMongoId()
            .withMessage("Invalid user ID"),
    ],
    validate,
    followUser
);

// unfollow user
router.route("/:targetUserId")
.delete(
    verifyJWT,
    [
        param("targetUserId")
            .isMongoId()
            .withMessage("Invalid user ID"),
    ],
    validate,
    unfollowUser
);


export default router;
