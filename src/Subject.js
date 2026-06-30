import React, { useState, useEffect } from "react";
import "./Subject.css";
import Sidebar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Subject() {
    const [subjects, setSubjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const getSubjects = async () => {

    try {

        const userId = localStorage.getItem("userId");
        const response = await fetch( `http://localhost:5000/api/subject/${userId}` );
        const data = await response.json();
        setSubjects(data);}

    catch (error) { console.log(error);}
};
useEffect(() => { getSubjects();}, []);

    const [subjectName, setSubjectName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");

    const handleAddSubject = async () => {

    try {if (
            subjectName === "" ||
            difficulty === "" ||
            priority === ""
        ) {
            alert("Please fill all fields");
            return;
        }
        if (editingId) {await fetch(`http://localhost:5000/api/subject/update/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        subjectName,
                        difficulty,
                        priority
                    })
                }
            );
        }
        else {
            const userId = localStorage.getItem("userId");
            await fetch("http://localhost:5000/api/subject/add",

                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                     body: JSON.stringify({
                        userId,
                        subjectName,
                        difficulty,
                        priority
                    })
                }
            );
        }
        getSubjects();
        setSubjectName("");
        setDifficulty("");
        setPriority("");
        setEditingId(null);
        setShowForm(false);
    }

    catch (error) { console.log(error);}
};
const handleDelete = async (id) => {try {
        await fetch(`http://localhost:5000/api/subject/delete/${id}`,
            { method: "DELETE" });
        getSubjects();
    }
    catch(error){
        console.log(error);}
};
const handleEdit = (subject) => {
    setEditingId(subject._id);
    setSubjectName(subject.subjectName);
    setDifficulty(subject.difficulty);
    setPriority(subject.priority);
    setShowForm(true);
};

    return (
        <div className="subjects-page">
            <Sidebar />
            {/* MAIN CONTENT */}
            <div className="main-content">
                {/* TOP */}
                <div className="top-section">             
                    <div>
                        <h1> My Subjects</h1>
                        <p>
                            Manage your subjects and set
                            difficulty levels for better planning.
                        </p>
                    </div>
                     <button className="add-subject-btn" onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setSubjectName("");
                            setDifficulty("");
                            setPriority(""); }}>
                                 + Add Subject
                    </button>
                </div>
                {/* CONTENT */}
                <div className="content-section">
                    {/* TABLE */}
                    <div className="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Subject Name</th>
                                    <th>Difficulty</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{subject.subjectName}</td>
                                        <td>
                                            <span
                                                className={`difficulty ${subject.difficulty}`}>
                                                {subject.difficulty}
                                            </span>
                                        </td>
                                        <td>{subject.priority}</td>
                                        <td>
                                            <button className="edit-btn" 
                                                    onClick={() => handleEdit(subject)}>
                                                <EditIcon />
                                            </button>
                                            <button className="delete-btn"  
                                                    onClick={() => handleDelete(subject._id)}>
                                                 <DeleteIcon/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* FORM */}
                    { showForm &&( 
                    <div className="form-section">
                        <h3>Add New Subject</h3>
                        <input
                            type="text"
                            placeholder="Enter subject name"
                            value={subjectName}
                            onChange={(e) =>
                                setSubjectName(e.target.value)
                            } />
                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }>
                            <option value="">
                                Select Difficulty
                            </option>
                            <option value="Easy">
                                Easy
                            </option>
                            <option value="Medium">
                                Medium
                            </option>
                            <option value="Hard">
                                Hard
                            </option>
                        </select>
                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            } >
                            <option value="">
                                Select Priority
                            </option>
                            <option value="Low">
                                Low
                            </option>
                            <option value="Medium">
                                Medium
                            </option>
                            <option value="High">
                                High
                            </option>
                        </select>
                        <button
                            className="save-btn"
                            onClick={handleAddSubject} >
                            Save Subject
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Subject;