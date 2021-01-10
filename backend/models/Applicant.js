const mongoose  = require('mongoose');

const Schema = mongoose.Schema;;

const applicantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
