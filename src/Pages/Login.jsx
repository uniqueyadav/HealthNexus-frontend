import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import API from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  async function log(e) {
  e.preventDefault();

  if (!role) {
    toast.warning("⚠️ Please Select Role");
    return;
  }

  const user = { email, password, role };

  try {
    let response;

    if (role === "Doctor") {
      response = await API.post("/doctor/login", user);
    } else {
      response = await API.post("/reg/login", user);
    }

    if (response.data.msg === "Success") {
      toast.success("✅ Login Successful!");

      if (role === "Doctor") {
        localStorage.setItem("doctor", response.data.id);
        navigate("/doctordash");
      } else {
        localStorage.setItem("reg", response.data.id);
        navigate("/patientdash");
      }
    } 
    else {
      toast.error("❌ Invalid Credentials");
    }

  } catch (error) {
    console.log(error);
    if (error.response) {
      toast.error(error.response.data.msg || "❌ Invalid Credentials");
    } else {
      toast.error("❌ Server Error");
    }
  }
}
  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          {/* LEFT IMAGE */}
          <div className="row">
            <div className="col-md-8">
              <div className="login-image">
            <img
              src="/img/login.jpg"
              alt="Doctor"
            />
          </div>
            </div>
            <div className="col-md-4">
               <div className="login-form">
            <h2>User Login</h2>

            <form onSubmit={log}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
              <Link to="/forgot-password">Forgot Password?</Link><br />
              <span>Don't have an account</span> <Link to="/reg">Register</Link> <br />
              <button type="submit">Login</button>
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

export default Login;