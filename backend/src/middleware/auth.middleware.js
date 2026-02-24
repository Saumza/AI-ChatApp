import { APIError } from "../utils/APIError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


const verifyJwt = asyncHandler(async (req, _, next) => {
    const accessToken = req.cookies?.accessToken

    if (!accessToken) {
        throw new APIError(401, "Unauthorized Request")
    }

    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        throw new APIError(400, "User Not Found,Invalid Token")
    }

    req.user = user
    next()
})

export { verifyJwt }