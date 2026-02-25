import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import API from "../utils/api";

function Pappointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    did: "",
    slot: "",
    date: "",
    desc: ""
  });
  const [doctors, setDoctors] = useState([]);

  // ✅ Fetch patient appointments
  const getAppointments = async () => {
    try {
      const response = await API.get(
        `/app/p/${localStorage.getItem("reg")}`
      );
      if (response.data.msg === "Success") {
        setAppointments(response.data.value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch all doctors
  const getDoctors = async () => {
    try {
      const res = await API.get("/doctor");
      if (res.data.msg === "Success") setDoctors(res.data.value);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Validate patient login
  const validation = () => {
    if (!localStorage.getItem("reg")) navigate("/login");
  };

  useEffect(() => {
    validation();
    getAppointments();
    getDoctors();
  }, []);

  // ✅ Cancel appointment
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await API.put(`/app/${id}`, { status: "cancelled" });
        alert("Appointment Cancelled ✅");
        getAppointments();
      } catch (err) {
        console.error(err);
        alert("Failed to cancel appointment ❌");
      }
    }
  };

  // ✅ Delete appointment
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await API.delete(`/app/${id}`);
        alert("Appointment Deleted ✅");
        getAppointments();
      } catch (err) {
        console.error(err);
        alert("Failed to delete appointment ❌");
      }
    }
  };

  // ✅ Open edit form (only pending)
  const handleEdit = (app) => {
    if (app.status !== "pending") return;
    setEditId(app._id);
    setEditData({
      did: app.did._id,
      slot: app.slot,
      date: app.date,
      desc: app.desc
    });
  };

  // ✅ Update appointment
  const handleUpdate = async () => {
    try {
      await API.put(`/app/${editId}`, editData);
      alert("Appointment Updated ✅");
      setEditId(null);
      getAppointments();
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="row py-3 bg-primary text-white shadow-sm">
        <div className="col-md-1 ms-3">
          <div className="dropdown">
            <button
              className="btn btn-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/patientdash" className="dropdown-item">Dashboard</Link></li>
              <li><Link to="/patientappointment" className="dropdown-item">Appointment</Link></li>
              <li><Link to="/preqappointment" className="dropdown-item">Request Appointment</Link></li>
              <li><Link to="/patientfeed" className="dropdown-item">Feedback</Link></li>
              <li><Link to="/patientviewfeed" className="dropdown-item">View Feedback</Link></li>
              <li><Link to={"/change-password"} className="dropdown-item">Change Password</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <h4>Patient Dashboard</h4>
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
                  localStorage.removeItem("reg");
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

      <h3 className="text-center py-4 text-primary">My Appointments</h3>

      {/* Edit Form */}
      {editId && (
        <div className="col-md-6 mx-auto shadow-lg p-4 mb-4 rounded-4 bg-white">
          <h4 className="text-center mb-3">Edit Appointment</h4>

          <div className="mb-2">
            <label>Doctor</label>
            <select
              className="form-select"
              value={editData.did}
              onChange={(e) => setEditData({ ...editData, did: e.target.value })}
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label>Slot</label>
            <input
              type="text"
              className="form-control"
              value={editData.slot}
              onChange={(e) => setEditData({ ...editData, slot: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
            />
          </div>

          <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}

      {/* Appointment Table */}
      <div className="row">
        <div className="col-md-10 mx-auto table-responsive shadow-lg rounded-4 bg-white p-4">
          <table className="table table-bordered table-hover table-striped text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((app, i) => (
                  <tr key={app._id}>
                    <td>{i + 1}</td>
                    <td>{app.did.name}</td>
                    <td>{app.slot}</td>
                    <td>{app.date}</td>
                    <td>{app.desc}</td>
                    <td>{app.status}</td>

                    {/* Edit Button */}
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(app)}
                        disabled={app.status !== "pending"}
                      >
                        Edit
                      </button>
                    </td>

                    {/* Cancel Button */}
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(app._id)}
                        disabled={app.status === "cancelled" || app.status === "completed"}
                      >
                        Cancel
                      </button>
                    </td>

                    {/* Delete Button */}
                    <td>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleDelete(app._id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-muted py-3">No Appointments Found 😕</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Pappointment;
