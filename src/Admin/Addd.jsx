import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  async function docreg(e) {
    e.preventDefault();
    const doc = { name, number, email, password, gender, qua, exp, spe, address };
    const response = await API.post("/doctor", doc);
    if (response.data.msg === "Success") {
      toast.success("Doctor added successfully ✅");
      setName("");
      setNumber("");
      setEmail("");
      setPassword("");
      setGender("");
      setQua("");
      setExp("");
      setSpe("");
      setAddress("");
    } else if (response.data.msg === "Duplicate") {
      toast.warning(`${response.data.field} already exists!`);
    } else {
      toast.error("Something went wrong ❌");
      setPassword("");
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
      {/* Navbar */}
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

      {/* Body */}
      <div className="row" style={{ minHeight: "92vh", background: "#f5f6fa" }}>
        <Adsidenav />

        <div className="col-md-10 py-4 px-5">
          <div
            className="card shadow-lg border-0 mx-auto"
            style={{ maxWidth: "800px", borderRadius: "20px" }}
          >
            <div
              className="card-header text-white text-center fs-4 fw-bold"
              style={{
                background: "linear-gradient(90deg, #2563eb, #1e40af)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              🩺 Add Doctor
            </div>

            <div className="card-body px-5 py-4">
              <form onSubmit={docreg}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="Enter doctor name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile No.</label>
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-select rounded-3"
                      required
                    >
                      <option value="">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Qualification</label>
                    <input
                      type="text"
                      value={qua}
                      onChange={(e) => setQua(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="e.g. MBBS, MD"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Experience</label>
                    <select
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      className="form-select rounded-3"
                      required
                    >
                      <option value="">--Select Experience--</option>
                      {Array.from({ length: 15 }, (_, i) => (
                        <option key={i} value={`${i + 1} Year`}>
                          {i + 1} Year
                        </option>
                      ))}
                      <option value="15+ Year">15+ Year</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Speciality</label>
                    <input
                      type="text"
                      value={spe}
                      onChange={(e) => setSpe(e.target.value)}
                      className="form-control rounded-3"
                      placeholder="e.g. Cardiologist, Dermatologist"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control rounded-3"
                      rows="3"
                      placeholder="Enter full address"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 rounded-pill fw-bold shadow-sm"
                    style={{
                      background: "linear-gradient(90deg, #2563eb, #1e40af)",
                      border: "none",
                    }}
                  >
                    ➕ Add Doctor
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
