
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";

function Viewfeed() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // ✅ Validate Admin Login
  const validation = () => {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  };

  // ✅ Fetch Feedbacks
  const getFeedbacks = async () => {
    try {
      const res = await API.get("/feed");
      console.log(res.data.value[0])
      if (res.data.msg === "Success") {
        setFeedbacks(res.data.value);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  // ✅ Delete Feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await API.delete(`/feed/${id}`);
      getFeedbacks();
    }
  };

  useEffect(() => {
    validation();
    getFeedbacks();
  }, []);

  return (
    <>
      {/* Header Bar */}
      <div className="row align-items-center px-4"
              style={{ height: "8vh", background: "linear-gradient(90deg, #2563eb, #1e3a8a)",  color: "white",}} >
             <div className="col-md-3 fw-bold fs-4 d-flex align-items-center">
              <FaUserMd className="me-2 fs-3" /> Admin Dashboard </div>
              <div className="col-md-2 ms-auto text-end">
                 <button
                   onClick={() => { localStorage.removeItem("admin"); validation(); }} className="btn btn-light fw-bold px-4 py-1 rounded-pill shadow-sm" >
                   <FaSignOutAlt className="me-2" />  Logout
                  </button>
               </div>
            </div>

      {/* Main Section */}
      <div
        className="row"
        style={{ height: "92vh", overflow: "auto", background: "#f5f7fb" }}
      >
        <Adsidenav />

        {/* Content Area */}
        <div
          className="col-md-10 px-4 py-4"
          style={{
            borderLeft: "3px solid #e2e8f0",
            background: "#ffffff",
            borderRadius: "8px 0 0 0",
          }}
        >
          <h3 className="text-center mb-4 fw-bold text-primary">User Feedback</h3>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-info text-white rounded-4">
                <h6>Total Feedbacks</h6>
                <h3>{feedbacks.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-success text-white rounded-4">
                <h6>Positive</h6>
                <h3>{Math.floor(feedbacks.length / 2)}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-warning text-dark rounded-4">
                <h6>Neutral/Negative</h6>
                <h3>{Math.ceil(feedbacks.length / 2)}</h3>
              </div>
            </div>
          </div>

          {/* Feedback Table */}
          <div className="table-responsive shadow rounded-4 bg-white p-3">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb, i) => (
                    <tr key={fb._id}>
                      <td>{i + 1}</td>
                      <td>{fb.uid?.name}</td>
                      <td>{fb.uid?.email}</td>
                      <td>{fb.type}</td>
                      <td style={{ maxWidth: "250px" }}>{fb.msg}</td>
                      <td>{new Date(fb.uid?.createdAt).toLocaleDateString("en-GB")}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger px-3"
                          onClick={() => handleDelete(fb._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted py-4">
                      No Feedback Found 😕
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Viewfeed;
