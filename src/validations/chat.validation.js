import { body } from "express-validator";

const chatSendValidation = () => {
    return [
        body("content")
            .trim()
            .isEmpty()
            .withMessage("Content Cannot Be Empty"),
        body("model")
            .trim()
            .isEmpty()
            .withMessage("Model Cannot Be Empty")

    ]
}

export { chatSendValidation }