const router = require('express').Router();
let Applicant = require('../models/Applicant');

router.route('/').get((req, res) => {
    Recruiter.find()
    .then(recruiters => res.json(recruiters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const newRecruiter = new Recruiter({
        name,
        email
    });

    newRecruiter.save()
    .them(() => res.join('Recruiter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
