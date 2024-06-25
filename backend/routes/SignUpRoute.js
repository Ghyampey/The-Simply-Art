// require("dotenv").config();
// const { sign } = require("jsonwebtoken");
// const { hash } = require("bcrypt");
// const User = require("../models/User"); // Adjust the require to ensure it's correct
// const { v4: uuidv4 } = require("uuid");
// const sendTEmail = require('../Utils/Email');

// const signUpRoute = {
//     path: "/api/signup",
//     method: "post",
//     handler: async (req, res) => {
//         const { username, email, password, role } = req.body;
//         console.log(email, password);

//         try {
//             // Check if the user already exists
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(409).json({ message: 'User already exists' });
//             }

//             // Hash the password
//             const passwordHash = await hash(password, 10);

//             // Generate verification string
//             const verificationString = uuidv4();

//             // Create a new user
//             const newUser = new User({
//                 username,
//                 email,
//                 password: passwordHash,
//                 role: role || "admin",
//                 isVerified: false,
//                 verificationString,
//             });

//             // Save the new user to the database
//             const result = await newUser.save();

//             // Send verification email
//             try {
//                 await sendTEmail({
//                     to: email,
//                     from: "simply.art213@outlook.com",
//                     subject: "Please verify your email",
//                     text: `
//                         Thank you for signing up! To verify your email, click here:
//                         http://localhost:3000/verify-email/${verificationString}
//                     `,
//                 });
//             } catch (emailError) {
//                 console.error('Email Sending Error:', emailError);
//                 return res.status(500).json({ msg: 'Error sending email' });
//             }

//             // Generate a JWT token
//             sign(
//                 {
//                     id: result._id,
//                     email,
//                     role: newUser.role,
//                     isVerified: false,
//                 },
//                 process.env.JWT_SECRET || "defaultSecret",
//                 {
//                     expiresIn: "2d",
//                 },
//                 (jwtError, token) => {
//                     if (jwtError) {
//                         console.error('JWT Sign Error:', jwtError);
//                         return res.status(500).json({ msg: 'Error signing token' });
//                     }
//                     res.status(200).json({ token });
//                 }
//             );
//         } catch (error) {
//             console.error('Signup Error:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     },
// };

// module.exports = signUpRoute;



require("dotenv").config();
const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");
const {User} = require("../models/User"); // Ensure the path is correct
const { v4: uuidv4 } = require("uuid");
const sendTEmail = require('../Utils/Email');

const signUpRoute = {
    path: "/api/signup",
    method: "post",
    handler: async (req, res) => {
        const { username, email, password, role } = req.body;
        console.log(email, password);

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Hash the password
            const passwordHash = await hash(password, 10);

            // Generate verification string
            const verificationString = uuidv4();

            // Create a new user
            const newUser = new User({
                username,
                email,
                passwordHash, // Correctly use passwordHash here
                role: role || "admin",
                isVerified: false,
                verificationString,
            });

            // Save the new user to the database
            const result = await newUser.save();

            // Send verification email
            try {
                await sendTEmail({
                    to: email,
                    from: "simply.art213@outlook.com",
                    subject: "Please verify your email",
                    text: `
                        Thank you for signing up! To verify your email, click here:
                        http://localhost:3000/verify-email/${verificationString}
                    `,
                });
            } catch (emailError) {
                console.error('Email Sending Error:', emailError);
                return res.status(500).json({ msg: 'Error sending email' });
            }

            // Generate a JWT token
            sign(
                {
                    id: result._id,
                    email,
                    role: newUser.role,
                    isVerified: false,
                },
                process.env.JWT_SECRET || "defaultSecret",
                {
                    expiresIn: "2d",
                },
                (jwtError, token) => {
                    if (jwtError) {
                        console.error('JWT Sign Error:', jwtError);
                        return res.status(500).json({ msg: 'Error signing token' });
                    }
                    res.status(200).json({ token });
                }
            );
        } catch (error) {
            console.error('Signup Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = signUpRoute;
