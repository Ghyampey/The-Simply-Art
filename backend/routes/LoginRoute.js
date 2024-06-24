// const connectDB = require("../db/Connect");
// const { sign } = require("jsonwebtoken");
// const { compare } = require("bcrypt");
// const User = require("../models/User");

// const loginRoute = {
//   path: "/api/login",
//   method: "post",
//   handler: async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, password);
//     try {
//       await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tsa");
//       console.log("1. Database connected successfully");
//       const user = await User.findOne({ email });
//       console.log("2. User fetched successfully")
//       if (!user) {
//         return res.sendStatus(401);
//       }
//       if (user.isVerified === false) {
//         return res.sendStatus(403);
//       }

//       const { _id: id, isVerified, password: passwordHash, role } = user;
//       console.log(passwordHash)
//       console.log("3. Before password compare")
//       const isCorrect = await compare(password, passwordHash);
//       console.log("4. Password compared successfully")
//       console.log("Password comparison result:", isCorrect);

//       if (isCorrect) {
//         console.log("5. inside isCorrect, before sign")
//         sign(
//           { id, isVerified, email, role },
//           process.env.JWT_SECRET,
//           { expiresIn: "2d" },
//           (err, token) => {
//             console.log("6. signed the key")
//             if (err) {
//               console.error("JWT Sign Error:", err);
//               return res.status(500).json({ error: "Internal Server Error from sign function" });
//             }
//             res.status(200).json({ token });
//           }
//         );
//       } else {
//         res.sendStatus(401);
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   },
// };

// module.exports = loginRoute;

require("dotenv").config();
const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const User = require("../models/User"); // Ensure the path is correct
const connectDB = require("../db/Connect");

const loginRoute = {
    path: "/api/login",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;
        console.log("Login attempt:", email, password);

        try {
            await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tsa");
            console.log("1. Database connected successfully");
            const user = await User.findOne({ email });
            console.log("2. User fetched successfully:", user);

            if (!user) {
                console.log("User not found");
                return res.sendStatus(401);
            }

            if (user.isVerified === false) {
                console.log("User not verified");
                return res.sendStatus(403);
            }

            const { _id: id, isVerified, passwordHash, role } = user;
            console.log("3. Before password compare");
            console.log("Provided password:", password);
            console.log("Stored password hash:", passwordHash);

            const isCorrect = await compare(password, passwordHash);
            console.log("Password comparison result:", isCorrect);

            if (isCorrect) {
                console.log("5. inside isCorrect, before sign");
                sign(
                    { id, isVerified, email, role },
                    process.env.JWT_SECRET,
                    { expiresIn: "2d" },
                    (err, token) => {
                        console.log("6. signed the key");
                        if (err) {
                            console.error("JWT Sign Error:", err);
                            return res.status(500).json({ error: "Internal Server Error from sign function" });
                        }
                        res.status(200).json({ token });
                    }
                );
            } else {
                console.log("Incorrect password");
                res.sendStatus(401);
            }
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = loginRoute;
