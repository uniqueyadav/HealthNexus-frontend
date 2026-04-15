import React, { useEffect, useState, useRef } from 'react';
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
  const [name, setName] = useState("");
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null); 
  
  const navigate = useNavigate();

  const getIndianDate = () => {
    return new Intl.DateTimeFormat('en-CA', { 
      year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Kolkata' 
    }).format(new Date()); 
  };

  const getIndianHour = () => {
    return parseInt(new Intl.DateTimeFormat('en-GB', { 
      hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' 
    }).format(new Date()));
  };

  const today = getIndianDate();

  // Fixed handleDoctorChange with window.bootstrap
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setDid(doctorId);
    
    if (doctorId) {
      const doc = fdoc.find(d => d._id === doctorId);
      setSelectedDoctorDetails(doc);
      
      // Bootstrap modal ko safely trigger karna
      const modalElement = document.getElementById('doctorDetailModal');
      if (window.bootstrap) {
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalInstance.show();
      } else {
        console.error("Bootstrap JS not found! Make sure it's in your index.html");
      }
    }
  };

  useEffect(() => {
    const currentHour = getIndianHour();
    if (date === today) {
      if (slot === "Morning" && currentHour >= 12) setSlot("");
      if (slot === "Afternoon" && currentHour >= 16) setSlot("");
      if (slot === "Evening" && currentHour >= 20) setSlot("");
    }
  }, [date, slot, today]);

  async function reqapp(e) {
    e.preventDefault();
    const currentHour = getIndianHour();

    if (date === today) {
      if ((slot === "Morning" && currentHour >= 12) || 
          (slot === "Afternoon" && currentHour >= 16) || 
          (slot === "Evening" && currentHour >= 20)) {
        alert("Bhai, ye slot ab available nahi hai aaj ke liye! ❌");
        return;
      }
    }

    const data = { pid, did, date, slot, desc };
    try {
      const response = await API.post('/app', data);
      if (response.data.msg === "Success") {
        alert("Appointment Request Sent ✅");
        setSpe(""); setDid(""); setSlot(""); setDate(""); setDesc(""); setName("");
      } else {
        alert("Something Went Wrong ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ❌");
    }
  }

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

  function filterdoc(e) {
    const selectedSpe = e.target.value;
    setSpe(selectedSpe);
    setDid(""); 
    const filtered = doctors.filter(d => d.spe === selectedSpe);
    setFdoc(filtered);
  }

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
      <div className="row py-3 bg-primary text-white shadow-sm m-0">
        <div className="col-md-1 ms-3">
          <div className="dropdown">
            <button className="btn btn-light" type="button" data-bs-toggle="dropdown">
              <i className="fa-solid fa-bars text-dark"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link to={'/patientdash'} className="dropdown-item">Dashboard</Link></li>
              <li><Link to={'/patientappointment'} className="dropdown-item">Appointment</Link></li>
              <li><Link to={'/preqappointment'} className="dropdown-item">Request Appointment</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <h4 className="mb-0">Patient Portal</h4>
        </div>
        <div className="col-md-1 ms-auto text-end me-4">
          <button className="btn btn-outline-light fw-bold rounded-3" data-bs-toggle="modal" data-bs-target="#logoutModal">Log out</button>
        </div>
      </div>

      {/* --- DOCTOR DETAILS MODAL --- */}
      <div className="modal fade" id="doctorDetailModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Doctor Profile</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedDoctorDetails ? (
                <div className="p-2">
                  <h4 className="text-primary mb-3">Dr. {selectedDoctorDetails.name}</h4>
                  <div className="row g-3">
                    <div className="col-6"><strong>Specialty:</strong> <p>{selectedDoctorDetails.spe}</p></div>
                    <div className="col-6"><strong>Department:</strong> <p>{selectedDoctorDetails.department}</p></div>
                    <div className="col-6"><strong>Qualification:</strong> <p>{selectedDoctorDetails.qua}</p></div>
                    <div className="col-6"><strong>Experience:</strong> <p>{selectedDoctorDetails.exp}</p></div>
                    <div className="col-6"><strong>Fees:</strong> <p className="text-success fw-bold">₹{selectedDoctorDetails.fee}</p></div>
                    <div className="col-6"><strong>Room / Cabin no. :</strong> <p>{selectedDoctorDetails.room}</p></div>
                    <div className="col-12"><strong>Working Days:</strong> <p>{selectedDoctorDetails.working_days} ({selectedDoctorDetails.shift})</p></div>
                    <div className="col-6"><strong>Working Experience:</strong> <p>{selectedDoctorDetails.working_experience}</p></div>
                    <div className="col-12 border-top pt-2">
                      <strong>Other Info:</strong>
                      <p className="text-muted small">{selectedDoctorDetails.additional_info || "N/A"}</p>
                    </div>
                  </div>
                </div>
              ) : <p>Loading...</p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Close & Continue</button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Logout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => {
                localStorage.removeItem("reg");
                navigate("/login", { replace: true });
                window.location.reload();
              }}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg rounded-4 border-0">
              <div className="card-body p-4">
                <h3 className="card-title text-center text-primary mb-4">Book Appointment</h3>
                <form onSubmit={reqapp}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Specialty</label>
                    <select className="form-select" value={spe} onChange={filterdoc} required>
                      <option value="">-- Select --</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="Physiotherapist">Physiotherapist</option>
                      <option value="Physician">Physician</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Doctor</label>
                    <select className="form-select" value={did} onChange={handleDoctorChange} required disabled={!spe}>
                      <option value="">{spe ? "-- Select Doctor --" : "Select specialty first"}</option>
                      {fdoc.map(d => (
                        <option key={d._id} value={d._id}>Dr. {d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Date</label>
                      <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Slot</label>
                      <select className="form-select" value={slot} onChange={(e) => setSlot(e.target.value)} required>
                        <option value="">-- Slot --</option>
                        {!(date === today && getIndianHour() >= 12) && <option value="Morning">Morning (08AM - 12PM)</option>}
                        {!(date === today && getIndianHour() >= 16) && <option value="Afternoon">Afternoon (12PM - 04AM)</option>}
                        {!(date === today && getIndianHour() >= 20) && <option value="Evening">Evening (04PM - 08PM)</option>}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Symptoms</label>
                    <textarea className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} rows="3" required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold">Confirm Request</button>
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