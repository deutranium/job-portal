const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Recruiter = require("../models/recruiter.model");

router.post("/register", async (req, res) => {
	try {
		const newRecruiter = new Recruiter({
			email: req.body.email,
			name: req.body.name,
			contactNumber: req.body.contactNumber,
			bio: req.body.bio,
		});

		const savedRecruiter = await newRecruiter.save();
		res.json(savedRecruiter);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
