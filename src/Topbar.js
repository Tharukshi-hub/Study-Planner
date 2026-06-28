import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    

    useEffect(() => {document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, 
    [darkMode]);

    useEffect(() => {

    const userId = localStorage.getItem("userId");

    if (!userId) return;

    // Generate notifications

    fetch(

        `http://localhost:5000/api/notification/generate/${userId}`,

        {

            method:"POST"

        }

    )

    .then(()=>{

        // Get notifications

        return fetch(

            `http://localhost:5000/api/notification/${userId}`

        );

    })

    .then(res=>res.json())

    .then(data=>{

        setNotifications(data);

    })

    .catch(err=>{

        console.log(err);

    });

}, []);

    return(

        <div className="topbar">
            <div className="topbar-icons">
                <button
                    className="icon-btn"
                    onClick={()=>
                       setDarkMode(!darkMode)
                    }

                >

                    {darkMode ? "☀️" : "🌙"}

                </button>

                <div className="notification-box">

                    <button

                        className="icon-btn"

                        onClick={()=>setShowNotifications(

                            !showNotifications

                        )}

                    >

                        🔔

                    </button>

                    {

                        notifications.length>0 &&

                        <span className="badge">

                            {notifications.length}

                        </span>

                    }

                    {

                        showNotifications &&

                        <div className="notification-dropdown">

                            <h4>

                                Notifications

                            </h4>

                            {

                                notifications.length===0 ?

                                <p>

                                    No Notifications

                                </p>

                                :

                                notifications.map((item,index)=>(

                                    <div

                                        key={index}

                                        className={`notify ${item.type}`}

                                    >

                                        {item.message}

                                    </div>

                                ))

                            }

                        </div>

                    }

                </div>

                <Link

                    to="/Settings"

                    className="profile-link"

                >

                    👤

                </Link>

            </div>

        </div>

    );

}

export default Topbar;