import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/concertApi/");
      setConcerts(response.data.concerts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching concerts:", err);
      setError("Failed to load concerts");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this concert?"
    );
    if (!confirmDelete) return;

    try {
      // DELETE request to backend
      await axios.delete(`http://localhost:3004/concertApi/delete/${id}`);
      // Remove the deleted concert from state
      setConcerts((prevConcerts) =>
        prevConcerts.filter((concert) => concert._id !== id)
      );
    } catch (err) {
      console.error("Error deleting concert:", err);
      alert("Failed to delete concert");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading concerts...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Concert Management</h2>

      <div className="d-flex justify-content-between mb-4">
        <Link to="/admin-dashboard" className="btn btn-secondary">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/admin-dashboard/concerts/add" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Concert
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Total Seats</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {concerts.length > 0 ? (
              concerts.map((concert) => (
                <tr key={concert._id}>
                  <td>
                    {concert.image ? (
                      <img
                        src={`http://localhost:3004/uploads/${concert.image}`}
                        alt="Concert"
                        className="img-thumbnail"
                        style={{ maxWidth: "80px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{concert.name}</td>
                  <td>{concert.date}</td>
                  <td>{concert.time}</td>
                  <td>{concert.venue}</td>
                  <td>{concert.seats}</td>
                  <td>₹{concert.price}</td>
                  <td>
                    <Link
                      to={`/concerts/edit/${concert._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(concert._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No concerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConcertList;
