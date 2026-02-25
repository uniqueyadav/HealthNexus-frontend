import React, { useState } from "react";
import Footer from "../Component/Footer";
import API from "../utils/api";
import { toast } from "react-toastify";

function Reg() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    altnumber: "",
    email: "",
    password: "",
    age: "",
    blood: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reg = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/reg", form);
      if (response.data.msg === "Success") {
        toast.success("✅ Registration successful!");
        setForm({ name: "", number: "", altnumber: "", email: "", password: "", age: "", blood: "", gender: "", address: "" });
      } else if (response.data.msg === "Duplicate") {
        toast.warning(`${response.data.field} already exists!`);
      } else {
        toast.warning("⚠️ Something went wrong.");
      }
    } catch (err) {
      toast.error("❌ Server error. Try again later.");
    }
  };

  return (
    <>
      <div className="register-page py-5">
        <div className="container">
          <div className="register-card p-5 shadow-lg rounded-4 mx-auto">
            <h2 className="text-center text-primary mb-3"><i className="fas fa-user-plus me-2"></i>Patient Registration</h2>
            <p className="text-center text-muted mb-4">Securely join our health network</p>
            
            <form onSubmit={reg}>
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-user icon"></i>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="form-control"/>
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-envelope icon"></i>
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="form-control"/>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-phone icon"></i>
                    <input type="number" name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} required className="form-control"/>
                  </div>
                </div>

                {/* Alternate Phone */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-phone-alt icon"></i>
                    <input type="number" name="altnumber" placeholder="Alternate Number" value={form.altnumber} onChange={handleChange} className="form-control"/>
                  </div>
                </div>

                {/* Password */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-lock icon"></i>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="form-control"/>
                  </div>
                </div>

                {/* Age */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-birthday-cake icon"></i>
                    <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="form-control"/>
                  </div>
                </div>

                {/* Blood */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-tint icon"></i>
                    <select name="blood" value={form.blood} onChange={handleChange} required className="form-select">
                      <option value="">-- Blood Group --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-venus-mars icon"></i>
                    <select name="gender" value={form.gender} onChange={handleChange} required className="form-select">
                      <option value="">-- Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="col-12">
                  <div className="form-group position-relative">
                    <i className="fas fa-home icon"></i>
                    <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} rows="3" required className="form-control"/>
                  </div>
                </div>

                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm px-5">Register Now</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reg;
