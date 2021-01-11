const router = require('express').Router();
let Recruiter = require('../models/Recruiter');

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
    .then(() => res.send('Recruiter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
