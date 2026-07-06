import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaUserGraduate
} from "react-icons/fa";

function Login(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [serverError,setServerError] = useState("");

    const handleLogin = async(e)=>{

        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setServerError("");

        let valid = true;

        if(email===""){

            setEmailError("Please enter your email.");
            valid=false;

        }

        else if(!email.includes("@")){

            setEmailError("Email must contain @ symbol.");
            valid=false;

        }

        if(password===""){

            setPasswordError("Please enter your password.");
            valid=false;

        }

        if(valid){

            try{

                const response = await fetch(

                    "http://localhost:5000/api/register/login",

                    {

                        method:"POST",

                        headers:{

                            "Content-Type":"application/json"

                        },

                        body:JSON.stringify({

                            email,
                            password

                        })

                    }

                );

                const data = await response.json();

                if(response.ok){

                    localStorage.setItem("userId",data.user._id);

                    localStorage.setItem("userName",data.user.name);

                    navigate("/Dashbord");

                }

                else{

                    setServerError(data.message);

                }

            }

            catch(error){

                console.log(error);

                setServerError("Server connection failed.");

            }

        }

    };

    return(

<div className="login-container">

<div className="login-wrapper">

<div className="login-left">

<div className="login-left-content">

<FaUserGraduate className="study-icon"/>

<h1>

Welcome Back

</h1>

<p>

Continue your smart learning journey and stay ahead with organised study planning.

</p>

<img src="./photo.webp"
     alt="student"

className="login-image"

/>

</div>

</div>

<div className="login-card">

<h1 className="login-title">

Sign In

</h1>

<p className="login-description">

Access your Smart Study Planner

</p>

<form

className="login-form"

onSubmit={handleLogin}

>

<div className="input-group">

<div className="input-box">

<FaEnvelope className="input-icon"/>

<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

</div>

{

emailError &&

<p className="error-text">

{emailError}

</p>

}

</div>

<div className="input-group">

<div className="input-box">

<FaLock className="input-icon"/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

</div>

{

passwordError &&

<p className="error-text">

{passwordError}

</p>

}

</div>

{

serverError &&

<p className="error-text">

{serverError}

</p>

}

<button

type="submit"

className="login-btn"

>

Login →

</button>

</form>

<div className="register-text">

Don't have an account?

<span

onClick={()=>navigate("/register")}

>

 Register

</span>

</div>

</div>

</div>

</div>

    );

}

export default Login;