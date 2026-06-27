import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashbord from "./Dashbord";
import Subject from "./Subject";
import Task from "./Task";
import Timetable from "./Timetable";
import Progress from "./Progress";
import Suggestions from "./Suggestions";
import Calender from "./Calender";
import Settings from "./Settings";

function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashbord"
                    element={<Dashbord />}
                />

                <Route 
                    path="/subject"
                    element={<Subject />}
                />

                <Route
                    path="/task"
                    element={<Task />}
                />

                <Route 
                    path="timetable"
                    element={<Timetable />}
                />

                <Route
                    path="/progress"
                    element={<Progress/>}
                />

                <Route 
                    path="/suggestions"
                    element={<Suggestions/>}
                />

                <Route 
                    path="/calender"
                    element={<Calender/>}
                />

                <Route
                    path="/settings"
                    element={<Settings/>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;