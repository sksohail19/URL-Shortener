const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

exports.connectToMongoDB = connectToMongoDB;
