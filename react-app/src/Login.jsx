import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
  
      const token = data.accessToken;
      localStorage.setItem("accessToken", token);
  
      // Decode the token to extract userId
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      // Instead of `decodedToken.userId`, we get it from the claim nameidentifier
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      console.log("User ID from Token:", userId);
  
      
      localStorage.setItem("userId", userId);
  
      
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        throw new Error("Token expired. Please login again.");
      }
  
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User Role:", role);
  
      console.log("Navigating to:", role === "SuperAdmin" ? "/sidebar" : "/");
      navigate(role === "SuperAdmin" ? "/sidebar" : "/");
  
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





/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
  
      // Store token and userId in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);  // Store userId
  
      // Decode token
      const token = data.accessToken;
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      // Get role from decoded token
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User Role:", role);
  
      // Optional: Check token expiration before redirecting
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        throw new Error("Token expired. Please login again.");
      }
  
      // Navigate based on role
      console.log("Navigating to:", role === "SuperAdmin" ? "/sidebar" : "/");
      navigate(role === "SuperAdmin" ? "/sidebar" : "/");
  
    } catch (error) {
      setErrorMessage(error.message);  // Show error message
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

export default Login;*/





















/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode"; 
import "./Login.css";

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();  

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
  
     
      const token = localStorage.getItem("accessToken");
      console.log("Token from localStorage:", token);  
  
      const decodedToken = jwtDecode(token);  
      console.log("Decoded Token:", decodedToken);  
  
      
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User Role:", role); 
  
      
      console.log("Navigating to:", role === "SuperAdmin" ? "/sidebar" : "/");
      
      
      navigate(role === "SuperAdmin" ? "/sidebar" : "/");
  
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

export default Login;*/