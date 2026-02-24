class APIError extends Error {
    constructor(statusCode, message, error = []) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
    }
}

export { APIError }