const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const RegisterRoutes = require("./routes/Register");
const SubjectRoutes = require("./routes/Subject");
const TaskRoutes = require("./routes/Task");
const TimetableRoutes = require("./routes/Timetable");
const path = require("path");
const NotificationRoutes = require("./routes/Notification");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection

mongoose.connect(
    "mongodb://localhost:27017/studyplanner"
)

.then(() => console.log("MongoDB Connected"))

.catch((err) => console.log(err));


// Routes

app.use("/api/register", RegisterRoutes);
app.use("/api/subject", SubjectRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/timetable", TimetableRoutes);
app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use("/api/notification", NotificationRoutes);

// Server

app.listen(5000, () => {

    console.log("Server running on port 5000");

});