import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(cookieparser())

app.use(express.static("public"))

app.use(express.urlencoded({
    limit: "16kb"
}))

app.use(express.json({
    limit: "100kb"
}))




//routes
import { userRouter } from "./routes/user.route.js"
import { conversationRouter } from "./routes/conversation.route.js"
import { chatRouter } from "./routes/chat.route.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/chats", chatRouter)



export { app }