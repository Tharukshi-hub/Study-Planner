const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({

    userId: String,
    subjectName: String,
    difficulty: String,
    priority: String

});

module.exports = mongoose.model("Subject", SubjectSchema);