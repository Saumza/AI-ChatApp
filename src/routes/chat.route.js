import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { chat } from "../controller/chat.controller.js";
import { chatSendValidation } from "../validations/chat.validation.js";
import { chatValidate } from "../middleware/chatValidation.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/").get(upload.none(), chatSendValidation(), chatValidate, chat)
router.route("/c/:conversationId").get(upload.none(), chatSendValidation(), chatValidate, chat)

export { router as chatRouter }
