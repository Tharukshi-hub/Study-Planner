import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    let err = {};

    if (!fullName) err.fullName = "Enter name";
    if (!email.includes("@")) err.email = "Invalid email";
    if (password.length < 6) err.password = "Min 6 characters";
    if (password !== confirmPassword) err.confirm = "Password mismatch";

    setError(err);

    if (Object.keys(err).length > 0) return;

    const res = await fetch("http://localhost:5000/api/register/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
      }),
    });

    if (res.ok) navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-left">
        <div className="glass-text">
          <h1>Study Smarter.</h1>
          <h2>Not Harder.</h2>
          <p>Join AI powered study planner system</p>
        </div>
      </div>

      <div className="register-right">
        <div className="glass-card">

          <h2>Create Account</h2>
          <p>Start your journey today</p>

          <form onSubmit={handleRegister}>

            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {error.fullName && <span>{error.fullName}</span>}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <span>{error.email}</span>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <span>{error.password}</span>}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error.confirm && <span>{error.confirm}</span>}

            <button type="submit">Create Account</button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Register;