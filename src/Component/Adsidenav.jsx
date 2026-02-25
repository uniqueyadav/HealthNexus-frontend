import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUsers, FaClipboardList, FaComments, FaNewspaper, FaCalendarCheck, FaEnvelopeOpenText } from 'react-icons/fa';

function Adsidenav() {
  const location = useLocation();

  const links = [
    { to: '/dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { to: '/adddoctor', icon: <FaUserMd />, text: 'Add Doctor' },
    { to: '/addpatient', icon: <FaUsers />, text: 'Add Patient' },
    { to: '/viewdoctor', icon: <FaClipboardList />, text: 'View Doctors' },
    { to: '/viewpatient', icon: <FaClipboardList />, text: 'View Patients' },
    { to: '/viewenquiry', icon: <FaEnvelopeOpenText />, text: 'View Enquiry' },
    { to: '/viewappointment', icon: <FaCalendarCheck />, text: 'Appointments' },
    { to: '/viewfeedback', icon: <FaComments />, text: 'Feedback' },
    { to: '/addnews', icon: <FaNewspaper />, text: 'Add News' },
  ];

  return (
    <div
      className="col-md-2 d-flex flex-column p-0 shadow-sm"
      style={{
        background: 'linear-gradient(180deg, #0077b6 0%, #0096c7 100%)',
        minHeight: '92vh',
        color: 'white',
      }}
    >
      <div className="text-center py-4 border-bottom border-light">
        <h5 className="fw-bold mb-0 text-white">Admin Panel</h5>
      </div>

      <ul className="nav flex-column mt-3">
        {links.map((link, index) => (
          <li key={index} className="nav-item my-1">
            <Link
              to={link.to}
              className={`nav-link d-flex align-items-center gap-3 px-4 py-2 fw-semibold rounded-2 ${
                location.pathname === link.to
                  ? 'active-link'
                  : 'text-white'
              }`}
              style={{
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
            >
              <span className="fs-5">{link.icon}</span>
              <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .nav-link:hover {
          background: rgba(255,255,255,0.15);
          color: #fff !important;
          transform: translateX(3px);
        }
        .active-link {
          background: rgba(255,255,255,0.25);
          color: #fff !important;
          box-shadow: inset 3px 0px 0px #ffd60a;
        }
      `}</style>
    </div>
  );
}

export default Adsidenav;
