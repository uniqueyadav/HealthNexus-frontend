import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';
import API from '../utils/api';

function Preqapp() {
  const [doctors, setDoctor] = useState([]);
  const [spe, setSpe] = useState("");
  const [fdoc, setFdoc] = useState([]);
  const [pid, setPid] = useState("");
  const [did, setDid] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  // ✅ Request Appointment
  async function reqapp(e) {
    e.preventDefault();
    const data = { pid, did, date, slot, desc };
    try {
      const response = await API.post('/app', data);
      if (response.data.msg === "Success") {
        alert("Appointment Request Sent ✅");
        setSpe(""); setDid(""); setSlot(""); setDate(""); setDesc("");
      } else {
        alert("Something Went Wrong ❌");
        setSlot(""); setDate(""); setDesc("");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ❌");
    }
  }

  // ✅ Get all doctors
  async function getDoc() {
    try {
      const response = await API.get('/doctor');
      if (response.data.msg === "Success") {
        setDoctor(response.data.value);
        setFdoc(response.data.value);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ Filter doctors by specialty
  function filterdoc(e) {
    setSpe(e.target.value);
    const filtered = doctors.filter(d => d.spe === e.target.value);
    setFdoc(filtered);
  }

  // ✅ Validate login
  function validation() {
    const data = localStorage.getItem('reg');
    if (!data) navigate('/login');
    else setPid(data);
  }

  useEffect(() => {
    validation();
    getDoc();
  }, []);

  return (
    <>
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
          {/* log out box */}
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
      {/* Appointment Request Form */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg rounded-4 border-0">
              <div className="card-body p-4">
                <h3 className="card-title text-center text-primary mb-4">Request Appointment</h3>
                <form onSubmit={reqapp}>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Specialty</label>
                    <select className="form-select" value={spe} onChange={filterdoc} required>
                      <option value="">--Select Specialty--</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="Physiotherapist">Physiotherapist</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Doctor</label>
                    <select className="form-select" value={did} onChange={(e) => setDid(e.target.value)} required>
                      <option value="">--Select Doctor--</option>
                      {fdoc.map(d => (
                        <option key={d._id} value={d._id}>Dr. {d.name} ({d.spe})</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Slot</label>
                    <select className="form-select" value={slot} onChange={(e) => setSlot(e.target.value)} required>
                      <option value="">--Select Slot--</option>
                      <option value="Morning">Morning (09AM-12PM)</option>
                      <option value="Afternoon">Afternoon (01PM-04PM)</option>
                      <option value="Evening">Evening (04PM-08PM)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Describe Your Problem</label>
                    <textarea className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} rows="3" placeholder="Describe your issue" required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold">Request Appointment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Preqapp;
