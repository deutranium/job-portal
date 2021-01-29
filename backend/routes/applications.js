const router = require("express").Router();
const { update } = require("../models/applications.model");
const Applications = require("../models/applications.model");
const Job = require("../models/job.model");

const mongoose = require("mongoose");


router.post("/apply", async (req, res) => {
    try {
        let { jobId, applicantId, sop } = req.body;

        // validate
        if (!jobId || !applicantId || !sop)
            return res
                .status(400)
                .json({
                    msg:
                        "Please enter a valid SOP"
                });

        const newApplication = new Application({
            jobId,
            applicantId,
            sop
        });
        const savedApplication = await newApplication.save()
        console.log(jobId)


        const job = await Job.findById(mongoose.Types.ObjectId(jobId))
        .then((r) => {
            let temp = r["applications"]
            const newReq = {
                applications: temp + 1
            }

            updatedJob = Job.findByIdAndUpdate(jobId, { $set: newReq }, {useFindAndModify: false})
            .then(console.log("Dddddddiiiiiieeeeeee"))
        })
        .catch((e) => {
            console.log(e)
        })

        return res.json(savedApplication);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/find", async (req, res) => {

    const job = await Applications.findOne({ jobId: req.body.jobId, applicantId: req.body.applicantId });
    if (job) {
        return res.status(200).json(job);
    }
    else {
        res.status(400).json({"message":"nah"});
    }
});

module.exports = router;
