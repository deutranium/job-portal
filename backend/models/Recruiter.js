const mongoose  = require('mongoose');

const Schema = mongoose.Schema;;

const recruiterSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
