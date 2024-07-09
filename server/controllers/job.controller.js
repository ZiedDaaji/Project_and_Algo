const Job = require("../models/job.model")


module.exports.creatJob = (req, res) => {
    Job.create(req.body)
    .then((newJob) => {
        res.status(200).json(newJob)})
    .catch((err) => res.status(400).json(err)
    )}

module.exports.findAllJobs = (req, res) => {
    Job.find()
        .then((allJobs) => {
            res.json(allJobs)})
        .catch((err) => console.log(err))
        }

module.exports.getOneJob = (req, res) => {
    Job.findOne({_id: req.params.id})
    .then((oneJob) => {
        res.json(oneJob)})
    .catch((err) => console.log(err))
}

module.exports.deleteJob = (req, res) => {
    Job.deleteOne({_id: req.params.id})
    .then(result => {
        res.json(result)})
    .catch((err) => console.log(err))
        }

module.exports.updateJob = (req, res) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedJob) => {
        res.json(updatedJob);
        })
        .catch((err) => res.status(400).json(err));
    };