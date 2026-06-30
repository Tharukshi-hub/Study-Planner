import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon  from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DescriptionIcon from "@mui/icons-material/Description";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Home() {
  return (
    <div className="home-container">

      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      <div className="hero">

        {/* LEFT SIDE */}

        <div className="hero-left">

          <span className="top-badge">
            <AutoAwesomeIcon />
             AI Powered Study Planner 
          </span>

          <h1>
            Study <span>Smarter</span>,
            <br />
            Not Harder.
          </h1>

          <p>
            Organize your subjects, upload notes, manage tasks,
            generate smart timetables and track your progress
            in one beautiful platform.
          </p>

          <div className="feature-list">

            <div><CalendarMonthIcon />Smart Timetable</div>

            <div><LightbulbIcon />AI Suggestions</div>
            <div><TrendingUpIcon />Progress Tracking</div>
            <div><DescriptionIcon />PDF Notes</div>
            <div><NotificationsActiveIcon />Notifications</div>
            <div><DarkModeIcon />Dark Mode</div>

          </div>

          <div className="buttons">

            <Link to="/register">
              <button className="btn-register">
                Get Started →
              </button>
            </Link>

            <Link to="/login">
              <button className="btn-login">
                Sign In
              </button>
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="hero-right">

          <div className="dashboard-card">
               <img src="./login.jpg"
                    alt="image">         
                </img>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;