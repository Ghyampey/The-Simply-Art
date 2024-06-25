const mongoose = require("mongoose");
const { Exhibition } = require("./Artist");
// mongoose.set("strictQuery", false);
const artistdesSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim:true,
    },
    biography:{
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim:true,
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin:{
        type:String,
    },
    exibition:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

});
const Artistdes = mongoose.model("Artistdes", artistdesSchema);
module.exports = {Artistdes};
