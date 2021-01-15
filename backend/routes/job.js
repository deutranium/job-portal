const router = require('express').Router();
const auth = require('../middleware/auth');
const Job = require('../models/job.model');

router.post("/", async(req,res) => {
    try{
        const { title } = req.body;

        if(!title)
            return res.status(400).json({msg: "Not all fields have been entered"});

        const newJob = new Job({
            title,
            userId: req.user
        });
        const savedJob = await newJob.save();
        res.json(savedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/all", auth, async(req,res) => {
    const jobs = await Job.find({ userId: req.user});
    res.json(jobs);
})

router.delete("/:id", auth, async(req,res) => {
    const job = await Job.findOne({userId: req.user, _id: req.params.id });
    if(!job)
        return res.status(400).json({msg: "No todo item found !!"});
    const deletedItem = await Job.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
});
module.exports = router;
