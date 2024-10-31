const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    shortId: {                // Changed `typeof` to `type`
        type: String,
        required: true,
        unique: true 
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"  // Added reference to 'users' collection
    }
}, { timestamps: true });

const URL = mongoose.model("url", schema);

module.exports = URL;
