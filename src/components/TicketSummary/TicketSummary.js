// src/pages/TicketSummary.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./TicketSummary.css";

const TicketSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { concert, quantity, totalPrice } = location.state || {};

  if (!concert || !quantity || !totalPrice) {
    return <div className="error">Missing ticket details. Please go back.</div>;
  }

  const finalTotal = (totalPrice + 123.82).toFixed(2);

  const handleBookNow = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3004/bookingApi/api/bookings/${concert._id}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
            totalPrice,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      navigate(`/ticket/${data.bookingId}`);
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  return (
    <div className="ticket-summary-container">
      <div className="ticket-options-container right-summary">
        <h4>{concert.name}</h4>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Date & Time:</strong> {concert.date} - {concert.time}
        </p>
        <p>
          <strong>Venue:</strong> {concert.venue}
        </p>
        <hr />
        <p>
          <strong>Sub-total:</strong> ₹{totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Booking Fee:</strong> ₹123.82
        </p>
        <h4>Total Amount: ₹{finalTotal}</h4>
        <p className="login-note">
          Kindly log in using your mobile number/email ID to proceed.
        </p>

        <form onSubmit={handleBookNow}>
          <input type="hidden" name="quantity" value={quantity} />
          <input type="hidden" name="totalPrice" value={totalPrice} />
          <input type="hidden" name="concertId" value={concert._id} />
          <button type="submit" className="book-button">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketSummary;
