import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditConcert = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [concert, setConcert] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    languages: "",
    genres: "",
    venue: "",
    seats: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const res = await axios.get(`http://localhost:3004/concertApi/${id}`);
        const c = res.data.concert;
        setConcert({
          ...c,
          languages: c.languages.join(", "),
          genres: c.genres.join(", "),
        });
        if (c.image) {
          setPreview(`http://localhost:3004/uploads/${c.image}`);
        }
      } catch (err) {
        console.error("Error loading concert:", err);
        alert("Failed to load concert");
      }
    };
    fetchConcert();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setConcert({ ...concert, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setConcert({ ...concert, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(concert).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.put(`http://localhost:3004/concertApi/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Concert updated successfully");
      navigate("/admin-dashboard/concerts"); // navigate to concert list
    } catch (err) {
      console.error("Error updating concert:", err);
      alert("Failed to update concert");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">🎤 Edit Concert</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Concert Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={concert.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={concert.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              className="form-control"
              value={concert.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duration (in hours)</label>
            <input
              type="number"
              name="duration"
              step="0.5"
              className="form-control"
              value={concert.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Languages (comma-separated)</label>
            <input
              type="text"
              name="languages"
              className="form-control"
              value={concert.languages}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Genres (comma-separated)</label>
            <input
              type="text"
              name="genres"
              className="form-control"
              value={concert.genres}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Venue</label>
            <input
              type="text"
              name="venue"
              className="form-control"
              value={concert.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Seats</label>
            <input
              type="number"
              name="seats"
              className="form-control"
              value={concert.seats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={concert.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={concert.description}
              onChange={handleChange}
              required
            />
          </div>

          {preview && (
            <div className="mb-3">
              <label className="form-label">Current Image</label>
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail d-block mb-2"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Change Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            🎶 Update Concert
          </button>
          <Link
            to="/admin-dashboard/concerts"
            className="btn btn-secondary w-100 mt-2"
          >
            🔙 Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditConcert;
