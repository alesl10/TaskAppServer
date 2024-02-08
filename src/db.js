import mongoose from "mongoose"
import config from './config.js';


const MONGO_URI = config.MONGO_URI

export const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('conectado a la BD')
    } catch (error) {
        console.log(error)
    }

}