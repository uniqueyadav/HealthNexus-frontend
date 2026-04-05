import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import API from "../utils/api";

function Adlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function adlog(e) {
    e.preventDefault();
    try {
      const admin = { email, password };
      const response = await API.post("/admin/login", admin);

      if (response.data.msg === "Success") {
        localStorage.setItem("admin", email);
        toast.success("Login Successful ✅");
        setEmail("");
        setPassword("");
        navigate("/admindash");
      } else {
        toast.success("❌ Login failed: " + (response.data.message || "Invalid credentials"));
      }
    } catch (error) {
      toast.success("⚠️ Server error. Please try again later.");
    }
  }

  return (
    <>    
    <div className="login-page">
      <form className="containe" onSubmit={adlog}>
        <h1 className="login-title">👨‍💼 Admin Login </h1>
        <p className="subtitle text-info">Welcome back! Please login to continue</p>
        <section className="input-box">
            <input type="email" name="username" placeholder="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <i className=""></i>
        </section>
        <section className="input-box">
            <input className="text-dark" type="password" name="password" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <i className=""></i>
        </section>
       
        <button className="login-button" type="submit">Login </button>
    </form>
    </div>
      <Footer />
    </>
  );
}

export default Adlogin;
