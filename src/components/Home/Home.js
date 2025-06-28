import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home({ isLoggedIn }) {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchConcerts = async () => {
      try {
        const response = await axios.get("http://localhost:3004/concertApi", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setConcerts(response.data.concerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>🎵 Stream It? Nah. Live It</h1>
          <p>Concerts that slap. Memories that stick. Book the show</p>
          <Link to="/events" className="btn-primary">
            Explore Events
          </Link>
        </div>
      </section>

      <section className="concerts-section">
        <h2>Upcoming Concerts</h2>
        <div className="concerts-grid">
          {concerts.map((concert) => (
            <div className="concert-card" key={concert._id}>
              <Link
                to={`/concerts/${concert._id}`}
                className="concert-image-link"
              >
                <img
                  src={`http://localhost:3004/uploads/${concert.image}`}
                  alt={concert.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </Link>
              <div className="concert-info">
                <h3>
                  <Link to={`/concerts/${concert._id}`}>{concert.name}</Link>
                </h3>
                <div className="concert-detail">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{concert.venue}</span>
                </div>
                <div className="concert-detail">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{concert.date}</span>
                </div>
                <div className="concert-detail">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{concert.time}</span>
                </div>
                <div className="concert-meta">
                  <div className="meta-item">
                    <span className="meta-label">Seats</span>
                    <span className="meta-value">{concert.availableSeats}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Price</span>
                    <span className="meta-value price">₹{concert.price}</span>
                  </div>
                </div>
                <Link to={`/concerts/${concert._id}`} className="book-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Concert Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
