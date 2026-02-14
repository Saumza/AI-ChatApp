import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET

    })

    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        return response
    } catch (error) {
        console.error("Upload Failed: ", error)
        return error
    }
    finally {
        try {
            fs.unlinkSync(localFilePath)
        } catch (error) {
            console.log(error);
        }
    }
}



const deleteFromCloudinary = async (publicId, resource_type = "image") => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET

    })

    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.destroy(publicId, { resource_type })
        return response
    } catch (error) {
        console.error("Upload Failed: ", error)
        return error
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }