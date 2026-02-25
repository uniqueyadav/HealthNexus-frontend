import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Adsidenav from "../Component/Adsidenav";
import Footer from "../Component/Footer";
import { FaNewspaper, FaPaperPlane, FaSignOutAlt, FaUserMd } from "react-icons/fa";
import API from "../utils/api";
import { toast } from "react-toastify";

function Addnews() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // ✅ Add News Function
  async function addnews(e) {
    e.preventDefault();
    const news = { title, desc };
    try {
      const response = await API.post("/news", news);
      if (response.data.msg === "Success") {
        toast.success("📰 News Added Successfully!");
        setTitle("");
        setDesc("");
      } else {
        toast.warning("⚠️ Something Went Wrong");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      toast.error("⚠️ Failed to connect with the server");
    }
  }

  // ✅ Validate admin
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
             <FaUserMd className="me-2 fs-3" /> Admin Dashboard </div>
             <div className="col-md-2 ms-auto text-end">
                <button
                  onClick={() => { localStorage.removeItem("admin"); validation(); }} className="btn btn-light fw-bold px-4 py-1 rounded-pill shadow-sm" >
                  <FaSignOutAlt className="me-2" />  Logout
                 </button>
              </div>
           </div>

      {/* ===== Body Section ===== */}
      <div className="row" style={{ minHeight: "92vh", background: "#f5f6fa" }}>
        <Adsidenav />

        {/* ===== Add News Form Section ===== */}
        <div className="col-md-10 p-5">
          <div className="container">
            <div className="card shadow-lg border-0 p-4 rounded-4 form-card mx-auto">
              <div className="text-center mb-4">
                <FaNewspaper className="fs-1 text-primary mb-2" />
                <h3 className="fw-bold text-primary">Add News</h3>
                <p className="text-muted">
                  Create and publish latest updates to your HealthNexus portal
                </p>
              </div>

              <form onSubmit={addnews}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    📝 News Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter headline here..."
                    className="form-control form-control-lg rounded-3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    📄 Description
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Write detailed news description..."
                    rows={5}
                    className="form-control rounded-3"
                    required
                  ></textarea>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill px-5 py-2 d-flex align-items-center gap-2 mx-auto"
                  >
                    <FaPaperPlane /> Publish News
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

export default Addnews;
