import { userModel } from "@/models/user.model";
import { taskModel } from "@/models/task.model";
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import mongoose from "mongoose";

const { connectDb } = require("./_connect");

connectDb()

export default async function userDetails(req, res) {
    if (req.method === "GET") {
        const { token } = req.headers;
        try {

            const userDetails = jwt.verify(token, process.env.TOKEN);
            if (!userDetails)
                return res.status(401).send('Unauthorised!')

            let allTasks = await taskModel.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(userDetails._id) } },
                { $match: { date: Math.floor(Date.now() / 86400000) } } // number in miliSec 86400000 = 24hrs
            ])

            res.status(200).send({ userDetails, allTasks })

        } catch (e) {
            if (e.message === 'jwt must be provided') {
                return res.status(501).send('Please login!')
            }
            return res.status(501).send(e.message)
        }

    } else if (req.method === "POST") {
        const { token } = req.headers;
        const { task } = req.body;

        try {

            const { _id } = jwt.verify(token, process.env.TOKEN);

            const newTask = new taskModel({ userId: _id, taskname: task, date: Math.floor(Date.now() / 86400000) })
            await newTask.save()
            return res.status(201).send('Task created!')

        } catch (e) {
            console.log(e.message);
            return res.status(501).send(e.message)
        }


    }
}


