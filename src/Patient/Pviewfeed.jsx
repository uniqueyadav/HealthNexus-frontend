import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';
import API from '../utils/api';

function Pviewfeed() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");
  const [editMsg, setEditMsg] = useState("");

  // ✅ Fetch feedback
  const getFeed = async () => {
    try {
      const response = await axios.get(
        `/feed/u/${localStorage.getItem("reg")}`
      );
      if (response.data.msg === "Success") {
        setFeedback(response.data.value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Validate login
  const validation = () => {
    if (!localStorage.getItem("reg")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    validation();
    getFeed();
  }, []);

  // ✅ Delete feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`/feed/${id}`);
        alert("Feedback deleted ✅");
        getFeed();
      } catch (err) {
        console.error(err);
        alert("Failed to delete feedback ❌");
      }
    }
  };

  // ✅ Edit feedback
  const handleEdit = (feed) => {
    setEditId(feed._id);
    setEditType(feed.type);
    setEditMsg(feed.msg);
  };

  // ✅ Update feedback
  const handleUpdate = async (id) => {
    try {
      await API.put(`/feed/${id}`, {
        type: editType,
        msg: editMsg,
      });
      alert("Feedback updated ✅");
      setEditId(null);
      getFeed();
    } catch (err) {
      console.error(err);
      alert("Failed to update feedback ❌");
    }
  };

  return (
    <>
      <div className="row py-3 bg-primary text-white shadow-sm">
        <div className="col-md-1 ms-3">
          <div className="dropdown">
            <button
              className="btn btn-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/patientdash" className="dropdown-item">Dashboard</Link></li>
              <li><Link to="/patientappointment" className="dropdown-item">Appointment</Link></li>
              <li><Link to="/preqappointment" className="dropdown-item">Request Appointment</Link></li>
              <li><Link to="/patientfeed" className="dropdown-item">Feedback</Link></li>
              <li><Link to="/patientviewfeed" className="dropdown-item">View Feedback</Link></li>
              <li><Link to={"/change-password"} className="dropdown-item">Change Password</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 text-center">
         <h4>Patient Dashboard</h4>
        </div>
        <div className="col-md-1 ms-auto  ">
            <button className="btn btn-outline-light fw-bold rounded-3"data-bs-toggle="modal"data-bs-target="#logoutModal">Logout</button>
        </div>
      </div>
      {/* log out box */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("reg");
                  navigate("/login",{replace:true});
                  window.location.reload();
                }}
              >
                Yes, Logout
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* Page Title */}
      <h3 className="text-center py-4 text-primary">View Feedback</h3>

      <div className="row">
        <div className="col-md-10 mx-auto table-responsive shadow-lg rounded-4 bg-white p-4">
          <table className="table table-bordered table-hover table-striped text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Message</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedback.length > 0 ? (
                feedback.map((feed, i) => (
                  <tr key={feed._id}>
                    <td>{i + 1}</td>
                    <td>
                      {editId === feed._id ? (
                        <select
                          className="form-select"
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                        >
                          <option value="Feedback">Feedback</option>
                          <option value="Complain">Complain</option>
                          <option value="Suggestion">Suggestion</option>
                        </select>
                      ) : (
                        feed.type
                      )}
                    </td>
                    <td>
                      {editId === feed._id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editMsg}
                          onChange={(e) => setEditMsg(e.target.value)}
                        />
                      ) : (
                        feed.msg
                      )}
                    </td>
                    <td>
                      {editId === feed._id ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(feed._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(feed)}>
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(feed._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted py-3">
                    No feedback found 😕
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Pviewfeed;
