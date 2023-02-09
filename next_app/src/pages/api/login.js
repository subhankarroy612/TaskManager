import { userModel } from "@/models/user.model";
import jwt from 'jsonwebtoken'
import { handler } from "./_cors";

const { connectDb } = require("./_connect");

connectDb()

export default async function signup(req, res) {
    await handler(req, res)
    if (req.method == "POST") {
        const { username, password } = req.body
        try {

            const existingUser = await userModel.findOne({ username, password });

            if (!existingUser) {
                return res.status(403).send('Invalid credentials')
            }

            const token = jwt.sign({ email: existingUser.email, username: existingUser.username, _id: existingUser._id }, process.env.TOKEN)
            return res.status(200).send(token)

        } catch (e) {
            return res.status(501).send(e.message)
        }
    }
}
