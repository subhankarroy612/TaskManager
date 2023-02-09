import mongoose, { Schema } from "mongoose";


const taskSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    taskname: { type: String, required: true },
    date: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

export const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);