import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import {
  FaUserMd,
  FaUsers,
  FaComments,
  FaExclamationCircle,
  FaLightbulb,
  FaNewspaper,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import API from "../utils/api";

function Addash() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch admin stats from backend
  async function getall() {
    try {
      const response = await API.get("/admin/stats");
      if (response.data.msg === "Success") {
        setStats(response.data.value);
      } else {
        console.log("Failed to load stats");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  // ✅ Validate admin login
  function validation() {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  }

  useEffect(() => {
    validation();
    getall();
  }, []);

  // ✅ Dashboard cards data
  const cards = [
    { title: "Doctors", value: stats.d, icon: <FaUserMd />, color: "#2563eb" },
    { title: "Patients", value: stats.p, icon: <FaUsers />, color: "#10b981" },
    { title: "Feedback", value: stats.f, icon: <FaComments />, color: "#6366f1" },
    { title: "Complains", value: stats.c, icon: <FaExclamationCircle />, color: "#f43f5e" },
    { title: "Suggestions", value: stats.s, icon: <FaLightbulb />, color: "#f59e0b" },
    { title: "News", value: stats.n, icon: <FaNewspaper />, color: "#14b8a6" },
    { title: "Appointments", value: stats.a, icon: <FaCalendarCheck />, color: "#0ea5e9" },
    { title: "Pending Appointment", value: stats.pena, icon: <FaClock />, color: "#eab308" },
    { title: "Confirmed Appointment", value: stats.cona, icon: <FaCheckCircle />, color: "#16a34a" },
    { title: "Completed Appointment", value: stats.coma, icon: <FaCheckCircle />, color: "#22c55e" },
    { title: "Cancelled Appointment", value: stats.cana, icon: <FaTimesCircle />, color: "#ef4444" },
  ];

  return (
    <>
      {/* ===== Header ===== */}
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

      {/* ===== Main Body ===== */}
      <div className="row" style={{ minHeight: "92vh", background: "#f5f6fa" }}>
        {/* Sidebar */}
        <Adsidenav />

        {/* Dashboard Section */}
        <div className="col-md-10 p-5">
          <h3 className="text-center mb-4 fw-bold text-primary">
            📊 Admin Dashboard Overview
          </h3>

          <div className="row g-4">
            {cards.map((card, index) => (
              <div className="col-12 col-sm-6 col-lg-4" key={index}>
                <div
                  className="card shadow-sm border-0 h-100 hover-card"
                  style={{
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    background: "white",
                  }}
                >
                  <div
                    className="card-body text-center p-4"
                    style={{ color: card.color }}
                  >
                    <div
                      className="icon-container mb-3"
                      style={{
                        fontSize: "40px",
                        background: `${card.color}20`,
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h2 className="fw-bold mb-1 text-dark">
                      {card.value ?? 0}
                    </h2>
                    <p className="fw-semibold mb-0">{card.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Addash;
