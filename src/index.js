import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config(
    {
        path: "./env"
    }
)

connectDB().then(() => {
    mongoose.connection.on("error", () => {
        console.error("Database Connection Error");
    })
    app.listen(process.env.PORT, () => {
        console.log("Server is running on PORT:", process.env.PORT);
    })
}).catch((error) => {
    console.log("DB Connection Failed: ", error);
})

