require("dotenv").config();
const connectDB = require("../db/Connect");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { findOne } = require("../models/User");

// Your code using findOne, findOneAndUpdate, and create here


const loginRoute = {
    path: "/api/login",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password)
        await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tsa");
        const user = await findOne({ email });
        if (!user) {
            return res.sendStatus(401);
        }
        if (user.isVerified === false) {
            return res.sendStatus(403);
        }

        const { _id: id, isVerified, passwordHash, role } = user;

        const isCorrect = await compare(password, passwordHash);

        if (isCorrect) {
            sign(
                {
                    id,
                    isVerified,
                    email,
                    role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2d",
                },
                (err, token) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    res.status(200).json({ token });
                }
            );
        } else {
            res.sendStatus(401);
        }
    },
};

module.exports = loginRoute;
