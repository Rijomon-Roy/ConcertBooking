// src/components/Layout/Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();
  const hideLayoutForRoutes = ["/admin-dashboard"];

  const shouldHideLayout = hideLayoutForRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <main>
        <Outlet />
      </main>
      {!shouldHideLayout && (
        <footer>
          <p>&copy; 2025 Concert Booking. All rights reserved.</p>
        </footer>
      )}
    </>
  );
};

export default Layout;
