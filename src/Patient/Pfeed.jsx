import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';
import API from '../utils/api';

function Pfeed() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ Add feedback
  async function addfeed(e) {
    e.preventDefault();
    const feed = { uid: localStorage.getItem("reg"), utype: "reg", type, msg, status: "u" };
    const response = await API.post('/feed', feed);
    if (response.data.msg === "Success") {
      alert("Feedback Added Successfully ✅");
      setType("");
      setMsg("");
    } else {
      alert("Something Went Wrong ❌");
      setMsg("");
    }
  }

  // ✅ Validate login
  function validation() {
    if (!localStorage.getItem('reg')) {
      navigate('/login');
    }
  }

  useEffect(() => {
    validation();
  }, []);

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
       {/* Log out confirmation */}
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
      {/* Page Heading */}
      <h3 className="text-center py-4 text-primary">Feedback</h3>

      {/* Feedback Form */}
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-4 rounded-4">
            <h4 className="mb-4 text-center text-primary">Feedback Form</h4>
            <form onSubmit={addfeed}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Select Type:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-control rounded-3"
                  required
                >
                  <option value="">--Select Type--</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Complain">Complain</option>
                  <option value="Suggestion">Suggestion</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="msg" className="form-label">Message:</label>
                <textarea
                  id="msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="form-control rounded-3"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Add Feedback</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Pfeed;
