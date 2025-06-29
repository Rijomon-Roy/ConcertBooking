import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3004/bookingApi/api/bookings/admin/all"
      );

      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎟️ All Concert Bookings</h2>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>Concert</th>
                <th>Tickets</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.userName}</td>
                    <td>{booking.concertName}</td>
                    <td>{booking.quantity}</td>
                    <td>
                      <span className="badge bg-success">Confirmed</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
