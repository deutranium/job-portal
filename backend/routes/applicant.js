const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Applicant = require("../models/applicant.model");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
    try {
        // let email = req.body.email;
        // let name = req.body.name;

        const newApplicant = new Applicant({
            email: req.body.email,
            name: req.body.name,
        });

        const savedApplicant = await newApplicant.save();
        res.json(savedApplicant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/update", auth, async (req, res) => {
    try {
        const id = req.body.applicantId
        const userId = req.body.userId

        const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser && existingUser._id == userId)
			return res
				.status(400)
				.json({ msg: "An account with this email already exists." });



        const tempBody = req.body;
        delete tempBody["applicantId"]
        delete tempBody["userId"]
        const updatedApplicant = await Applicant.findByIdAndUpdate(id, tempBody, {useFindAndModify: false});

        const userBody = {
            email: req.body.email,
            name: req.body.name
        }

        const updatedUser = await User.findByIdAndUpdate(userId, userBody,  {useFindAndModify: false})
        res.json(updatedUser)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.delete("/delete", auth, async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user);
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
