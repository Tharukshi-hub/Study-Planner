import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubjectIcon from "@mui/icons-material/Subject";
import TaskIcon from "@mui/icons-material/Task";
import CalendarMonthIcon  from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/Dashbord", icon: <DashboardIcon /> },
        { name: "Subjects", path: "/subject", icon: <SubjectIcon /> },
        { name: "Task", path: "/Task", icon: <TaskIcon /> },
        { name: "Timetable", path: "/timetable", icon: <CalendarMonthIcon/> },
        { name: "Progress", path: "/progress", icon: <TrendingUpIcon />},
        { name: "AI Suggestions", path: "/suggestions", icon: <LightbulbIcon /> },
        { name: "Calender", path: "/calender", icon: <EventIcon /> },
        { name: "Settings", path: "/settings", icon: <SettingsIcon /> }
    ];

    return (
        <div className="sidebar">
            <h2 className="logo">Smart Study Planner</h2>

            <ul className="menu">
                {menuItems.map((item, index) => (
                    <Link to={item.path} key={index} className="link">
                        <li className={location.pathname === item.path ? "active" : ""}>
                            {item.icon}
                            <span>{item.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;