import axios from "./axios.js"

class chat {
    constructor(baseURL = "/api/v1/chats") {
        this.baseURL = baseURL
    }
    url() {
        return `http://localhost:8000${this.baseURL}/chat`
    }
}

const Chat = new chat()

export { Chat }