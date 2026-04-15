import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";

function Addd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [qua, setQua] = useState("");
  const [exp, setExp] = useState("");
  const [spe, setSpe] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [working_days, setWorking_days] = useState("");
  const [shift, setShift] = useState("");
  const [fee, setFee] = useState("");
  const [room, setRoom] = useState("");
  const [additional_info, setAdditional_info] = useState("");
  const [working_experience, setWorking_experience] = useState("");

  // ✅ Validation Logic
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and total 10 digits
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long!");
      return false;
    }
    if (!phoneRegex.test(number)) {
      toast.error("Enter a valid 10-digit mobile number!");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 8+ chars, include Uppercase, Number & Special char!");
      return false;
    }
    if (isNaN(fee) || fee <= 0) {
      toast.error("Please enter a valid consultation fee!");
      return false;
    }
    if (!gender || !exp || !spe || !department) {
      toast.error("Please fill all required fields!");
      return false;
    }
    return true;
  };

  async function docreg(e) {
    e.preventDefault();

    // Pehle validation check karein
    if (!validateForm()) return;

    const doc = { 
      name, number, email, password, gender, qua, exp, spe, address, 
      department, working_days, shift, fee, room, additional_info, working_experience 
    };
    console.log(doc)

    try {
      const response = await API.post("/doctor", doc);
      if (response.data.msg === "Success") {
        toast.success("Doctor added successfully ✅");
        // Clear all states
        setName(""); setNumber(""); setEmail(""); setPassword("");
        setGender(""); setQua(""); setExp(""); setSpe(""); setAddress("");
        setDepartment(""); setWorking_days(""); setShift(""); setFee("");
        setRoom(""); setAdditional_info(""); setWorking_experience("");
      } else if (response.data.msg === "Duplicate") {
        toast.warning(`${response.data.field} already exists!`);
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (err) {
      toast.error("Server error! Check your connection.");
    }
  }

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
      {/* Navbar Section */}
      <div className="row align-items-center px-4" style={{ height: "8vh", background: "linear-gradient(90deg, #2563eb, #1e3a8a)", color: "white" }}>
        <div className="col-md-3 fw-bold fs-4 d-flex align-items-center">
          <FaUserMd className="me-2 fs-3" />Admin Dashboard
        </div>
        <div className="col-md-2 ms-auto text-end">
          <button onClick={() => { localStorage.removeItem("admin"); navigate("/admin"); }} className="btn btn-light fw-bold px-4 py-1 rounded-pill shadow-sm text-dark">
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      <div className="row" style={{ minHeight: "92vh", background: "#f5f6fa" }}>
        <Adsidenav />
        <div className="col-md-10 py-4 px-5">
          <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "900px", borderRadius: "20px" }}>
            <div className="card-header text-white text-center fs-4 fw-bold" style={{ background: "linear-gradient(90deg, #2563eb, #1e40af)", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
              🩺 Add New Doctor Profile
            </div>

            <div className="card-body px-5 py-4">
              <form onSubmit={docreg}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Dr. Name" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile No.</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="form-control" placeholder="10 Digit Number" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="doctor@hospital.com" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Strong Password" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select" required>
                      <option value="">--Select--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Qualification</label>
                    <input type="text" value={qua} onChange={(e) => setQua(e.target.value)} className="form-control" placeholder="MBBS, MD" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Experience</label>
                    <select value={exp} onChange={(e) => setExp(e.target.value)} className="form-select" required>
                      <option value="">--Select--</option>
                      {[...Array(20)].map((_, i) => <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Speciality</label>
                    <input type="text" value={spe} onChange={(e) => setSpe(e.target.value)} className="form-control" placeholder="Cardiologist" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control" placeholder="OPD / Surgery" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Working Days</label>
                    <input type="text" value={working_days} onChange={(e) => setWorking_days(e.target.value)} className="form-control" placeholder="Mon-Sat" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Shift</label>
                    <input type="text" value={shift} onChange={(e) => setShift(e.target.value)} className="form-control" placeholder="10AM - 4PM" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Consultation Fee</label>
                    <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="form-control" placeholder="500" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Room / Cabin</label>
                    <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} className="form-control" placeholder="Room 102" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Additional Info</label>
                    <input type="text" value={additional_info} onChange={(e) => setAdditional_info(e.target.value)} className="form-control" placeholder="Extra details" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2" required></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Working History / Experience Details</label>
                    <textarea value={working_experience} onChange={(e) => setWorking_experience(e.target.value)} className="form-control" rows="2"></textarea>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold shadow-sm" style={{ background: "linear-gradient(90deg, #2563eb, #1e40af)", border: "none" }}>
                    ➕ Register Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Addd;