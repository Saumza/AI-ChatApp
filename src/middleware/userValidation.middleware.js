import { validationResult } from "express-validator";
import { APIError } from "../utils/APIError.js";



export const userValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array.map((error) => extractedErrors.push(
        {
            [error.path]: error.msg
        }
    ))

    throw new APIError(423, "Credentials passed are not valid:", extractedErrors)
}