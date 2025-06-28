// src/components/MyBooking/MyBookings.js
import React, { useEffect, useState } from "react";
import "./MyBookings.css";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:3004/bookingApi/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <p className="no-bookings">You haven't booked any concerts yet 🎶</p>
    );
  }

  return (
    <div className="container">
      <h1>My Bookings</h1>

      {bookings.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <div className="booking-header">
            <h2 className="concert-title">{booking.concertName}</h2>
            <Link className="ticket-btn" to={`/ticket/${booking._id}`}>
              View Ticket
            </Link>
          </div>
          <div className="booking-details">
            <div className="detail-item">
              <strong>Date:</strong> {booking.date}
            </div>
            <div className="detail-item">
              <strong>Time:</strong> {booking.time}
            </div>
            <div className="detail-item">
              <strong>Venue:</strong> {booking.venue}
            </div>
            <div className="detail-item">
              <strong>Quantity:</strong> {booking.quantity}
            </div>
            <div className="detail-item">
              <strong>Total:</strong> ₹{booking.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
