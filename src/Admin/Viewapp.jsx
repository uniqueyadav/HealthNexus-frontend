import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaClipboardCheck,
  FaUserMd,
  FaSignOutAlt,
} from "react-icons/fa";
import API from "../utils/api";

function Viewapp() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  // ✅ Fetch appointments by status
  async function fetchAppointments(status) {
    const response = await API.get(`/app`);
    if (response.data.msg === "Success") {
      const filtered = response.data.value.filter(
        (d) => d.status === status
      );
      setAppointment(filtered);
      setActiveFilter(status);
    }
  }

  // ✅ Admin validation
  function validation() {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  }

  useEffect(() => {
    validation();
  }, []);

  return (
    <>
      {/* Header */}
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
      <div className="row" style={{ height: "92vh", overflow: "auto" }}>
        <Adsidenav />

        <div className="col-md-10 p-4 bg-light">
          <h3 className="text-center mb-4 fw-bold text-dark">
            View Appointments
          </h3>

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <button
              onClick={() => fetchAppointments("completed")}
              className={`btn ${
                activeFilter === "completed"
                  ? "btn-success"
                  : "btn-outline-success"
              } d-flex align-items-center gap-2 fw-semibold`}
            >
              <FaClipboardCheck /> Completed
            </button>
            <button
              onClick={() => fetchAppointments("confirmed")}
              className={`btn ${
                activeFilter === "confirmed"
                  ? "btn-info text-white"
                  : "btn-outline-info"
              } d-flex align-items-center gap-2 fw-semibold`}
            >
              <FaCheckCircle /> Confirmed
            </button>
            <button
              onClick={() => fetchAppointments("pending")}
              className={`btn ${
                activeFilter === "pending"
                  ? "btn-warning text-dark"
                  : "btn-outline-warning"
              } d-flex align-items-center gap-2 fw-semibold`}
            >
              <FaClock /> Pending
            </button>
            <button
              onClick={() => fetchAppointments("cancelled")}
              className={`btn ${
                activeFilter === "cancelled"
                  ? "btn-danger"
                  : "btn-outline-danger"
              } d-flex align-items-center gap-2 fw-semibold`}
            >
              <FaTimesCircle /> Cancelled
            </button>
          </div>

          {/* Table Section */}
          <div className="card shadow-lg border-0 rounded-4 p-3">
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead
                  className="table-dark"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                  <tr>
                    <th>#</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Slot</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.length > 0 ? (
                    appointment.map((app, i) => (
                      <tr key={i} className="table-row">
                        <td>{i + 1}</td>
                        <td className="fw-semibold text-primary">
                          {app.did?.name || "N/A"}
                        </td>
                        <td className="fw-semibold text-success">
                          {app.pid?.name || "N/A"}
                        </td>
                        <td>{app.slot}</td>
                        <td>{app.date}</td>
                        <td>{app.desc}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 ${
                              app.status === "completed"
                                ? "bg-success"
                                : app.status === "confirmed"
                                ? "bg-info"
                                : app.status === "pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {app.status.charAt(0).toUpperCase() +
                              app.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted py-4">
                        No appointments to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Viewapp;
