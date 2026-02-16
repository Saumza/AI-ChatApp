import { body } from "express-validator"

const registerUserValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email field can't be Empty")
            .isEmail()
            .withMessage("Email format is not Correct"),
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name field can't be Empty"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username field can't be Empty")
            .isLength()
            .withMessage({ min: 3 }),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password field can't be Empty")
    ]

}

const userLoginValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email field cannot be Empty"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password field can't be empty")
    ]
}


const updateUserDetailsValidation = () => {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("username field canot be empty"),
        body("fullname")
            .trim()
            .notEmpty()
            .withMessage("fullname field cannot be empty")
    ]
}

const changeUserPasswordValidation = () => {
    return [
        body("oldPassword")
            .trim()
            .notEmpty()
            .withMessage("OldPassword Field Cannot be Empty"),
        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("NewPassword Field Cannot be Empty")
    ]
}

const forgotUserPasswordValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email Cannot be Empty")
            .isEmail()
            .withMessage("Email Format is not")
    ]
}

const resetUserPasswordValidation = () => {
    return [
        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("Password is Required")
    ]
}

export {
    registerUserValidation,
    userLoginValidation,
    updateUserDetailsValidation,
    resetUserPasswordValidation,
    forgotUserPasswordValidation,
    changeUserPasswordValidation
}