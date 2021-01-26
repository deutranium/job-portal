const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
	jobId: { type: String, required: true, unique: true },
    applicantId: { type: String, required: true, minlength: 5 },
    sop: {type: String, required: true}
});

module.exports = Application = mongoose.model("application", applicationSchema);
