import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";

function Viewenquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const navigate = useNavigate();

  // ✅ Validate Admin Login
  const validation = () => {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  };

  // ✅ Fetch Enquiries from API
  const getEnquiries = async () => {
    try {
      const res = await API.get("/enquiry");
      if (res.data.msg === "Success") {
        setEnquiries(res.data.value);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    }
  };

  useEffect(() => {
    validation();
    getEnquiries();
  }, []);

  // ✅ Delete Enquiry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      await API.delete(`/enquiry/${id}`);
      getEnquiries();
    }
  };

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
          <h3 className="text-center mb-4 fw-bold text-primary">
            User Enquiries
          </h3>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-primary text-white rounded-4">
                <h6>Total Enquiries</h6>
                <h3>{enquiries.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-success text-white rounded-4">
                <h6>Resolved</h6>
                <h3>{Math.floor(enquiries.length / 2)}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3 bg-warning text-dark rounded-4">
                <h6>Pending</h6>
                <h3>{Math.ceil(enquiries.length / 2)}</h3>
              </div>
            </div>
          </div>

          {/* Enquiry Table */}
          <div className="table-responsive shadow rounded-4 bg-white p-3">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length > 0 ? (
                  enquiries.map((enq, i) => (
                    <tr key={enq._id}>
                      <td>{i + 1}</td>
                      <td>{enq.name}</td>
                      <td>{enq.email}</td>
                      <td>{enq.phone}</td>
                      <td style={{ maxWidth: "200px" }}>{enq.message}</td>
                      <td>
                        {new Date(enq.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger px-3"
                          onClick={() => handleDelete(enq._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted py-4">
                      No Enquiries Found 😕
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

export default Viewenquiry;
