const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true},
    recruiterName: { type: String, required: true},
    recruiterMail: {
        type: String,
        required: true,
    },
    maxApplicants: {
        type: Number,
        required: true
    },
    positions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Array,
        default: [],
        required: true
    }

})

module.exports = Job = mongoose.model("job", jobSchema);