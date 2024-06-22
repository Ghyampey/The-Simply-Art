const { findOne, findOneAndUpdate, create } = require("../models/User");
const connectDB = require("../db/Connect");

const updateOrCreateFromOauth = async ({ oauthUserInfo }) => {
    const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;
    await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tsa");

    const existingUser = await findOne({ email });
    if (existingUser) {
        const result = await findOneAndUpdate(
            { email: email },
            {
                googleId,
                isVerified,
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: true,
            }
        );
        return result;
    } else {
        const result = await create({
            email,
            googleId,
            isVerified,
        });
        return result;
    }
};

module.exports = updateOrCreateFromOauth;
