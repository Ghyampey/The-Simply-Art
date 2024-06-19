// const { findOne, findOneAndUpdate, create } = require("../models/User");
// const connectDB = require("../db/Connect");

// const updateOrCreateFromOauth = async ({ oauthUserInfo }) => {
//     const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;
//     await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tsa");

//     const existingUser = await findOne({ email });
//     if (existingUser) {
//         const result = await findOneAndUpdate(
//             { email: email },
//             {
//                 googleId,
//                 isVerified,
//             },
//             {
//                 new: true,
//                 runValidators: true,
//                 useFindAndModify: true,
//             }
//         );
//         return result;
//     } else {
//         const result = await create({
//             email,
//             googleId,
//             isVerified,
//         });
//         return result;
//     }
// };

// module.exports = updateOrCreateFromOauth;
const User = require('../models/User');

const updateOrCreateFromOauth = async ({ User }) => {
    const { id: googleId, verified_email: isVerified, email } = User;

    try {
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            // Update the existing user only if googleId is not null
            if (googleId) {
                existingUser.googleId = googleId;
                existingUser.isVerified = isVerified;
                await existingUser.save();
            }
            return existingUser;
        } else {
            // Create a new user only if googleId is not null
            if (googleId) {
                const newUser = new User({
                    email,
                    googleId,
                    isVerified,
                });
                const result = await newUser.save();
                return result;
            } else {
                throw new Error('googleId is null or not provided');
            }
        }
    } catch (error) {
        console.error('Error updating/creating user:', error);
        throw new Error('Error updating/creating user');
    }
};

module.exports = updateOrCreateFromOauth;


