import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Consistent import
import "./Login.css";

function Login({ setIsLoggedIn, setUsername }) {
  // Add setUsername to props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3004/authApi/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login API response:", response.data);

      if (response.data.token) {
        const token = response.data.token;
        console.log("Token:", token);
        localStorage.setItem("token", token);
        setIsLoggedIn(true);

        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        if (!decoded || !decoded.role) {
          console.error("Invalid token data:", decoded);
        }

        setUsername(decoded?.username || "");
        const role = decoded?.role || "user";

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      console.error("Login error:", err); // helpful debug
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register" className="register-link-a">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
