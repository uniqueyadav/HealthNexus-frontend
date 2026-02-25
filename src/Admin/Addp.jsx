import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import { FaUserPlus, FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";

function Addp() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [altnumber, setAltnumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // ✅ Form Submit
  async function reg(e) {
    e.preventDefault();
    const doc = {
      name,
      number,
      altnumber,
      email,
      password,
      gender,
      blood,
      age,
      address,
    };
    try {
      const response = await API.post("/reg", doc);
      if (response.data.msg === "Success") {
        toast.success("🎉 Registration Successful!");
        setName("");
        setNumber("");
        setEmail("");
        setPassword("");
        setGender("");
        setAge("");
        setBlood("");
        setAltnumber("");
        setAddress("");
      } else {
        toast.warning("⚠️ Something Went Wrong");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Server Error: Could not register");
    }
  }

  // ✅ Admin Validation
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
      {/* ===== Header ===== */}
      <div className="row align-items-center px-4"
        style={{ height: "8vh", background: "linear-gradient(90deg, #2563eb, #1e3a8a)",  color: "white",}} >
        <div className="col-md-3 fw-bold fs-4 d-flex align-items-center">
          <FaUserMd className="me-2 fs-3" />
          Admin Dashboard
        </div>
        <div className="col-md-2 ms-auto text-end">
          <button
            onClick={() => { localStorage.removeItem("admin"); validation(); }} className="btn btn-light fw-bold px-4 py-1 rounded-pill shadow-sm" >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* ===== Body Section ===== */}
      <div className="row" style={{ minHeight: "92vh", background: "#f5f6fa" }}>
        <Adsidenav />

        <div className="col-md-10 p-5">
          <div className="container">
            <div className="card shadow-lg border-0 p-5 rounded-4 patient-form-card mx-auto">
              <div className="text-center mb-4">
                <FaUserPlus className="fs-1 text-primary mb-2" />
                <h3 className="fw-bold text-primary">Add Patient</h3>
                <p className="text-muted">
                  Fill in the details below to register a new patient
                </p>
              </div>

              <form onSubmit={reg}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      📞 Contact Number
                    </label>
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      ☎️ Alternate Number
                    </label>
                    <input
                      type="number"
                      value={altnumber}
                      onChange={(e) => setAltnumber(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter alternate number"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">📧 Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">🔒 Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">🎂 Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter age"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      🩸 Blood Group
                    </label>
                    <select
                      value={blood}
                      onChange={(e) => setBlood(e.target.value)}
                      className="form-select form-select-lg rounded-3"
                      required
                    >
                      <option value="">-- Select Blood Group --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">🚻 Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-select form-select-lg rounded-3"
                      required
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">🏠 Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control rounded-3"
                      rows={3}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </div>

                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill px-5 py-2"
                  >
                    <FaUserPlus className="me-2" />
                    Register Patient
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

export default Addp;
