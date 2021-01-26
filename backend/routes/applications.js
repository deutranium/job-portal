const router = require("express").Router();
const Applications = require("../models/applications.model");


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
        const savedApplication = await newApplication.save();
        res.json(savedApplication);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/find", async(req,res) => {
    const job = await Job.findOne({jobId: req.body.id, applicantId: req.body.applicantId });
    if(!job)
        return res.status(400).json({msg: "No todo item found !!"});
    
    res.json(job);
});

module.exports = router;
