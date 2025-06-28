// src/components/Layout/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Updated import path

const Layout = ({ isLoggedIn, handleLogout }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 Concert Booking. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
