import React, { useState, useEffect } from "react";
import "./Suggestions.css";
import { Link } from "react-router-dom";

function Suggestions() {

    const [subjects, setSubjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    //const [slots, setSlots] = useState([]);

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

 useEffect(() => {

    const aiSuggestions = [];

    const completedTasks =
        tasks.filter(
            task =>
            task.status === "Completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            task =>
            task.status === "Pending"
        ).length;

    const totalTasks =
        tasks.length;

    const progress =

        totalTasks > 0

        ?

        (completedTasks / totalTasks) * 100

        : 0;

    // Progress Rule

    if(progress < 30){

        aiSuggestions.push(

            " Your study progress is low. Try completing more tasks."

        );

    }

    // Pending Tasks Rule

    if(pendingTasks > 3){

        aiSuggestions.push(

            " You have several pending tasks. Focus on completing them."

        );

    }

    // Hard Subject Rule

    const hardSubjects =
        subjects.filter(

            subject =>
            subject.difficulty === "Hard"

        );

    if(hardSubjects.length > 0){

        aiSuggestions.push(

            ` Focus on ${hardSubjects[0].subjectName}. It is a hard subject.`

        );

    }

    // High Priority Rule

    const highPrioritySubjects =
        subjects.filter(

            subject =>
            subject.priority === "High"

        );

    highPrioritySubjects.forEach(

        (subject) => {

            aiSuggestions.push(

                ` ${subject.subjectName} is a high-priority subject.`

            );

        }

    );

    // Deadline Rule

    tasks.forEach((task) => {

        if(!task.deadline) return;

        const today =
            new Date();

        const deadline =
            new Date(task.deadline);

        const diffDays =

            (deadline - today)

            /

            (1000 * 60 * 60 * 24);

        if(diffDays <= 3 && diffDays >= 0){

            aiSuggestions.push(

                ` ${task.taskName} deadline is approaching.`

            );

        }

    });

    // Excellent Progress

    if(progress >= 80){

        aiSuggestions.push(

            " Excellent progress! Keep it up."

        );

    }

    setSuggestions(aiSuggestions);

}, [subjects, tasks]);

    return(
        <div className="suggestions-page">

            {/*SIDEBAR*/}
            <div className="sidebar">

                <h2 className="logo">
                    Smart Study Planner
                </h2>

                <ul className="menu">

                    <Link to="/Dashbord">
                        <li>Dashbord</li>
                    </Link>

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

                    <li className="active">
                        AI Suggestions
                    </li>

                    <Link to="/Calender">
                        <li>Calender</li>
                    </Link>

                    <Link to="/Settings">
                        <li>Settings</li>
                    </Link>
                </ul>
            </div>

            { /*MAINCONTENT*/ }
            <div className="main-content">

                { /*TOP SECTION*/ }

                <div className="top-section">
                    <div>
                        <h1>
                            AI Suggestions
                        </h1>
                        <p>
                            Smart recomendations generated using your study progree, tasks and subject difficulty
                        </p>
                    </div>
                </div>
                <div className="suggestions-container">

    {suggestions.map(

        (item, index) => (

            <div
                key={index}
                className="suggestion-card"
            >

                {item}

            </div>

        )

    )}

</div>
            </div>
        </div>
    );
}

export default Suggestions;