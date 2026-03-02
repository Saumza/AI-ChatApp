import axios from "./axios.js"

class conversationService {
    constructor(baseUrl = "/api/v1/conversations") {
        this.baseUrl = baseUrl
    }

    async list() {
        try {
            return await axios.get(`${this.baseUrl}/list`)
        }
        catch (error) {
            if (error.response) {
                console.log("List Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }

    }

    async getChats(conversationId) {
        try {
            return await axios.get(`${this.baseUrl}/${conversationId}`)
        } catch (error) {
            if (error.response) {
                console.log("Get Chats Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            return "Error"
        }
    }

    async update({ conversationId, title }) {
        try {
            return await axios.patch(`${this.baseUrl}/${conversationId}`, { title })
        } catch (error) {
            if (error.response) {
                console.log("Update Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            return "Error"
        }
    }

    async delete(conversationId) {
        try {
            return await axios.delete(`${this.baseUrl}/${conversationId}`)
        } catch (error) {
            if (error.response) {
                console.log("Deletion Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            return "Error"
        }
    }

}

const conversation = new conversationService()
export { conversation }