import mongoose from "mongoose";
import 'dotenv/config'

export const connectDb = async () => {
    if (mongoose.connections[0].readyState)
        return
    await mongoose.connect(process.env.URL);
    return;
}