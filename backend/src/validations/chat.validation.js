import { body } from "express-validator";

const chatSendValidation = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Content Cannot Be Empty"),
        body("model")
            .trim()
            .notEmpty()
            .withMessage("Model Cannot Be Empty")

    ]
}

export { chatSendValidation }