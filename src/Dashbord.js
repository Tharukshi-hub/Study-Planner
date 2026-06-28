import React, { useState, useEffect } from "react";
import "./Dashbord.css";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";

function Dashbord() {

    const [tasks, setTasks] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [userName, setUserName] = useState([]);

    useEffect(() => {

        getTasks();
        getTimetable();
        getSubjects();
        
        const name = localStorage.getItem("userName");
         setUserName(name || "Student");
    }, []);

    const getTasks = async () => {

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(
                `http://localhost:5000/api/task/${userId}`
            );

            const data = await response.json();

            setTasks(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const getTimetable = async () => {

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(
                `http://localhost:5000/api/timetable/${userId}`
            );

            const data = await response.json();

            setTimetable(data);

        }

        catch (error) {

            console.log(error);

        }

    };
    const getSubjects = async () => {

    try {

        const userId = localStorage.getItem("userId");

        const response = await fetch(
            `http://localhost:5000/api/subject/${userId}`
        );

        const data = await response.json();

        setSubjects(data);

    }

    catch(error) {

        console.log(error);

    }

};
    const today = new Date()
.toISOString()
.split("T")[0];

const todayTasks = tasks.filter(
    task => task.deadline === today
);

        const completedTasks =
        tasks.filter(
            task =>
                task.status === "Completed"
        ).length;

        const progress =
        tasks.length > 0

            ?

            Math.round(
                (completedTasks /
                    tasks.length) * 100
            )

            : 0;

    const pendingTasks =
        tasks.filter(
            task =>
                task.status === "Pending"
        );

    const suggestions = [ ];

    if (progress < 30) {

        suggestions.push(
            "Your progress is low. Complete more tasks."
        );

    }

    if (pendingTasks.length > 3) {

        suggestions.push(
            "You have many pending tasks."
        );

    }

    if (progress >= 80) {

        suggestions.push(
            "Excellent progress. Keep it up!"
        );

    }

    // Hard Subject Rule

const hardSubjects = subjects.filter(
    subject => subject.difficulty === "Hard"
);

if (hardSubjects.length > 0) {

    suggestions.push(
        `Focus on ${hardSubjects[0].subjectName}. It is a hard subject.`
    );

}

// High Priority Rule

const highPrioritySubjects = subjects.filter(
    subject => subject.priority === "High"
);

highPrioritySubjects.forEach((subject) => {

    suggestions.push(
        `${subject.subjectName} is a high-priority subject.`
    );

});

// Deadline Rule

tasks.forEach((task) => {

    if (!task.deadline) return;

    const today = new Date();
    const deadline = new Date(task.deadline);

    const diffDays =
        (deadline - today) /
        (1000 * 60 * 60 * 24);

    if (diffDays <= 3 && diffDays >= 0) {

        suggestions.push(
            `${task.taskName} deadline is approaching.`
        );

    }

});

    return (

        <div className="dashboard-container">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2 className="logo">
                    Smart Study Planner
                </h2>

                <ul className="menu">

                    <li className="active">
                        Dashboard
                    </li>

                    <Link to="/Subject">
                        <li>Subjects</li>
                    </Link>

                    <Link to="/Task">
                        <li>Tasks</li>
                    </Link>

                    <Link to="/Timetable">
                        <li>Timetable</li>
                    </Link>

                    <Link to="/Progress">
                        <li>Progress</li>
                    </Link>

                    <Link to="/Suggestions">
                        <li>AI Suggestions</li>
                    </Link>

                    <Link to="/Calender">
                        <li>Calender</li>
                    </Link>

                    <Link to="/Settings">
                        <li>Settings</li>
                    </Link>

                </ul>

            </div>

            {/* MAIN CONTENT */}

            <div className="main-content">

                <Topbar />
                <h1 className="welcome-text">
                    Welcome, {userName} !!
                </h1>

                <div className="dashboard-grid">

                    {/* TODAY TARGETS */}
                    <Link to="/Task" className="card-link">
                        <div className="dashboard-card">

                            <h2>
                                Today's Targets
                            </h2>
                            {
                                todayTasks.length > 0 ?

                                    todayTasks.map((task) => (

                                        <p key={task._id}>
                                            • {task.taskName}
                                        </p>

                                    ))

                                    :

                                    <p>No tasks for today</p>
                                }

                            {

                                timetable.slice(0, 3)
                                    .map((item, index) => (

                                        <p key={index}>
                                            {item.task}
                                        </p>

                                    ))

                            }

                        </div>
                    </Link>

                    {/* UPCOMING TASKS */}
                  <Link to="/Task" className="card-link">
                    <div className="dashboard-card">

                        <h2>
                            Upcoming Tasks
                        </h2>

                        {

                            pendingTasks.slice(0, 4)
                                .map((task) => (

                                    <p key={task._id}>
                                        • {task.taskName}
                                    </p>

                                ))

                        }

                    </div>
                   </Link> 

                    {/* AI SUGGESTIONS */}
                    <Link to = "/Suggestions" className="card-link">
                        <div className="dashboard-card">

                            <h2>
                                AI Suggestions
                            </h2>

                            {

                                suggestions.length > 0 ?
                                suggestions.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))

                                :

                                <p>No suggestions available</p>

                            }

                        </div>
                    </Link>
                    {/* STUDY SCHEDULE */}
                  <Link to="/Timetable" className="card-link">
                    <div className="dashboard-card">

                        <h2>
                            Study Schedule
                        </h2>

                        {

                            timetable.slice(0, 4)
                                .map((item, index) => (

                                    <p key={index}>
                                        {item.startTime}
                                        {" - "}
                                        {item.endTime}
                                        {" "}
                                        {item.subject}
                                    </p>

                                ))

                        }

                    </div>
                    </Link>
                    {/* PROGRESS */}
                  <Link to="/Progress" className="card-link">
                    <div className="dashboard-card progress-card">

                        <h2>
                            Progress
                        </h2>

                        <div
                            className="progress-circle"
                            style={{
                                background: `conic-gradient(
                                    #2563eb ${progress * 3.6}deg,
                                    #e5e7eb 0deg
                                )`
                            }}>
                            <div className="progress-inner">
                                <span>{progress}%</span>
                            </div>
                        </div>

                    </div>
                  </Link>

                </div>

            </div>

        </div>

    );

}

export default Dashbord;