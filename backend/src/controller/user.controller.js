import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { verificationMailgenContent, forgotPasswordMailgenContent, sendEmail } from "../utils/mail.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateRefreshAndAccessToken = async (userId) => {
    const user = await User.findById(userId)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: true })

    return { accessToken, refreshToken }
}

const userRegistration = asyncHandler(async (req, res) => {

    const { name, username, email, password } = req.body
    console.log(name, username, email, password);


    const existingUser = await User.findOne({
        email
    })

    if (existingUser) {
        throw new APIError(409, "User already Exists")
    }

    const avatarfilePath = req.file?.path

    if (!avatarfilePath) {
        throw new APIError(404, "Avatar Filepath Not Found")
    }
    const avatarUpload = await uploadOnCloudinary(avatarfilePath)

    if (!avatarUpload.url) {
        throw new APIError(400, "Avatar is Required")
    }

    const user = await User.create({
        name,
        username,
        email,
        password,
        avatar: avatarUpload.url,
        avatarPublicId: avatarUpload.public_id,
    })

    if (!user) {
        throw new APIError(409, "User Couldn't be Registered")
    }

    const { hashedToken, expiresIn } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = expiresIn
    await user.save({ validateBeforeSave: false })


    const verificationMailContent = verificationMailgenContent(username, `${req.protocol}://${req.host}/api/v1/user/verify_email/:${hashedToken}`)

    await sendEmail(
        email,
        "Account Confirmation Email",
        verificationMailContent
    )

    const userCreated = await User.findById(user._id).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    return res.status(200).json(
        new APIResponse(200, { userCreated }, "User Created Successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (!user) {
        throw new APIError(404, "User Doesn't Exists")
    }

    const passwordMatch = await user.isPasswordCorrect(password)

    if (!passwordMatch) {
        throw new APIError(401, "Password Invalid")
    }

    const loggedInUser = await User.findById(user._id).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(200, loggedInUser, "User LoggedIn Successfully")
        )
})


const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user

    await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }

    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new APIResponse(200, "User LoggedOut Successfully")
        )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params

    if (!verificationToken) {
        throw new APIError(401, "Unauthorized Request")
    }

    console.log(verificationToken);


    const user = await User.findOne({
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: { $gt: Date.now() }
    }).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    if (!user) {
        throw new APIError(400, "Verification Token Expired")
    }

    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new APIResponse(
                200, { user, isEmailVerified: true }, "User Verified Successfully"
            )
        )

})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { username, name } = req.body
    const userId = req.user?._id
    const avatarLocalPath = req.file?.path

    const updateFields = {}

    if (username !== undefined) updateFields.username = username
    if (name !== undefined) updateFields.name = name

    if (avatarLocalPath) {
        const avatarUpload = await uploadOnCloudinary(avatarLocalPath)

        if (!avatarUpload) {
            throw new APIError(409, "File Not Uploaded")
        }
        const oldAvatarId = req.user?.avatarPublicId
        await deleteFromCloudinary(oldAvatarId)

        updateFields.avatar = avatarUpload.url
        updateFields.avatarPublicId = avatarUpload.public_id
    }

    if (Object.keys(updateFields).length === 0) {
        throw new APIError(400, "Details are not Provided")
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: updateFields
        },
        {
            new: true
        }
    ).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    return res
        .status(200)
        .json(
            new APIResponse(200, user, "UserDetails Updated Successfully")
        )
})

const changeUserAccountPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new APIError(404, "User Doesn't Exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new APIError(401, "Password Invalid")
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                password: newPassword
            }
        },
        {
            new: true
        }
    )

    return res.status(200).json(new APIResponse(200, {}, "Password Changed Succesfully"))
})

const userForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email }).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    if (!user) {
        throw new APIError(404, "User Doesn't Exists")
    }

    const { hashedToken, expiresIn } = await user.generateTemporaryToken()
    const forgotPasswordContent = forgotPasswordMailgenContent(user.username, `${req.protocol}://${req.host}/api/v1/users/verification_forgot_password/${hashedToken}`)
    user.forgotPasswordVerificationToken = hashedToken
    user.forgotPasswordVerificationExpiry = expiresIn
    await user.save({ validateBeforeSave: false })

    await sendEmail(email, "Account Recovery Email", forgotPasswordContent)

    return res.status(200).json(new APIResponse(200, {}, "Recovery Mail Send Successfully"))
})

const verifyForgotPasswordToken = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params

    const user = await User.findOne({
        forgotPasswordVerificationToken: verificationToken,
        forgotPasswordVerificationExpiry: { $gt: Date.now() }
    }).select("-password -avatarPublicId -oauth -isEmailVerified -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordVerificationToken -forgotPasswordVerificationExpiry")

    if (!user) {
        throw new APIError(400, "Verification Token Expired")
    }

    return res.status(200).json(new APIResponse(200, { isPasswordTokenVerified: true }, "Token Verification Successfully"))

})

const userPasswordReset = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params
    const { newPassword } = req.body

    const user = await User.findOneAndUpdate({
        forgotPasswordVerificationToken: verificationToken,
        forgotPasswordVerificationExpiry: { $gt: Date.now() }
    })

    if (!user) {
        throw new APIError(400, "Verification Token Expired")
    }

    user.password = newPassword
    user.forgotPasswordVerificationToken = undefined
    user.forgotPasswordVerificationExpiry = undefined
    await user.save({ validateBeforeSaveL: false })

    return res.status(200).json(new APIResponse(200, {}, "Password Changed Successfully"))
})

const refreshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken

    if (!incomingRefreshToken) {
        throw new APIError(401, "Unauthorized Request: Token Not Found")
    }

    let decodedToken

    try {
        decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new APIError(401, "Token Expired. Please login Again")
    }


    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new APIError(401, "Invalid Refresh Token")
    }

    if (incomingRefreshToken !== user.refreshToken) {
        user.refreshToken = undefined
        user.save({ validateBeforeSave: false })

        throw new APIError(403, "Account Theft")
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(decodedToken._id)

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(200, {}, "Tokens Refresh Successfully")
        )
})



export {
    userRegistration,
    loginUser,
    logoutUser,
    verifyEmail,
    updateUserDetails,
    changeUserAccountPassword,
    userForgotPassword,
    verifyForgotPasswordToken,
    userPasswordReset,
    refreshToken
}