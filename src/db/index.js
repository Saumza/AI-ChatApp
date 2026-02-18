import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(connection_instance.connection.host);
    } catch (error) {
        console.log("Connection Error:", error);
        process.exit(1)
    }
}

export { connectDB }