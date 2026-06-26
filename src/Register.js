import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    // INPUT STATES

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ERROR STATES

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // REGISTER FUNCTION

    const handleRegister = async (e) => {

        e.preventDefault();

        // CLEAR OLD ERRORS

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        let valid = true;

        // FULL NAME VALIDATION

        if(fullName === ""){

            setNameError("Please enter your full name.");
            valid = false;

        }

        // EMAIL VALIDATION

        if(email === ""){

            setEmailError("Please enter your email address.");
            valid = false;

        }

        else if(!email.includes("@")){

            setEmailError("Email must contain @ symbol.");
            valid = false;

        }

        // PASSWORD VALIDATION

        if(password === ""){

            setPasswordError("Please enter a password.");
            valid = false;

        }

        // CONFIRM PASSWORD VALIDATION

        if(confirmPassword === ""){

            setConfirmPasswordError("Please confirm your password.");
            valid = false;

        }

        else if(password !== confirmPassword){

            setConfirmPasswordError("Passwords do not match.");
            valid = false;

        }

        // SEND DATA TO BACKEND

        if(valid){

            try{

                const response = await fetch(
                    "http://localhost:5000/api/register/register",
                    {

                        method: "POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body: JSON.stringify({

                            name: fullName,
                            email: email,
                            password: password

                        })

                    }
                );

                const data = await response.json();

                // SUCCESS

                if(response.ok){

                    navigate("/login");

                }

                // BACKEND ERRORS

                else{

                    setEmailError(data.message);

                }

            }

            catch(error){

                console.log(error);

                setEmailError("Server connection failed.");

            }

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>
                    Create Account
                </h1>

                <p className="subtitle">
                    Start planning your studies smarter
                </p>

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    {/* FULL NAME */}

                    <div className="input-group">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                        {
                            nameError &&
                            <p className="error-text">
                                {nameError}
                            </p>
                        }

                    </div>

                    {/* EMAIL */}

                    <div className="input-group">

                        <input
                            type="email"
                            placeholder="Email Address"
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
                            placeholder="Password"
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

                    {/* CONFIRM PASSWORD */}

                    <div className="input-group">

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        {
                            confirmPasswordError &&
                            <p className="error-text">
                                {confirmPasswordError}
                            </p>
                        }

                    </div>

                    <button type="submit">

                        Create Account

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;