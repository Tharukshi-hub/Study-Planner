import React, { useState, useEffect } from "react";
import "./Timetable.css";
import { Link } from "react-router-dom";

function Timetable() {

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [generatedData, setGeneratedData] = useState([]);
    const [slots, setSlots] = useState([]);
    const[showForm, setShowForm] = useState(false);

    const getSlots = async () => {

        try{
            const userId = localStorage.getItem("userId");
            const response = await fetch(
                `http://localhost:5000/api/timetable/${userId}`
            );
            const data = await response.json();
            setSlots(data);
        }
        catch(error){
            console.log(error);
        }
    };
            const handleSaveSlot = async () => {
                if(
                    date === "" ||
                    startTime === "" ||
                    endTime === ""
                 ){
                alert("Please fill all fields");
                return;}

                if(startTime >= endTime){
                    alert("End Time must be later than Start Time");
                    return;
                }

        try{
            const userId = localStorage.getItem("userId");
            const response = await fetch("http://localhost:5000/api/timetable/add",
            {method: "POST",
             headers:{"Content-Type":"application/json"},
             body: JSON.stringify({
                    userId,
                    date,
                    startTime,
                    endTime
                })
            }
        );

            const data = await response.json();

                if(response.ok){
                    getSlots();
                    alert("Time Slot Added Successfully");

                    setDate("");
                    setStartTime("");
                    setEndTime("");
                    setShowForm(false);

                }
                else{
                    alert(data.message);
         }
    }

        catch(error){
        console.log(error);
        alert("Server Error");
     }
};
    const handleGenerate = async () => {
    const userId = localStorage.getItem("userId");
try {
   
    const subjectRes = await fetch(`http://localhost:5000/api/subject/${userId}`);
    const subjects = await subjectRes.json();

    const taskRes = await fetch(`http://localhost:5000/api/task/${userId}`);
    const tasks = await taskRes.json();

    const slotRes = await fetch(`http://localhost:5000/api/timetable/${userId}`);
    const slots = await slotRes.json();
        

    const weightMap = {
        Hard: 3,
        Medium: 2,
        Easy: 1
    };

    let totalWeight = 0;

    subjects.forEach((subject) => {totalWeight += weightMap[subject.difficulty] || 1;});
    let totalMinutes = 0;

    slots.forEach((slot) => {
        const start = new Date(`2000-01-01T${slot.startTime}`);
        const end = new Date(`2000-01-01T${slot.endTime}`);
        totalMinutes += (end - start) / 60000; });

        const subjectMinutes = subjects.map((subject) => ({...subject, allocatedMinutes: Math.round(
                ((weightMap[subject.difficulty] || 1)/ totalWeight) * totalMinutes

            )
        }));

        const generated = [];
        let subjectIndex = 0;
        let remainingMinutes = subjectMinutes[0]?.allocatedMinutes || 0;

         slots.forEach((slot) => {let currentTime = new Date(`2000-01-01T${slot.startTime}`);

        const slotEnd = new Date(`2000-01-01T${slot.endTime}`);
        while (
            currentTime < slotEnd &&
            subjectIndex < subjectMinutes.length) {

        const availableInSlot = (slotEnd - currentTime) / 60000;
        const minutesToUse = Math.min(availableInSlot, remainingMinutes);
        const endTime =new Date(currentTime.getTime() +minutesToUse *60000);
        const currentSubject = subjectMinutes[subjectIndex];
        const task = tasks.find( (t) => t.subject === currentSubject.subjectName);

            generated.push({date: slot.date,
                            startTime:
                            currentTime.toTimeString().slice(0, 5),
                            endTime:
                            endTime.toTimeString().slice(0, 5),
                            subject:
                            currentSubject.subjectName,
                            task:
                            task? task.taskName: ""
                        });

                            currentTime = endTime;
                            remainingMinutes -= minutesToUse;
                                if ( remainingMinutes <= 0) {
                                    subjectIndex++;
                                    if (subjectIndex < subjectMinutes.length) {
                                    remainingMinutes = subjectMinutes[subjectIndex].allocatedMinutes;
                                    }
                                 }
        }
    });
                 setGeneratedData(generated);
}
            catch (error) {console.log(error);}};
    useEffect(() => { getSlots();}, []);

    return (
        <div className="timetable-page">
            {/* SIDEBAR */}
            <div className="sidebar">
                <h2 className="logo"> Smart Study Planner</h2>
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
                    <li className="active">
                        Timetable
                    </li>
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
             <div className="top-section">
                 <div>
                        <h1> My Timetable </h1>
                        <p> Generate your AI study timetable using available time and task priority. </p>
                 </div>
                     <button
                            className="add-slot-btn"
                            onClick={() => setShowForm(!showForm)}>
                            + Add Available Time
                        </button>
             </div> 
                {/* GENERATE BUTTON */}
                <div className="generate-section">
                 {/* AVAILABLE TIME FORM */}
                    {showForm && (
                <div className="form-section">
                    <h3> Add Available Study Time</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                        <button className="save-btn" onClick={handleSaveSlot}>
                            Save Time Slot
                        </button>
                </div>
                    )}
                    <div className="saved-slots">
                     <h3>Saved Study Times</h3>
                        <table>
                             <thead>
                                 <tr>
                                    <th>Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                </tr>
                            </thead>
                                <tbody>
                            {slots.map((slot) => (
                                <tr key={slot._id}>
                                    <td>{slot.date}</td>
                                    <td>{slot.startTime}</td>
                                    <td>{slot.endTime}</td>
                                </tr>
                            ))}
                       </tbody>
                      </table>
                    </div>
                        <button className="generate-btn" onClick={handleGenerate}>
                            Generate Timetable
                        </button>
                </div>
                {/* TIMETABLE */}
                <div className="table-section">
                    <h3> Generated Study Timetable </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Subject</th>
                                <th>Task</th>
                            </tr>
                         </thead>
                        <tbody>
                            {generatedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.startTime} - {item.endTime}</td>
                                    <td> {item.subject}</td>
                                    <td>{item.task}</td>
                                </tr>
                            ))}
                        </tbody>                                                     
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Timetable;