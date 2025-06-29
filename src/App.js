import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "./components/Layout/Layout";
import Login from "./components/login/Login";
import Home from "./components/Home/Home";
import ConcertDetails from "./components/ConcertDetails/ConcertDetails";
import TicketSummary from "./components/TicketSummary/TicketSummary";
import TicketPage from "./components/TicketPage/TicketPage";
import MyBookings from "./components/MyBookings/MyBookings";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AddConcert from "./components/AddConcert/AddConcert";
import EditConcert from "./components/EditConcert/EditConcert";
import ConcertList from "./components/ConcertList/ConcertList";
import AdminBookings from "./components/AdminBookings/AdminBookings";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
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
      <Routes>
        {/* Layout Routes with Navbar/Footer */}
        <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          }
        >
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            }
          />
          <Route index element={<Home />} />
          <Route
            path="concerts/:id"
            element={
              <ConcertDetails
                isAuthenticated={isLoggedIn}
                username={username}
              />
            }
          />
          <Route path="bookings/payment/:id" element={<TicketSummary />} />
          <Route path="ticket/:bookingId" element={<TicketPage />} />
          <Route path="bookings/mybookings" element={<MyBookings />} />
        </Route>

        {/* Admin route outside Layout */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboard
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />

        <Route path="/admin-dashboard/concerts" element={<ConcertList />} />
        <Route path="/admin-dashboard/concerts/add" element={<AddConcert />} />
        <Route path="/concerts/edit/:id" element={<EditConcert />} />
        <Route path="/bookings/adminbookings" element={<AdminBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
