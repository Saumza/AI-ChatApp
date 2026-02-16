import { body } from "express-validator";

const chatSendValidation = () => {
    return [
        body("content")
            .trim()
            .isEmpty()
            .withMessage("Content Cannot Be Empty")
    ]
}

export { chatSendValidation }