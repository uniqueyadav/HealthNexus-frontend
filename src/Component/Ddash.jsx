import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';

function Ddash() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  async function getall() {
    try {
      const response = await API.get(
        `/doctor/stats/${localStorage.getItem('doctor')}`
      );
      console.log("Doctor1 ID:", localStorage.getItem('doctor'));

      if (response.data.msg === "Success") {
        setStats(response.data.value);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function validation() {
    const data = localStorage.getItem('doctor');
    if (!data) {
      navigate('/login');
    }
  }

  useEffect(() => {
    validation();
    getall();
  }, []);

  const cardData = [
    { title: "Feedback", value: stats.f, icon: "fa-comments", color: "bg-info" },
    { title: "Complains", value: stats.c, icon: "fa-exclamation-triangle", color: "bg-danger" },
    { title: "Suggestions", value: stats.s, icon: "fa-lightbulb", color: "bg-warning" },
    { title: "Appointments", value: stats.a, icon: "fa-calendar-check", color: "bg-primary" },
    { title: "Pending", value: stats.pena, icon: "fa-hourglass-half", color: "bg-secondary" },
    { title: "Confirmed", value: stats.cona, icon: "fa-check-circle", color: "bg-success" },
    { title: "Completed", value: stats.coma, icon: "fa-clipboard-check", color: "bg-dark text-white" },
    { title: "Cancelled", value: stats.cana, icon: "fa-times-circle", color: "bg-danger" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="row py-3 bg-primary text-white shadow-sm">
        <div className="col-md-1 ms-3">
          <div className="dropdown">
            <button
              className="btn btn-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bars"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/doctorappointment">Dashboard</Link></li>
              <li><Link className="dropdown-item" to="/pendingapp">Pending</Link></li>
              <li><Link className="dropdown-item" to="/cancelapp">Cancelled</Link></li>
              <li><Link className="dropdown-item" to="/confirmeapp">Confirmed</Link></li>
              <li><Link className="dropdown-item" to="/completeapp">Completed</Link></li>
              <li><Link to={"/change-password"} className="dropdown-item">Change Password</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <h4>Doctor Dashboard</h4>
        </div>
        <div className="col-md-1 ms-auto  ">
            <button
              className="btn btn-outline-light fw-bold rounded-3"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
          Log out
        </button>
        </div>
      </div>
      {/* Start Log out confirmation */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("doctor");
                  navigate("/login",{replace:true});
                  window.location.reload();
                }}
              >
                Yes, Logout
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* End Log out confirmation */}

      {/* Stats Section */}
      <div className="container my-5">
        <div className="row g-4">
          {cardData.map((card, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
              <div className={`card shadow-lg ${card.color} h-100 text-center`} style={{ borderRadius: "15px", transition: "transform 0.3s" }}>
                <div className="card-body">
                  <i className={`fas ${card.icon} fa-3x mb-3`}></i>
                  <h3 className="card-title">{card.value || 0}</h3>
                  <p className="card-text fw-bold">{card.title}</p>
                </div>
                <div className="card-footer ">
                  Last updated: Just Now
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ddash;
