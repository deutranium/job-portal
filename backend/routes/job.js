const router = require('express').Router();
const auth = require('../middleware/auth');
const Job = require('../models/job.model');

router.post("/add", auth, async (req, res) => {
    try {
        const { title, recruiterName, recruiterMail, maxApplicants, positions, dateOfPosting, deadline, skills, type, duration, salary, rating } = req.body;

        if (!title || !maxApplicants || !positions || !deadline || !type || !duration || !salary)
            return res.status(400).json({ msg: "Not all fields have been entered" });

        const newJob = new Job({
            title,
            recruiterName,
            recruiterMail,
            maxApplicants,
            positions,
            dateOfPosting,
            deadline,
            skills,
            type,
            duration,
            salary,
            rating
        });
        const savedJob = await newJob.save();
        res.json(savedJob);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/all", auth, async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

router.post("/delete", auth, async (req, res) => {
    try {
        const { _id } = req.body;

        const job = await Job.findByIdAndDelete(req.body.id);

        res.json(job);
    }
    catch (err) {

    }
})

// router.delete("/:id", auth, async(req,res) => {
//     const job = await Job.findOne({userId: req.user, _id: req.params.id });
//     if(!job)
//         return res.status(400).json({msg: "No todo item found !!"});
//     const deletedItem = await Job.findByIdAndDelete(req.params.id);
//     res.json(deletedItem);
// });
module.exports = router;
