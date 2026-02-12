import mongoose from "mongoose"
import { DB_NAME } from "../constrants.js";

const connectDB = async () => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(connection_instance.connection.host);
    } catch (error) {
        console.log("Connection Error:", error);
        process.exit(1)
    }
}

export { connectDB }