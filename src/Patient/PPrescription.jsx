import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

function PPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Patient ID fetch kar rahe hain
    const pid = localStorage.getItem('reg');

    if (pid) {
      // Backend se is patient ki sari prescriptions mangwa rahe hain
      API.get(`/prescription/patient/${pid}`)
        .then((res) => {
          if (res.data.msg === "Success") {
            setPrescriptions(res.data.value || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching prescriptions:", err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="bg-primary text-white py-3 shadow-sm mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-file-medical me-2"></i>My Prescriptions</h4>
          <Link to="/patientdash" className="btn btn-outline-light btn-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading your medical records...</p>
          </div>
        ) : prescriptions.length > 0 ? (
          <div className="row">
            {prescriptions.map((pres, index) => (
              <div className="col-md-12 mb-4" key={pres._id}>
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center py-3">
                    <div>
                      <h6 className="mb-0 text-primary">Prescription #{prescriptions.length - index}</h6>
                      <small className="text-muted">Date: {pres.date}</small>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-info text-dark">Dr. {pres.did?.name || "Specialist"}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="fw-bold mb-3"><i className="fas fa-pills me-2 text-danger"></i>Medicines</h6>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Medicine Name</th>
                            <th>Dosage (M-A-N)</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pres.medicines.map((med, i) => (
                            <tr key={i}>
                              <td className="fw-bold">{med.name}</td>
                              <td><span className="badge border text-primary">{med.dosage}</span></td>
                              <td>{med.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {pres.advice && (
                      <div className="mt-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                        <strong><i className="fas fa-info-circle me-2 text-warning"></i>Doctor's Advice:</strong>
                        <p className="mb-0 mt-1">{pres.advice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="fas fa-folder-open fa-4x text-muted mb-3"></i>
            <h5>No prescriptions found yet.</h5>
            <p className="text-muted">When a doctor issues a prescription, it will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PPrescription;