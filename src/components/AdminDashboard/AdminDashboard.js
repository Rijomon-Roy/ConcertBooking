import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = ({ setIsLoggedIn, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and reset auth state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin-dashboard">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin-dashboard/concerts">
              <i className="fas fa-music"></i> Concerts
            </Link>
          </li>

          <li>
            <Link to="/bookings/adminbookings">
              <i className="fas fa-ticket-alt"></i> Bookings
            </Link>
          </li>

          <li>
            <Link to="#">
              <i className="fas fa-users"></i> Users
            </Link>
          </li>

          <li>
            {/* Logout Button */}
            <button onClick={handleLogout} className="btn btn-link logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h2 className="mb-4">Dashboard</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary p-3">
              <h4>
                <i className="fas fa-music"></i> Total Concerts
              </h4>
              <p>20 Upcoming Concerts</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success p-3">
              <h4>
                <i className="fas fa-ticket-alt"></i> Total Bookings
              </h4>
              <p>500 Tickets Sold</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning p-3">
              <h4>
                <i className="fas fa-users"></i> Total Users
              </h4>
              <p>120 Registered Users</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card mt-4">
          <div className="card-header bg-dark text-white">
            <h5>
              <i className="fas fa-list"></i> Recent Bookings
            </h5>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Concert</th>
                  <th>Seats</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#00123</td>
                  <td>John Doe</td>
                  <td>Coldplay Live</td>
                  <td>3</td>
                  <td>
                    <span className="badge bg-success">Confirmed</span>
                  </td>
                </tr>
                <tr>
                  <td>#00124</td>
                  <td>Jane Smith</td>
                  <td>Ed Sheeran Tour</td>
                  <td>2</td>
                  <td>
                    <span className="badge bg-warning">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
