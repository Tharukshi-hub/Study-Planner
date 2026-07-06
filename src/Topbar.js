import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Topbar() {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        fetch(`http://localhost:5000/api/notification/generate/${userId}`, {
            method: "POST",
        })
            .then(() => fetch(`http://localhost:5000/api/notification/${userId}`))
            .then((res) => res.json())
            .then((data) => {
                setNotifications(data);
                setNotificationCount(data.length);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="topbar-glass">
            <div className="topbar-inner">

                {/* Dark mode */}
                <button
                    className="glass-btn"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>

                {/* Notifications */}
                <div className="notification-wrapper">
                    <button
                        className="glass-btn"
                        onClick={async () => {

                            setShowNotifications(!showNotifications);

                            const userId = localStorage.getItem("userId");

                            await fetch(
                                `http://localhost:5000/api/notification/read/${userId}`,
                                {
                                    method: "PUT"
                                }
                            );

                            setNotificationCount(0);

                        }}
                    >
                        <NotificationsIcon />
                    </button>
                    {notificationCount > 0 && (
                        <span className="badge-glass">
                            {notificationCount}
                        </span>
                    )}

                    {showNotifications && (
                        <div className="glass-dropdown">
                            <h4>Notifications</h4>

                            {notifications.length === 0 ? (
                                <p>No Notifications</p>
                            ) : (
                                notifications.map((item, index) => (
                                    <div
                                        key={index}
                                        className="notify-glass"
                                    >
                                        {item.message}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Profile */}
                <Link to="/Settings" className="profile-glass">
                    <AccountCircleIcon />
                </Link>

            </div>
        </div>
    );
}

export default Topbar;