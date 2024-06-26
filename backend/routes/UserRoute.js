require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const getAllUsers = {
    path: "/api/User",
    method: "get",
    handler: async (req, res) => {
        const { role } = req.query;
        const User = await User.find({ role });

        res.status(200).json({ User });
    },
};

const updateUser = {
    path: "/api/User/:id",
    method: "patch",
    handler: async (req, res) => {
        const { id: userID } = req.params;
        const { confirmPassword, receiveEmail, role } = req.body;
        let newPasswordHash;

        console.log(confirmPassword, receiveEmail, role);
        if (confirmPassword) {
            newPasswordHash = await bcrypt.hash(confirmPassword, 10);
        }
        console.log(newPasswordHash);
        const User = await User.findOneAndUpdate(
            { _id: userID },
            {
                ...(confirmPassword && { passwordHash: newPasswordHash }),
                ...(receiveEmail === true && { receiveEmail }),
                ...(receiveEmail === false && { receiveEmail: false }),
                ...(role === true && { role: "artist" }),
                ...(role === false && { role: "user" }),
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: true,
            }
        );

        res.status(200).json({});
    },
};

const getUser = {
    path: "/api/User/:id",
    method: "get",
    handler: async (req, res) => {
        const { id: userID } = req.params;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            return res.sendStatus(400);
        }
        res.status(200).json({ user });
    },
};

const deleteUser = {
    path: "/api/User/:id",
    method: "delete",
    handler: async (req, res) => {
        const { id: userID } = req.params;
        const user = await User.findOneAndDelete({ _id: userID });
        if (!user) {
            return res.sendStatus(400);
        }
        res.status(200).json({ user });
    },
};

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
};
