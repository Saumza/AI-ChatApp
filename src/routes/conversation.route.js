import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getAllConversations, updateConversation, deleteConversation, getAllChats } from "../controller/conversation.controller.js"

const router = Router()

router.use(verifyJwt)

router.route("/list").get(getAllConversations)
router.route("/update_conversation/:conversationId").patch(updateConversation)
router.route("/delete_conversation/:conversationId").delete(deleteConversation)
router.route("/:conversationId").get(getAllChats)


export { router as conversationRouter }