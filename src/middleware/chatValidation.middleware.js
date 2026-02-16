import { APIError } from "../utils/APIError.js";
import { chatValidation } from "../validations/chat.validation.js";


export const userValidate = (req, res, next) => {
    const errors = chatValidation(req)
    if (!errors.isEm) return
}