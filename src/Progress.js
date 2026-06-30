import React, { useState, useEffect } from "react";
import "./Progress.css";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function Progress() {

        const [subjects, setSubjects] = useState([]);
        const [tasks, setTasks] = useState([]);

        const getSubjects = async () => {

    try{
        const userId = localStorage.getItem("userId");
        const response = await fetch(
            `http://localhost:5000/api/subject/${userId}`
        );

        const data = await response.json();

        setSubjects(data);

    }

    catch(error){

        console.log(error);

    }

};

const getTasks = async () => {

    try{
        const userId = localStorage.getItem("userId");
        const response = await fetch(
            `http://localhost:5000/api/task/${userId}`
        );

        const data = await response.json();

        setTasks(data);

    }

    catch(error){

        console.log(error);

    }

};

useEffect(() => {

    getSubjects();
    getTasks();

}, []);

const totalSubjects = subjects.length;
const totalTasks = tasks.length;
const completedTasks = tasks.filter( task => task.status === "Completed").length;

const getSubjectProgress = (subjectName) => {

    const subjectTasks = tasks.filter(

        task =>
        task.subject === subjectName

    );

    const completedSubjectTasks = subjectTasks.filter(

        task =>
        task.status === "Completed"

    );

    if(subjectTasks.length === 0){

        return 0;

    }

    return Math.round(

        (
            completedSubjectTasks.length /
            subjectTasks.length
        ) * 100

    );

};

const pendingTasks = tasks.filter(task => task.status === "Pending").length;
const overdueTasks =tasks.filter(task => task.status === "Overdue").length;
const completedDeg = totalTasks > 0? (completedTasks / totalTasks) * 360: 0;
const pendingDeg = totalTasks > 0? (pendingTasks / totalTasks) * 360: 0;
const overdueDeg = totalTasks > 0? (overdueTasks / totalTasks) * 360: 0;
const progressPercentage = totalTasks > 0?

    Math.round(

        (
            completedTasks /
            totalTasks
        ) * 100

    )

    : 0;

    return(
        <div className="progress-page">
                <Sidebar />
            { /*MAIN CONTENT*/ }

                 <div className="main-content">
                    <Topbar />
            { /*TOP SECTION*/ }

                <div className="top-section">
                    <div>
                        <h1>
                            My Progress
                        </h1>

                        <p>
                            Track your study progress and performance
                        </p>
                    </div> 
                </div>

<div className="cards-container">

    <div className="card">

        <h3>
            Total Subjects
        </h3>

        <h2>
            {totalSubjects}
        </h2>

    </div>

    <div className="card">

        <h3>
            Total Tasks
        </h3>

        <h2>
            {totalTasks}
        </h2>

    </div>

    <div className="card">

        <h3>
            Completed Tasks
        </h3>

        <h2>
            {completedTasks}
        </h2>

    </div>

    <div className="card">

        <h3>
            Pending Tasks
        </h3>

        <h2>
            {pendingTasks}
        </h2>

    </div>

</div>
 <div className="bottom-section">

    {/* PROGRESS CIRCLE */}

    <div className="progress-card">

        <h3>Overall Progress</h3>

        <div className="circle-wrap">

            <div
                className="circle"
                style={{
                     
                background: `conic-gradient(
                    #22c55e 0deg ${completedDeg}deg,
                    #facc15 ${completedDeg}deg ${completedDeg + pendingDeg}deg,
                    #ef4444 ${completedDeg + pendingDeg}deg ${completedDeg + pendingDeg + overdueDeg}deg,
                    #e5e7eb ${completedDeg + pendingDeg + overdueDeg}deg 360deg
                )`
 
                }}>

                <div className="circle-inner">
                    <h2>{progressPercentage}%</h2>
                </div>

            </div>

            <div className="legend">

    <div className="legend-item">
        <span className="green-dot"></span>
        Completed
    </div>

    <div className="legend-item">
        <span className="yellow-dot"></span>
        Pending
    </div>

    <div className="legend-item">
        <span className="red-dot"></span>
        Overdue
    </div>

</div>

        </div>

    </div>

    {/* SUBJECT PROGRESS */}

    <div className="subject-progress-card">

        <h3>Subject Progress</h3>

        {subjects.map((subject) => (

            <div
                key={subject._id}
                className="subject-row"
            >

                <span>
                    {subject.subjectName}
                </span>

                <div className="subject-bar">

                    <div
                        className="subject-fill"
                        style={{
                            width: `${getSubjectProgress(subject.subjectName)}%`
                        }}>

                        {getSubjectProgress(subject.subjectName)}%

                    </div>

                </div>

            </div>

        ))}

    </div>

</div> 
            </div>
        </div>
    )
}
export default Progress;