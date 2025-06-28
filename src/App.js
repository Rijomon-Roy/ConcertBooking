import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Add this import
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import Home from "./components/Home/Home";
import ConcertDetails from "./components/ConcertDetails/ConcertDetails";
import TicketSummary from "./components/TicketSummary/TicketSummary";
import TicketPage from "./components/TicketPage/TicketPage";
import MyBookings from "./components/MyBookings/MyBookings";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = React.useState("");

  // Get username from token when logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token); // Use jwtDecode here
          setUsername(decoded?.username || "");
        } catch (err) {
          console.error("Error decoding token:", err);
        }
      }
    } else {
      setUsername("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          username={username}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/concerts/:id"
              element={
                <ConcertDetails
                  isAuthenticated={isLoggedIn} // Use isLoggedIn for isAuthenticated
                  username={username}
                />
              }
            />

            <Route path="/concerts/:id" element={<ConcertDetails />} />
            <Route path="/bookings/payment/:id" element={<TicketSummary />} />
            <Route path="/ticket/:bookingId" element={<TicketPage />} />
            <Route path="/bookings/mybookings" element={<MyBookings />} />
          </Routes>
        </main>
        <footer className="footer">
          © 2025 Concert Booking. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
