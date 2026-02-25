import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";

function Viewd() {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    gender: "",
    qua: "",
    exp: "",
    spe: "",
    address: "",
  });
  const [doc, setDoc] = useState([]);
  const navigate = useNavigate();

  const getdoc = async () => {
    const response = await API.get("/doctor");
    if (response.data.msg === "Success") {
      setDoc(response.data.value);
    }
  };

  const validation = () => {
    const data = localStorage.getItem("admin");
    if (data !== "admin@gmail.com") {
      navigate("/admin");
    }
  };

  useEffect(() => {
    validation();
    getdoc();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      await API.delete(`/doctor/${id}`);
      getdoc();
    }
  };

  const handleEdit = (doctor) => {
    setEditId(doctor._id);
    setFormData({
      name: doctor.name || "",
      number: doctor.number || "",
      email: doctor.email || "",
      password: doctor.password || "",
      gender: doctor.gender || "",
      qua: doctor.qua || "",
      exp: doctor.exp || "",
      spe: doctor.spe || "",
      address: doctor.address || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(
        `/doctor/${editId}`,
        formData
      );
      if (res.data.msg === "Success") {
        toast.success("Doctor Updated Successfully ✅");
        setEditId(null);
        getdoc();
      } else {
        toast.error("Update Failed ❌");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <>
      {/* Header Bar */}
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

      {/* Main Section */}
      <div
        className="row"
        style={{ height: "92vh", overflow: "auto", background: "#f5f7fb" }}
      >
        <Adsidenav />

        {/* Content Area */}
        <div
          className="col-md-10 px-4 py-3"
          style={{
            borderLeft: "3px solid #e2e8f0",
            background: "#ffffff",
            borderRadius: "8px 0 0 0",
          }}
        >
          <h3 className="text-center mb-4 fw-bold text-primary">
            Manage Doctors
          </h3>

          {/* Edit Form */}
          {editId && (
            <div className="col-md-10 mx-auto p-4 shadow rounded-4 mb-5 bg-light">
              <h5 className="text-center mb-3 text-dark fw-semibold">
                Edit Doctor Details
              </h5>
              <div className="row g-3">
                {Object.keys(formData).map((key) => (
                  <div className="col-md-6" key={key}>
                    <input
                      type={
                        key === "email"
                          ? "email"
                          : key === "password"
                          ? "password"
                          : "text"
                      }
                      className="form-control rounded-3 shadow-sm"
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-success me-3 px-4" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Table Section */}
          <div className="table-responsive shadow rounded-4 bg-white p-3">
            <table className="table table-hover table-bordered align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Specialist</th>
                  <th>Address</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doc.length > 0 ? (
                  doc.map((d, i) => (
                    <tr key={d._id} style={{ verticalAlign: "middle" }}>
                      <td>{i + 1}</td>
                      <td>{d.name}</td>
                      <td>{d.number}</td>
                      <td>{d.email}</td>
                      <td>{d.password}</td>
                      <td>{d.gender}</td>
                      <td>{d.qua}</td>
                      <td>{d.exp}</td>
                      <td>{d.spe}</td>
                      <td>{d.address}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning px-3"
                          onClick={() => handleEdit(d)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger px-3"
                          onClick={() => handleDelete(d._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-muted py-4">
                      No Doctors Found 😕
                    </td>
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

export default Viewd;
