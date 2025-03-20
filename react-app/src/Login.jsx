import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userCredentials = { email, password };

    try {
      setLoading(true); 


      const response = await fetch("http://localhost:5222/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials.");
      }

      const data = await response.json();
      console.log("Login successful", data);


      localStorage.setItem("accessToken", data.accessToken);
      
      window.location.href = "/sidebar"; 

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h1>Welcome</h1>
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="login-link">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
