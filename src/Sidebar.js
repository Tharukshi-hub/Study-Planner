import { Link } from "react-router-dom";
import DashbordIcon from "@mui/icons-material/Dashboard";
import SubjectsIcon from "@mui/icons-material/School";



function Sidebar() {
    return(
<div className="dashboard-container">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2 className="logo">
                    Smart Study Planner
                </h2>

                <ul className="menu">

                    <li className="active">
                        <DashbordIcon />
                        Dashboard
                    </li>

                    <Link to="/Subject">
                        <li>
                            <SubjectsIcon />
                            Subjects
                        </li>
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

                    <Link to="/Settings">
                        <li>Settings</li>
                    </Link>

                </ul>

            </div>
        </div>
    );
}