import React, { useEffect, useState } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";


function Settings() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

    getUser();

}, []);
 
const getUser = async () => {

    try{

        const userId =
        localStorage.getItem(
            "userId"
        );

        const response =
        await fetch(

            `http://localhost:5000/api/register/user/${userId}`

        );

        const data =
        await response.json();

        setName(data.name);
        setEmail(data.email);

    }

    catch(error){

        console.log(error);

    }

};
const updateProfile = async () => {

    try{

        const userId =
        localStorage.getItem(
            "userId"
        );

        await fetch(

            `http://localhost:5000/api/register/update-profile/${userId}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    name,
                    email

                })

            }

        );

        alert(
            "Profile Updated"
        );

    }

    catch(error){

        console.log(error);

    }

};
const updatePassword = async () => {

    if(
        newPassword !==
        confirmPassword
    ){

        alert(
            "Passwords do not match"
        );

        return;

    }

    try{

        const userId =
        localStorage.getItem(
            "userId"
        );

        const response =
        await fetch(

            `http://localhost:5000/api/register/update-password/${userId}`,  

            {

                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    currentPassword,
                    newPassword

                })

            }

        );

        const data =
        await response.json();

        alert(
            data.message
        );

    }

    catch(error){

        console.log(error);

    }

};

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
        });

     useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
        }, [darkMode]);

     return (
        <div className="settings-page">

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

                    <Link to="/Calender">
                        <li>Calender</li>
                    </Link>

                    <li className="active">
                        Settings
                    </li>

                </ul>
            </div>

            {/* MAIN CONTENT */}
            <div className="main-content">
                <div className="top-section">
                    <h1>Settings</h1>
                    <p>Manage your account and study preferences.</p>
                </div>

                <div className="settings-container">
                    {/* PROFILE SETTINGS */}
                    <div className="settings-card">
                        <h2>Profile Settings</h2>

                        <input
                            type="text"
                            value={name}
                            onChange={(e)=>
                            setName(e.target.value)}
                            />

                            <input
                            type="email"
                            value={email}
                            onChange={(e)=>
                            setEmail(e.target.value)}
                         />
                        <button onClick={updateProfile}>
                            Save Profile
                        </button>
                    </div>

                    {/* PASSWORD SETTINGS */}
                    
                    <div className="settings-card">
                        <h2>Password Settings</h2>

                        <input
    type="password"
    placeholder="Current password"
    value={currentPassword}
    onChange={(e) =>
        setCurrentPassword(e.target.value)
    }
/>

<input
    type="password"
    placeholder="New password"
    value={newPassword}
    onChange={(e) =>
        setNewPassword(e.target.value)
    }
/>

<input
    type="password"
    placeholder="Confirm password"
    value={confirmPassword}
    onChange={(e) =>
        setConfirmPassword(e.target.value)
    }
/>

                        <button onClick={updatePassword}>
                            Update Password
                        </button>
                    </div>
                    {/* APPEARANCE */}
                    <div className="settings-card">
                        <h2>Appearance</h2>

                        <div className="toggle-row">
                            <span>Dark Mode</span>

                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <p className="small-text">
                            Turn dark mode on or off for better viewing comfort.
                        </p>
                    </div>
                    {/* ACCOUNT */}
        <div className="settings-card">
     <h2>Account</h2>

        <p className="small-text">
        Sign out from your Smart Study Planner account.
        </p>

        <button
        onClick={() => {

            localStorage.clear();

            window.location.href = "/";

        }}
     >
        Logout
        </button>

        </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;