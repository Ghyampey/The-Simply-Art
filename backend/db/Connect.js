const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = (url='mongodb://127.0.0.1:27017/tsa') => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;

