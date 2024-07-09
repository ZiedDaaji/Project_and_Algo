const jobController = require ("../controllers/job.controller");

module.exports = (app) => {
    app.post("/api/Jobs", jobController.creatJob);
    app.get("/api/Jobs", jobController.findAllJobs);  
    app.delete("/api/Jobs/:id", jobController.deleteJob);
    app.patch("/api/Jobs/:id", jobController.updateJob)
    app.get("/api/Jobs/:id", jobController.getOneJob)
}