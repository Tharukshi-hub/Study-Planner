const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    userId:String,
    taskName:String,
    subject:String,
    deadline:String,
    status:String,
    pdfFile:{ type: String, default: "" }

});
module.exports = mongoose.model("Task", TaskSchema);