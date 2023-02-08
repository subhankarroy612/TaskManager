const { connectDb } = require("./_connect");

connectDb()

export default function signup(req, res) {
    if (req.method == "POST") {
        const { username, email, password } = req.body
        try {
            
            return res.status(200).send({username, email, password})

        } catch (e) {
            return res.status(501).send(e.message)
        }
    }
}
