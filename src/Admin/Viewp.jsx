import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";

function Viewp() {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    altnumber: "",
    email: "",
    password: "",
    age: "",
    blood: "",
    gender: "",
    address: ""
  });

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // ✅ Validate admin login
  const validation = () => {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  };

  // ✅ Fetch patients
  const getPatients = async () => {
    try {
      const res = await API.get("/reg");
      if (res.data.msg === "Success") {
        setPatients(res.data.value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    validation();
    getPatients();
  }, []);

  // ✅ Delete patient
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await API.delete(`/reg/${id}`);
      getPatients();
    }
  };

  // ✅ Edit patient
  const handleEdit = (patient) => {
    setEditId(patient._id);
    setFormData({
      name: patient.name || "",
      number: patient.number || "",
      altnumber: patient.altnumber || "",
      email: patient.email || "",
      password: patient.password || "",
      age: patient.age || "",
      blood: patient.blood || "",
      gender: patient.gender || "",
      address: patient.address || ""
    });
  };

  // ✅ Update patient
  const handleUpdate = async () => {
    try {
      const res = await API.put(`/reg/${editId}`, formData);
      if (res.data.msg === "Success") {
        toast.success("Patient updated successfully ✅");
        setEditId(null);
        getPatients();
      } else {
        toast.error("Update Failed ❌");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Main Content */}
      <div className="row" style={{ height: "92vh", overflow: "auto", background: "#f5f7fb" }}>
        <Adsidenav />
        <div className="col-md-10 px-4 py-4">
          <h3 className="text-center mb-4 fw-bold text-primary">View Patients</h3>

          {/* Edit Form */}
          {editId && (
            <div className="col-md-8 mx-auto p-4 shadow-lg rounded-4 mb-4 bg-white">
              <h5 className="text-center mb-3 text-info">Edit Patient</h5>
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type={key === "email" ? "email" : key === "password" ? "password" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="form-control my-2"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              ))}
              <div className="text-center mt-3">
                <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
                <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Patients Table */}
          <div className="table-responsive shadow rounded-4 bg-white p-3">
            <table className="table table-hover table-bordered table-striped text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Alt Number</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Age</th>
                  <th>Blood</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((p, i) => (
                    <tr key={p._id}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.number}</td>
                      <td>{p.altnumber}</td>
                      <td>{p.email}</td>
                      <td>{p.password}</td>
                      <td>{p.age}</td>
                      <td>{p.blood}</td>
                      <td>{p.gender}</td>
                      <td>{p.address}</td>
                      <td><button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Edit</button></td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-muted py-4">No Patients Found 😕</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Viewp;
