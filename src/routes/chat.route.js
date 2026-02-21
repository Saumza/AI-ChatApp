import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { chat } from "../controller/chat.controller.js";

const router = Router()

router.use(verifyJwt)

router.route("/").get(upload.none(), chat)
router.route("/c/:conversationId").get(upload.none(), chat)

export { router as chatRouter }
