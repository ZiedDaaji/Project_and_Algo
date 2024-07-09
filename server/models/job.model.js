const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({

    title: {type: String, required: [true, "Title is required"]},
    description: {type: String, required: [true, "Description is required"]},
    location: {type: String, required: [true, "Location is required"]},
    postedBy: {type: String, required: [true, "required"]}
    }, {timestamps: true});

    const Job = mongoose.model("Job", JobSchema);
    module.exports = Job;