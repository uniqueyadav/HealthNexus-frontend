import React from "react";
import { Link } from "react-router-dom";


 function Header() {
  return (
    <>
      {/* 🌐 Top Header */}
      <div className="row">
      <header className="top-header ">
        <div className="left">
          <div className="logo-section">
            <div className="logo-icon">+</div>
            <div className="logo-text">
              <span>MEDICAL CORE</span>
            </div>
            <h5 className="initiative">A DIGITAL INDIA INITIATIVE</h5>
          </div>
          
        </div>

        <nav className="header-links">
          <Link to="#" className="link">FAQs</Link>
          <Link to="#" className="link">Feedback</Link>
          <Link to="#" className="link">Contact</Link>
          <Link to="#" className="link">List of Nodal Officers</Link>
        </nav>
      </header>

      {/* 🧭 Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-left">
          <img src="/img/ors_logo.png" alt="ORS Logo" className="ors-logo" />
          <h2>Online Hospital Information System</h2>
        </div>

        <div className="nav-right">
          <Link to="/" className="icon-btn"><i className="fa-solid fa-house"></i></Link>
          <Link to="/admin" className="btn green">Admin Login</Link>
          <Link to="/login" className="btn blue">
            <i className="fa-solid fa-address-card"></i> Login
          </Link>
          <Link to="/reg" className="btn yellow">
            <i className="fa-solid fa-right-to-bracket"></i> Registration
          </Link>
        </div>
      </nav>

      {/* 🩺 About Section */}
      </div>
     
    </>
  );
}


export default Header