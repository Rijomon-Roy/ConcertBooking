// src/components/Navbar/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <header>
      <h1>
        <Link to="/">Event Arena</Link>
      </h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Events</Link>
        {isLoggedIn && <Link to="/bookings/mybookings">My Bookings</Link>}

        {isLoggedIn ? (
          <div className="dropdown">
            <button className="dropbtn">User</button>
            <div className="dropdown-content">
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
