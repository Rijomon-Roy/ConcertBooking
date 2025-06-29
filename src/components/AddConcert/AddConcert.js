import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddConcert = () => {
  const [formData, setFormData] = useState({
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
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const concertData = new FormData();
      Object.keys(formData).forEach((key) =>
        concertData.append(key, formData[key])
      );
      if (image) concertData.append("image", image);

      // ✅ Define res before using it
      const res = await axios.post(
        "http://localhost:3004/concertApi/add",
        concertData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        "Submitting concert data:",
        concertData.get("name"),
        concertData.get("image")
      );

      if (res.status === 201) {
        alert("🎉 Concert added successfully!");
        navigate("/admin-dashboard/concerts");
      }
    } catch (err) {
      console.error("Error adding concert:", err);
      alert("Failed to add concert.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">🎤 Add Concert</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Concert Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Duration (in hours)</label>
              <input
                type="number"
                step="0.5"
                className="form-control"
                name="duration"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Languages (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                name="languages"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Genres (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                name="genres"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Venue</label>
              <input
                type="text"
                className="form-control"
                name="venue"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Number of Seats</label>
              <input
                type="number"
                className="form-control"
                name="seats"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3 col-12">
              <label className="form-label">Concert Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            🎶 Add Concert
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

export default AddConcert;
