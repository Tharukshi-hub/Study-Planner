import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";

function Home(){

    return(

        <div className="home-container">
            <div className="floating circle1"></div>
            <div className="floating circle2"></div>
            <div className="floating circle3"></div>

            <div className="overlay"></div>

            <div className="home-card">

                <h1 className="title">
                    📚 Smart Study Planner
                </h1>

                <p className="description">
                    Organize your studies efficiently with smart AI-powered planning
                </p>

                <div className="features">
                    <span className="badge">🗓️ Smart Timetable</span>
                    <span className="badge">🤖 AI Recommendations</span>
                    <span className="badge">🚀 Progress Tracking</span>
                </div>

                <div className="buttons">

                    <Link to="/register">

                        <button className="btn-register">

                            <span className="button-title">
                                New User?
                            </span>

                            <span className="button-subtitle">
                                Register Here
                            </span>

                        </button>

                    </Link>

                    <Link to="/login">

                        <button className="btn-login">

                            <span className="button-title">
                                Already Registered?
                            </span>

                            <span className="button-subtitle">
                                Login Here
                            </span>

                        </button>

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;