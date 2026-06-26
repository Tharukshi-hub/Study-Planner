import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();

    // INPUT STATES

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ERROR STATES

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");

    // LOGIN FUNCTION

    const handleLogin = async (e) => {

        e.preventDefault();

        // CLEAR OLD ERRORS

        setEmailError("");
        setPasswordError("");
        setServerError("");

        let valid = true;

        // EMAIL VALIDATION

        if(email === ""){

            setEmailError("Please enter your email.");
            valid = false;

        }

        else if(!email.includes("@")){

            setEmailError("Email must contain @ symbol.");
            valid = false;

        }

        // PASSWORD VALIDATION

        if(password === ""){

            setPasswordError("Please enter your password.");
            valid = false;

        }

        // SEND DATA TO BACKEND

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

                            email: email,
                            password: password

                        })

                    }

                );

                const data = await response.json();

                // SUCCESS

                if(response.ok){

                    navigate("/Dashbord");
                     localStorage.setItem("userId", data.user._id );
                     localStorage.setItem("userName", data.user.name);

                }

                // BACKEND ERRORS

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

            <div className="login-card">

                <h1 className="login-title">
                    Welcome Back
                </h1>

                <p className="login-description">
                    Login to continue your smart study journey
                </p>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    {/* EMAIL */}

                    <div className="input-group">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        {
                            emailError &&
                            <p className="error-text">
                                {emailError}
                            </p>
                        }

                    </div>

                    {/* PASSWORD */}

                    <div className="input-group">

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        {
                            passwordError &&
                            <p className="error-text">
                                {passwordError}
                            </p>
                        }

                    </div>

                    {/* SERVER ERROR */}

                    {
                        serverError &&
                        <p className="error-text">
                            {serverError}
                        </p>
                    }

                    <button type="submit">

                        Login

                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;