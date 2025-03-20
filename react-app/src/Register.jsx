import React, { useState } from "react";
import "./Register.css"; 

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userDetails = { name, surname, email, password };

    try {
      const response = await fetch("http://localhost:5222/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      const data = await response.json();
      console.log("Registration successful", data);

      
      window.location.href = "/login";
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="left-side">
        <h1>Create an Account</h1>
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Sign Up</button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="register-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
