import React, { useState } from "react";
import Footer from "../Component/Footer";
import API from "../utils/api";
import { toast } from "react-toastify";

function Reg() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    altnumber: "",
    email: "",
    password: "",
    age: "",
    blood: "",
    gender: "",
    address: "",
  });

  // Error state to track validation messages
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Jaise hi user type kare, purani error clear ho jaye
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    // Name Validation
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.length < 3) newErrors.name = "Name must be at least 3 characters";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format";

    // Phone Number Validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.number) newErrors.number = "Phone number is required";
    else if (!phoneRegex.test(form.number)) newErrors.number = "Enter a valid 10-digit number";

    // Password Validation (Strong: 8+ chars, Upper, Lower, Number, Special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = 
        "Password must be 8+ chars, include uppercase, lowercase, number, and a special character (@$!%*?&)";
    }
    // Age Validation
    if (!form.age) newErrors.age = "Age is required";
    else if (form.age < 1 || form.age > 120) newErrors.age = "Enter a valid age";
    if (!form.address.trim()) newErrors.address = "Address is required";

    // Strong Address Validation
    const addressTrimmed = form.address.trim();
    const addressRegex = /[a-zA-Z]/; 
    const invalidKeywords = ["na", "n/a", "nil", "unknown", "none", "null"];

    if (!addressTrimmed) {
      newErrors.address = "Address is required";
    } else if (addressTrimmed.length < 15) {
      newErrors.address = "Please enter a complete address (min 15 characters)";
    } else if (!addressRegex.test(addressTrimmed)) {
      newErrors.address = "Address must contain letters";
    } else if (invalidKeywords.includes(addressTrimmed.toLowerCase())) {
      newErrors.address = "Please provide a valid physical address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const reg = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await API.post("/reg", form);
      if (response.data.msg === "Success") {
        toast.success("✅ Registration successful!");
        setForm({ name: "", number: "", altnumber: "", email: "", password: "", age: "", blood: "", gender: "", address: "" });
        setErrors({});
      } else if (response.data.msg === "Duplicate") {
        toast.warning(`${response.data.field} already exists!`);
      } else {
        toast.warning("⚠️ Something went wrong.");
      }
    } catch (err) {
      toast.error("❌ Server error. Try again later.");
    }
  };

  return (
    <>
      <div className="register-page py-5">
        <div className="container">
          <div className="register-card p-5 shadow-lg rounded-4 mx-auto">
            <h2 className="text-center text-primary mb-3"><i className="fas fa-user-plus me-2"></i>Patient Registration</h2>
            <p className="text-center text-muted mb-4">Securely join our health network</p>
            
            <form onSubmit={reg} noValidate>
              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-user icon"></i>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-envelope icon"></i>
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-phone icon"></i>
                    <input type="text" name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} className={`form-control ${errors.number ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.number}</div>
                  </div>
                </div>

                {/* Alternate Phone (Optional) */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-phone-alt icon"></i>
                    <input type="text" name="altnumber" placeholder="Alternate Number" value={form.altnumber} onChange={handleChange} className="form-control"/>
                  </div>
                </div>

                {/* Password */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-lock icon"></i>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                </div>

                {/* Age */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-birthday-cake icon"></i>
                    <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className={`form-control ${errors.age ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.age}</div>
                  </div>
                </div>

                {/* Blood */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-tint icon"></i>
                    <select name="blood" value={form.blood} onChange={handleChange} className={`form-select ${errors.blood ? 'is-invalid' : ''}`}>
                      <option value="">-- Blood Group --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O">O</option>
                      <option value="NA">NA</option>
                    </select>
                    <div className="invalid-feedback">{errors.blood}</div>
                  </div>
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <i className="fas fa-venus-mars icon"></i>
                    <select name="gender" value={form.gender} onChange={handleChange} className={`form-select ${errors.gender ? 'is-invalid' : ''}`}>
                      <option value="">-- Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                    <div className="invalid-feedback">{errors.gender}</div>
                  </div>
                </div>

                {/* Address */}
                <div className="col-12">
                  <div className="form-group position-relative">
                    <i className="fas fa-home icon"></i>
                    <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} rows="3" className={`form-control ${errors.address ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.address}</div>
                  </div>
                </div>

                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm px-5">Register Now</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reg;