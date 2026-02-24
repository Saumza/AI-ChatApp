import axios from "./axios.js"

class authentication {
    constructor(baseUrl = "/api/v1/users") {
        this.baseUrl = baseUrl
    }
async createAccount({ name, username, email, password }) {
        try {
            return await axios.post(`${this.baseUrl}` / register)
        } catch (error) {

        }
    }
    
}

const authService = new authentication()
export { authService }