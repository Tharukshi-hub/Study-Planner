import React, { useState, useEffect } from "react";
import "./Calender.css";
import { Link } from "react-router-dom";

function Calender() {

const [tasks, setTasks] = useState([]);
const [currentDate, setCurrentDate] = useState(new Date());

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

useEffect(() => {

    getTasks();

}, []);

const prevMonth = () => {

    setCurrentDate(

        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        )

    );

};

const nextMonth = () => {

    setCurrentDate(

        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        )

    );

};

const year =
    currentDate.getFullYear();

const month =
    currentDate.getMonth();

const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();

const daysInMonth =
    new Date(
        year,
        month + 1,
        0
    ).getDate();

const monthName =
    currentDate.toLocaleString(
        "default",
        {
            month: "long"
        }
    );

const calendarDays = [];

for (
    let i = 0;
    i < firstDay;
    i++
) {

    calendarDays.push(null);

}

for (
    let day = 1;
    day <= daysInMonth;
    day++
) {

    calendarDays.push(day);

}

return (

    <div className="calender-page">

        {/* SIDEBAR */}

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

                <Link to="/Suggestions">
                    <li>AI Suggestions</li>
                </Link>

                <li className="active">
                    Calender
                </li>

                <Link to="/Settings">
                    <li>Settings</li>
                </Link>

            </ul>

        </div>

        {/* MAIN CONTENT */}

        <div className="main-content">

            <div className="top-section">

                <div>

                    <h1>
                        Study Calendar
                    </h1>

                    <p>
                        View all deadlines and study activities.
                    </p>

                </div>

                <div className="month-navigation">

                    <button
                        onClick={prevMonth}
                    >
                        {"<"}
                    </button>

                    <h2>

                        {monthName}
                        {" "}
                        {year}

                    </h2>

                    <button
                        onClick={nextMonth}
                    >
                        {">"}
                    </button>

                </div>

            </div>

            {/* CALENDAR */}

            <div className="calendar-container">

                <div className="calendar-header">

                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>

                </div>

                <div className="calendar-grid">

                    {

                        calendarDays.map(

                            (day, index) => {

                                if (
                                    day === null
                                ) {

                                    return (

                                        <div
                                            key={index}
                                            className="day empty"
                                        />

                                    );

                                }

                                const taskForDay =
                                    tasks.filter(

                                        task => {

                                            const taskDate =
                                                new Date(
                                                    task.deadline
                                                );

                                            return (

                                                taskDate.getDate() === day &&
                                                taskDate.getMonth() === month &&
                                                taskDate.getFullYear() === year
                                            );

                                        }

                                    );

                                return (

                                    <div
                                        key={index}
                                        className="day"
                                    >

                                        <span>
                                            {day}
                                        </span>

                                        {

                                            taskForDay.map(

                                                (
                                                    task,
                                                    i
                                                ) => (

                                                   <p
    key={i}
    className={

        task.status === "Completed"

        ?

        "task-completed"

        :

        (
            new Date(task.deadline)
            <
            new Date()

            ?

            "task-overdue"

            :

            "task-pending"
        )

    }
>

    {task.taskName}

</p>

                                                )

                                            )

                                        }

                                    </div>

                                );

                            }

                        )

                    }

                </div>

            </div>

        </div>

    </div>

);


}

export default Calender;
