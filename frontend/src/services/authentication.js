import axios from "./axios.js"

class authentication {
    constructor(baseUrl = "/api/v1/users") {
        this.baseUrl = baseUrl
    }
    async createAccount(formdata) {
        try {
            const userAccount = await axios.post(`${this.baseUrl}/register`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (userAccount) {
                return this.login({ email: formdata.email, password: formdata.password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            if (error.response) {
                console.log("Create Account Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async verifyEmail({ verificationToken }) {
        try {
            return await axios.post(`${this.baseUrl}/verify_email/${verificationToken}`)
        } catch (error) {
            if (error.response) {
                console.log("Email Verification Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await axios.post(`${this.baseUrl}/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            if (error.response) {
                console.log("Login Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }


    async logout() {
        try {
            return await axios.post(`${this.baseUrl}/logout`)
        } catch (error) {
            if (error.response) {
                console.log("Logout Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async updateDetails(formdata) {
        try {
            return await axios.patch(`${this.baseUrl}/update_userDetails`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (error) {
            if (error.response) {
                console.log("Details Updation Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async updatePassword({ oldPassword, newPassword }) {
        try {
            return await axios.patch(`${this.baseUrl}/update_password`, { oldPassword, newPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            if (error.response) {
                console.log("Password Updation Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async forgotPassword({ email }) {
        try {
            return await axios.post(`${this.baseUrl}/forgot_password`, { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            if (error.response) {
                console.log("Forgot Password Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async verificationPasswordToken({ verificationToken }) {
        try {
            return await axios.get(`${this.baseUrl}/verification_forgot_password/${verificationToken}`)
        } catch (error) {
            if (error.response) {
                console.log("Password Token Verification Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async resetPassword({ newPassword, verificationToken }) {
        try {
            return await axios.patch(`${this.baseUrl}/password_reset/${verificationToken}`, { newPassword },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        } catch (error) {
            if (error.response) {
                console.log("Reset Password Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

    async refreshToken() {
        try {
            return await axios.get(`${this.baseUrl}/refreshToken`)
        } catch (error) {
            if (error.response) {
                console.log("Token Refresh Error: ", error.response);
            }
            else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error
        }
    }

}



const authService = new authentication()
export { authService }