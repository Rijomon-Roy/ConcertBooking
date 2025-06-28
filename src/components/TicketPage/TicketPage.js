// src/pages/TicketPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";
import "./TicketPage.css"; // you’ll create this next

const TicketPage = () => {
  const { bookingId } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/bookingApi/api/bookings/ticket/${bookingId}`)
      .then((res) => setTicketData(res.data))
      .catch((err) => console.error("Error fetching ticket data:", err));
  }, [bookingId]);

  const downloadTicket = () => {
    const element = document.getElementById("ticket");
    const btn = document.querySelector(".download-btn");
    btn.style.display = "none";

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "Concert-Ticket.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save()
      .then(() => {
        btn.style.display = "block";
      });
  };

  if (!ticketData) return <p>Loading...</p>;

  const { concert, user, quantity, totalPrice, bookingId: id } = ticketData;

  return (
    <div className="ticket-wrapper-container">
      <div className="top-bar">
        <button className="download-btn" onClick={downloadTicket}>
          Download Ticket
        </button>
      </div>
      <div className="ticket-wrapper" id="ticket">
        <div className="ticket-header">
          <h2>{concert.name}</h2>
          <div>
            {concert.date} at {concert.time}
          </div>
        </div>

        <div className="ticket-section">
          <div className="left-info">
            <div className="info-block">
              <span>Venue</span>
              <p>{concert.venue}</p>
            </div>
            <div className="info-block">
              <span>Ticket Holder</span>
              <p>{user.name}</p>
            </div>
            <div className="info-block">
              <span>Quantity</span>
              <p>{quantity} Ticket(s)</p>
            </div>
          </div>

          <div className="right-info">
            <div className="info-block">
              <span>Booking ID</span>
              <p>#{id.slice(-6).toUpperCase()}</p>
            </div>
            <div className="info-block">
              <span>Total Price</span>
              <p>₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="info-block">
              <span>Booking Fee</span>
              <p>₹123.82</p>
            </div>
            <div className="info-block">
              <span>Grand Total</span>
              <p>
                <strong>₹{(totalPrice + 123.82).toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="barcode">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`}
            alt="QR Code"
          />
        </div>

        <div className="footer-note">
          Please present this ticket at the entrance. Enjoy the show!
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
