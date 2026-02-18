import { Router } from "express"
import { userRegistration, loginUser, logoutUser, verifyEmail, updateUserDetails, changeUserAccountPassword, userForgotPassword, verifyForgotPasswordToken, userPasswordReset, refreshToken } from "../controller/user.controller.js"
import { registerUserValidation, changeUserPasswordValidation, forgotUserPasswordValidation, updateUserDetailsValidation, userLoginValidation, resetUserPasswordValidation } from "../validations/user.validation.js"
import { upload } from "../middleware/multer.middleware.js"
import { verifyJwt } from "../middleware/auth.middleware.js"
import { userValidate } from "../middleware/userValidation.middleware.js"


const router = Router()

router.route("/register").post(upload.single("avatar"), registerUserValidation(), userValidate, userRegistration)
router.route("/login").post(upload.none(), userLoginValidation(), userValidate, loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/verify_email/:verificationToken").patch(verifyEmail)
router.route("/update_userDetails").patch(verifyJwt, upload.none(), updateUserDetailsValidation(), userValidate, updateUserDetails)
router.route("/update_password").patch(verifyJwt, upload.none(), changeUserPasswordValidation(), userValidate, changeUserAccountPassword)
router.route("/forgot_password").post(upload.none(), forgotUserPasswordValidation(), userValidate, userForgotPassword)
router.route("/verification_forgot_password/:verificationToken").get(verifyForgotPasswordToken)
router.route("/password_reset").patch(upload.none(), resetUserPasswordValidation(), userValidate, userPasswordReset)
router.route("/refreshToken").get(refreshToken)


export { router as userRouter }