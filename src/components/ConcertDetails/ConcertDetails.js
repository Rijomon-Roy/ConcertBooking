import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ConcertDetails.css";

const ConcertDetails = ({ isAuthenticated, username }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? {
              headers: { Authorization: `Bearer ${token}` },
            }
          : {};

        const response = await axios.get(
          `http://localhost:3004/bookingApi/concerts/${id}`, // ✅ NOT concertApi
          config
        );

        setConcert(response.data.concert);
        if (response.data.username) {
          // Update username in parent component if needed
        }
      } catch (err) {
        console.error("Full error:", err);
        setError(
          err.response?.data?.message || "Failed to load concert details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);
  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity < 1 || newQuantity > 3) return;
    setQuantity(newQuantity);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/concerts/${id}`,
          message: "Please login to book tickets",
        },
      });
      return;
    }
    navigate(`/bookings/payment/${id}`, {
      state: {
        concert,
        quantity,
        totalPrice: concert.price * quantity,
      },
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!concert) return <div className="not-found">Concert not found</div>;

  const totalPrice = concert.price * quantity;

  return (
    <div className="concert-details-page">
      <main className="concert-container">
        <div className="concert-left">
          <h1>{concert.name}</h1>
          <img
            src={`http://localhost:3004/uploads/${concert.image}`}
            alt="Concert Poster"
            className="concert-poster"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x300?text=No+Image";
            }}
          />
          <div className="tags">
            {concert.tags?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="about-event">
            <h2>About This Event</h2>
            <p>{concert.description}</p>
          </div>
        </div>

        <div className="concert-right">
          <ul className="details">
            <li>
              <strong>Date:</strong> {concert.date}
            </li>
            <li>
              <strong>Time:</strong> {concert.time}
            </li>
            <li>
              <strong>Duration:</strong> {concert.duration} Hours
            </li>
            <li>
              <strong>Languages:</strong>{" "}
              {concert.languages?.join(", ") || "N/A"}
            </li>
            <li>
              <strong>Genres:</strong> {concert.genres?.join(", ") || "N/A"}
            </li>
            <li>
              <strong>Venue:</strong> {concert.venue}
            </li>
            <li>
              <strong>Price:</strong> ₹{concert.price} per ticket
            </li>
          </ul>

          {isAuthenticated ? (
            <form onSubmit={handleBookNow}>
              <div className="ticket-controls">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span id="ticketCount">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="quantity-btn"
                >
                  +
                </button>
                <input type="hidden" name="quantity" value={quantity} />
                <input type="hidden" name="totalPrice" value={totalPrice} />
              </div>
              <div className="price-display">
                Total Price: ₹<span id="totalPrice">{totalPrice}</span>
              </div>
              <button type="submit" className="book-btn">
                Book Now
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please login to book tickets</p>
              <Link
                to="/login"
                state={{ from: `/concerts/${id}` }}
                className="book-btn"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConcertDetails;
