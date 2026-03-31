import axios from "./axios.js"

class chat {
    constructor(baseURL = "/api/v1/chats") {
        this.baseURL = baseURL
    }
    url() {
        return `${String(import.meta.env.VITE_API_URL)}${this.baseURL}/chat`
    }
}

const Chat = new chat()

export { Chat }