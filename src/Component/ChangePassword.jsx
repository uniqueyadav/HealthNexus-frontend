import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();


  const doctorId = localStorage.getItem("doctor");
  const patientId = localStorage.getItem("reg");

  const role = doctorId ? "Doctor" : "Patient";
  const id = doctorId || patientId;

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      if (role === "Doctor") {
        url = "/doctor/change-password";
      } else {
        url = "/reg/change-password";
      }

      const response = await API.post(url, {
        id,
        oldPassword,
        newPassword
      });

      toast.success(response.data.msg);
      if(role === "Doctor"){
        navigate("/doctordash")
      }else{
        navigate("/patientdash")
      }

    } catch (error) {
      toast.success("Error changing password");
    }
  };

  return (
    <div className="change-wrapper">
  <div className="change-card">
    <h2>Change Password</h2>

    <form onSubmit={handleChange}>
      <div className="input-group">
        <input
          type="password"
          placeholder="Enter Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Update Password</button>
    </form>
  </div>
</div>
  );
}

export default ChangePassword;