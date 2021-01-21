const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	education: {
		type: Object,
	},
	skills: {
		type: Object,
	},
	rating: {
		type: Array,
	},
});

module.exports = Applicant = mongoose.model("applicant", applicantSchema);
