import Mailgen from "mailgen"
import nodemailer from "nodemailer"
import { APIError } from "./APIError.js"



const sendEmail = async (toEmail, subject, mailContent) => {

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "AI ChatApp",
            link: "http://localhost:8000"
        }
    })

    const emailHTML = mailGenerator.generate(mailContent)
    const emailPlainText = mailGenerator.generatePlaintext(mailContent)

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    const mailSend = {
        from: "example@mail.com",
        to: toEmail,
        subject: subject,
        html: emailHTML,
        text: emailPlainText,
    }
    try {
        await transporter.sendMail(mailSend)
    } catch (error) {
        console.log(error);
        throw new APIError(500, "Email Services Failed. Make sure the credentials are provided correctly", error)
    }


}

const verificationMailgenContent = (username, verificationURL) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App. We are excited to have you onboard in our app",
            action: {
                instructions: "To confirm your email, please click on the button below",
                button: {
                    color: "#22BC66",
                    text: "Confirm your account",
                    link: verificationURL
                }
            },
            outro: "Need help, or have questions? Just reply to this email. We would love to help"
        }
    }
}

const forgotPasswordMailgenContent = (username, confirmationURL) => {
    return {
        body: {
            name: username,
            intro: "You are recieving this email because we have recieved a password request for you account.",
            action: {
                instructions: "Click the button to reset your password.",
                button: {
                    color: "#eb3241",
                    text: "Reset Your Password",
                    link: confirmationURL
                },
                outro: "If you did not make this password reset request, then you can safely ignore the mail"
            }
        }
    }
}

export { verificationMailgenContent, forgotPasswordMailgenContent, sendEmail }