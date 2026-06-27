const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({

    userId: String,
    date: String,
    startTime: String,
    endTime: String,
    subject: String,
    task: String

});

module.exports = mongoose.model("Timetable", TimetableSchema);