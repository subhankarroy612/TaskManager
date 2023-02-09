import { userModel } from "@/models/user.model";
import { handler } from "./_cors";

const { connectDb } = require("./_connect");

connectDb()

export default async function signup(req, res) {
    await handler(req, res)
    if (req.method == "POST") {
        const { username, email, password } = req.body
        try {

            const newUser = new userModel({ username, email, password });
            await newUser.save()
            return res.status(201).send('Signup successful!')

        } catch (e) {
            return res.status(501).send(e.message)
        }
    }
}
