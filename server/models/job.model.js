const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({

    title: {type: String, required: [true, "Title is required"], minlength: [3, "Title must be 3 characters at least"]},
    description: {type: String, required: [true, "Description is required"], minlength: [10, "Description must be 10 characters at least"]},
    location: {type: String, required: [true, "Location is required"]},
    postedBy: {type: String, required: [true, "required"]},
    date: {type: String, required: [true, "required"]}
    }, {timestamps: true});

    const Job = mongoose.model("Job", JobSchema);
    module.exports = Job;