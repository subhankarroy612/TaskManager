import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: { type: string, required: true },
    username: { type: string, required: true },
    password: { type: string, required: true }

})

export const userModel = mongoose.models.user || mongoose.model("user", userSchema);