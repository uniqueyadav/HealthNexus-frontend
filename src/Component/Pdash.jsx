import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import API from '../utils/api';

function Pdash() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const id = localStorage.getItem('reg');

    if (!id) {
      navigate('/login');
    } else {
      API.get(`/reg/getuser/${id}`)
        .then((res) => {
          if (res.data.msg === "Success") {
            setUser(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, []);

  return (
    <>
      <div className="row">
          <div className="py-2 w-100 bg-primary col-md-12">
            <div className="row">
              <div className="col-md-1">
                 <div className="dropdown">
                 <a className="btn btn-secondary " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-bars "></i>
                 </a>

               <ul className="dropdown-menu">
                 <li><Link to={'/patientdash'} className="dropdown-item" >Dashboard</Link></li>
                 <li><Link to={'/patientappointment'} className="dropdown-item" >Appointment</Link></li>
                 <li><Link to={'/preqappointment'} className="dropdown-item" >Request Appointment</Link></li>
                 <li><Link to={'/patientfeed'} className="dropdown-item" >Feedback</Link></li>
                 <li><Link to={'/patientviewfeed'} className="dropdown-item" >View Feedback</Link></li>
                 <li><Link to={"/change-password"} className="dropdown-item">Change Password</Link></li>
               </ul>
            </div>
              </div>
              <div className="col-md-2 text-center text-white">
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
          </div>
        </div>
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

      {/* 🔥 Dashboard Content */}
      <div className="container mt-4">

        {user && (
          <div className="card shadow-lg p-4">
            <h3 className="text-primary">
              Welcome, {user.name} 👋
            </h3>

            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.number}</p>

            <hr />

            <div className="row text-center">

              <div className="col-md-3 mb-2">
                <Link to="/preqappointment" className="btn btn-outline-primary w-100">
                  Request Appointment
                </Link>
              </div>

              <div className="col-md-3 mb-2">
                <Link to="/patientappointment" className="btn btn-outline-success w-100">
                  View Appointments
                </Link>
              </div>

              <div className="col-md-3 mb-2">
                <Link to="/patientfeed" className="btn btn-outline-warning w-100">
                  Give Feedback
                </Link>
              </div>

              <div className="col-md-3 mb-2">
                <Link to="/patientviewfeed" className="btn btn-outline-info w-100">
                  View Feedback
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 🔴 Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Logout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("reg");
                  navigate("/login", { replace: true });
                }}
              >
                Yes, Logout
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Pdash