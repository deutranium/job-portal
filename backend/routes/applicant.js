const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Applicant = require("../models/applicant.model");

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

router.get("/skills", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.category == "applicant") {
            const info = await Applicant.find({
                email: user.email,
            });
            res.json(info);
        } else {
            const info = await Recruiter.find({
                email: user.email,
            });
            res.json(info);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
