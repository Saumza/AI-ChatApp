import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => { return response }, //anything withing the status code of 200 will be send via this response handler
    async (error) => {
        const originalRequest = error.config
        if (error.response?.statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            //this will automatically refresh the token
            try {
                await api.get("/api/v1/users/refreshToken", { withCredentials: true })
                return api(originalRequest)
            } catch (error) {
                console.log("Retry Error: ", error);
                throw error
            }
        }
        throw error
    }
)

export default api