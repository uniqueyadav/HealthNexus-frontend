import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';
import API from '../utils/api';

function Canapp() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const validation = () => {
    const data = localStorage.getItem('doctor');
    if (!data) navigate('/login');
  };

  const getapp = async () => {
    try {
      const response = await API.get(
        `/app/d/${localStorage.getItem('doctor')}`
      );
      if (response.data.msg === "Success") {
        const cancelled = response.data.value.filter(d => d.status === "cancelled");
        setAppointments(cancelled);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelapp = async (id) => {
    try {
      const response = await API.put(`/app/${id}`, { status: "cancelled" });
      if (response.data.msg === "Success") {
        alert("Appointment Cancelled ✅");
        getapp();
      } else {
        alert("Something Went Wrong ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  const acceptapp = async (id) => {
    try {
      const response = await API.put(`/app/${id}`, { status: "confirmed" });
      if (response.data.msg === "Success") {
        alert("Appointment Confirmed ✅");
        getapp();
      } else {
        alert("Something Went Wrong ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  useEffect(() => {
    validation();
    getapp();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="row py-3 bg-primary text-white shadow-sm">
        <div className="col-md-1 ms-3">
          <div className="dropdown">
            <button className="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-bars"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to={'/doctorappointment'}>Dashboard</Link></li>
              <li><Link className="dropdown-item" to={'/pendingapp'}>Pending</Link></li>
              <li><Link className="dropdown-item" to={'/cancelapp'}>Cancelled</Link></li>
              <li><Link className="dropdown-item" to={'/confirmeapp'}>Confirmed</Link></li>
              <li><Link className="dropdown-item" to={'/completeapp'}>Completed</Link></li>
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

      <div className="container my-5">
        <h3 className="text-center text-danger mb-4">Cancelled Appointments</h3>
        <div className="table-responsive shadow-lg rounded-4 overflow-hidden">
          <table className="table table-striped table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? appointments.map((app, i) => (
                <tr key={app._id}>
                  <td>{i + 1}</td>
                  <td>{app.pid.name}</td>
                  <td>{app.slot}</td>
                  <td>{app.date}</td>
                  <td>{app.desc}</td>
                  <td>
                    <span className="badge bg-danger text-white" style={{ fontSize: "0.9rem" }}>
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => acceptapp(app._id)}>
                      <i className="fas fa-check-circle me-1"></i>Accept
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => cancelapp(app._id)}>
                      <i className="fas fa-times-circle me-1"></i>Reject
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-muted py-3">No Cancelled Appointments 😕</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Canapp;
