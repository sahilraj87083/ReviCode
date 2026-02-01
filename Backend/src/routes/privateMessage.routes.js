import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getInbox } from "../controllers/privateMessage.controller.js";

const router = Router()

router.get("/inbox", verifyJWT, getInbox);


export default router
