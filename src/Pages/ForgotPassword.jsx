import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

function ForgotPassword() {

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!role) {
      toast.success("⚠️ Please Select Role!");
      return;
    }

    const url =
      role === "Doctor"
        ? "/doctor/forgot-password"
        : "/reg/forgot-password";

    const res = await API.post(url, { email });
    toast.success(res.data.msg);
    if (res.data.msg.includes("OTP")) {
      setStep(2);
    }
  };

  const resetPassword = async () => {
    const url =
      role === "Doctor"
        ? "/doctor/reset-password"
        : "/reg/reset-password";

    const res = await API.post(url, {
      email,
      otp,
      newPassword
    });

    toast.success(res.data.msg);
    navigate("/login")
  };

  return (
    <div className="change-wrapper">
      <div className="change-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
              <select  onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>

            <input className="input-group py-1"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input className="input-group py-1"
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input className="input-group py-1"
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={resetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;