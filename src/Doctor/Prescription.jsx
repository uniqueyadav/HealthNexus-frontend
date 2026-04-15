import React, { useState, useEffect } from 'react';
import API from '../utils/api';

function DocPrescription() {
  const [appointments, setAppointments] = useState([]);
  const [selectedApp, setSelectedApp] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    // 1. Doctor ID fetch kar rahe hain (Ddash.js ke mutabik 'doctor' key use ki hai)
    const docId = localStorage.getItem('doctor') || localStorage.getItem('reg'); 
    
    if (docId) {
      // 2. '/app/d/' use kar rahe hain kyunki ye doctor side hai
      API.get(`/app/d/${docId}`)
        .then(res => {
          // Hum sirf wahi appointments dikhayenge jo 'Confirmed' hain (Optional logic)
          setAppointments(res.data.value || []);
        })
        .catch(err => {
          console.error("Fetch Error:", err);
        });
    }
  }, []);

  const handleMedChange = (index, e) => {
    const updatedMeds = [...medicines];
    updatedMeds[index][e.target.name] = e.target.value;
    setMedicines(updatedMeds);
  };

  const addRow = () => setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);

  const removeRow = (index) => {
    const updatedMeds = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMeds);
  };

  const submitPrescription = async (e) => {
    e.preventDefault();
    if (!selectedApp) return alert("Please select a patient!");

    const appData = appointments.find(a => a._id === selectedApp);
    const docId = localStorage.getItem('doctor') || localStorage.getItem('reg');

    const finalData = {
      appId: appData._id,
      pid: appData.pid._id, // Patient ID from populated appointment
      did: docId,           // Logged in Doctor ID
      medicines,
      advice
    };

    try {
      const res = await API.post('/prescription/add', finalData);
      if (res.data.msg === "Success") {
        alert("Prescription Saved Successfully! 🚀");
        // Form Reset
        setSelectedApp("");
        setMedicines([{ name: "", dosage: "", duration: "" }]);
        setAdvice("");
      }
    } catch (err) {
      console.error("Post Error:", err);
      alert("Failed to send prescription. ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h3 className="text-center text-primary mb-4 fw-bold">Create Medical Prescription</h3>
        <hr />
        <form onSubmit={submitPrescription}>
          <div className="mb-4">
            <label className="fw-bold mb-2">Select Patient Appointment</label>
            <select 
              className="form-select" 
              value={selectedApp} 
              onChange={(e) => setSelectedApp(e.target.value)} 
              required
            >
              <option value="">-- Choose Patient --</option>
              {appointments?.map(app => (
                <option key={app._id} value={app._id}>
                  {app.pid?.name} | Date: {app.date}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Medicines</h5>
            <button type="button" className="btn btn-sm btn-outline-primary text-info" onClick={addRow}>
              + Add Row
            </button>
          </div>

          {medicines.map((m, i) => (
            <div className="row g-2 mb-3 align-items-end" key={i}>
              <div className="col-md-4">
                <label className="small text-muted">Medicine Name</label>
                <input name="name" value={m.name} placeholder="Paracetamol" className="form-control" onChange={e => handleMedChange(i, e)} required />
              </div>
              <div className="col-md-3">
                <label className="small text-muted">Dosage (1-0-1)</label>
                <input name="dosage" value={m.dosage} placeholder="Morning-Night" className="form-control" onChange={e => handleMedChange(i, e)} required />
              </div>
              <div className="col-md-3">
                <label className="small text-muted">Duration</label>
                <input name="duration" value={m.duration} placeholder="5 Days" className="form-control" onChange={e => handleMedChange(i, e)} required />
              </div>
              <div className="col-md-2">
                {medicines.length > 1 && (
                  <button type="button" className="btn btn-outline-danger text-dark w-50" onClick={() => removeRow(i)}>
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="mb-4 mt-4">
            <label className="fw-bold mb-2">Doctor's Advice</label>
            <textarea 
              className="form-control" 
              rows="3" 
              value={advice}
              onChange={e => setAdvice(e.target.value)} 
              placeholder="E.g. Take rest, avoid cold water..."
            ></textarea>
          </div>

          <button className="btn btn-primary w-100 fw-bold py-2 shadow-sm rounded-3">
            Submit & Send Prescription
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocPrescription;