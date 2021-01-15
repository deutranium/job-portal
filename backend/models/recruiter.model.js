const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    bio: {
        type: String
    }
});

module.exports = Recruiter = mongoose.model("recruiter", recruiterSchema);
