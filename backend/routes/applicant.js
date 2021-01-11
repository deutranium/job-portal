const router = require('express').Router();
let Applicant = require('../models/Applicant');

router.route('/').get((req, res) => {
    Applicant.find()
    .then(applicants => res.json(applicants))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const education = req.body.education.data;
    const skills = req.body.skills.data;
    const ratings = req.body.ratings.data;

    const newApplicant = new Applicant({
        name,
        email,
        education,
        skills,
        ratings
    });

    newApplicant.save()
    .then(() => res.send('Applicant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
