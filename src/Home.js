import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

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
            ✨ AI Powered Study Planner
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

            <div>📅 Smart Timetable</div>

            <div>🤖 AI Suggestions</div>

            <div>📈 Progress Tracking</div>

            <div>📄 PDF Notes</div>

            <div>🔔 Notifications</div>

            <div>🌙 Dark Mode</div>

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

            <div className="dashboard-header">

              <div className="dot red"></div>

              <div className="dot yellow"></div>

              <div className="dot green"></div>

            </div>

            <h3>Today's Progress</h3>

            <div className="progress-box">

              <div className="progress-circle">

                78%

              </div>

              <div>

                <h4>Study Goal</h4>

                <p>6 / 8 Hours Completed</p>

              </div>

            </div>

            <div className="mini-card blue">

              📚 Java Programming

              <span>8:00 AM</span>

            </div>

            <div className="mini-card green">

              📄 OOP Assignment

              <span>2:00 PM</span>

            </div>

            <div className="mini-card purple">

              🤖 AI Recommendation

              <span>Review DBMS</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;