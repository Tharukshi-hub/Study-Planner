import React, { useState, useEffect } from "react";
import "./Task.css";
import Sidebar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Task() {

    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

    getTasks();

}, []);
    const [taskName, setTaskName] = useState("");
    const [subject, setSubject] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");
    const [pdfFile, setpdfFile] = useState(null);

    const handleAddTask = async () => {

    if (
        taskName === "" ||
        subject === "" ||
        deadline === "" ||
        status === "" ||
        !pdfFile
    ) {
        return;
    }

    try {

        if (editingId) {

    const formData = new FormData();

    formData.append("taskName", taskName);
    formData.append("subject", subject);
    formData.append("deadline", deadline);
    formData.append("status", status);

    if (pdfFile) {
        formData.append("pdfFile", pdfFile);
    }

    await fetch(

        `http://localhost:5000/api/task/update/${editingId}`,

        {
            method: "PUT",
            body: formData
        }

    );

}

         else {

    const userId = localStorage.getItem("userId");
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("taskName", taskName);
    formData.append("subject", subject);
    formData.append("deadline", deadline);
    formData.append("status", status);
    formData.append("pdfFile", pdfFile);

    await fetch(
        "http://localhost:5000/api/task/add",
        {
            method: "POST",
            body: formData
        }
    );

}
        getTasks();
        setTaskName("");
        setSubject("");
        setDeadline("");
        setStatus("");
        setEditingId(null);
        setShowForm(false);
    }
    catch (error) {console.log(error);}
};
const handleEdit = (task) => {
      setEditingId(task._id);
      setTaskName(task.taskName);
      setSubject(task.subject);
      setDeadline(task.deadline);
      setStatus(task.status);
      setpdfFile(null);
      setShowForm(true);
};
const handleDelete = async (id) => {

    try {

        await fetch(

            `http://localhost:5000/api/task/delete/${id}`,

            {
                method: "DELETE"
            }

        );

        getTasks();

    }

    catch (error) {

        console.log(error);

    }

};

    return (

        <div className="task-page">
             <Sidebar />
            {/* MAIN CONTENT */}

            <div className="main-content">

                {/* TOP SECTION */}

                <div className="top-section">
                    <div>
                        <h1> My Tasks </h1>
                        <p> Manage your study tasks and deadlines. </p>
                    </div>
                    <button
        className="add-task-btn"
        onClick={() => {

            setShowForm(!showForm);
            setEditingId(null);
            setTaskName("");
            setSubject("");
            setDeadline("");
            setStatus("");
            setpdfFile(null);

        }}
    >
        + Add Task
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
                                    <th>Task Name</th>
                                    <th>Subject</th>
                                    <th>Note</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="empty-message">
                                            No tasks added yet
                                        </td>
                                    </tr>
                                ) : (

                                    tasks.map((task, index) => (

                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td> {task.taskName} </td>
                                            <td> {task.subject} </td>
                                            <td> {task.pdfFile ? (
                                            <a href={`http://localhost:5000/uploads/${task.pdfFile}`}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="view-note-btn"> View PDF
                                            </a>
                                            ) : (
                                            <span>No PDF</span>
                                            )}</td>
                                            <td> {task.deadline} </td>
                                            <td>
                                                <span
                                                    className={`status ${task.status}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="edit-btn"
                                                        onClick={() => handleEdit(task)}> 
                                                        <EditIcon />
                                                </button>

                                                <button className="delete-btn"
                                                        onClick={() => handleDelete(task._id)}>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* FORM */}
                    {showForm && ( 
                    <div className="form-section">
                        <h3>Add New Task</h3>
                        <input
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) =>
                                setTaskName(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                        />
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)
                            }
                        />
                        <input type="file"
                               accept=".pdf"
                               onChange={(e) =>
                                setpdfFile(e.target.files[0])
                               }
                        />
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >
                            <option value="">  Select Status </option>
                            <option value="Pending"> Pending </option>
                            <option value="Completed"> Completed </option>
                            <option value="Overdue"> Overdue </option>
                        </select>
                        <button
                            className="save-btn"
                            onClick={handleAddTask} >Save Task
                            {editingId ? "Update Task" : "Save Task"}
                        </button>
                </div>
            )}
         </div>
        </div>
     </div>
      );
     }

     export default Task;