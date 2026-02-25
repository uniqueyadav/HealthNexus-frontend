import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Adsidenav from '../Component/Adsidenav'
import { FaSignOutAlt, FaUserMd } from 'react-icons/fa';

function Dash() {

  const navigate =useNavigate();
  function validation(){
  const data = localStorage.getItem('admin');
  if(data!="admin@gmail.com"){
    navigate('/admin');
  }
  }
  useEffect(()=>{
     validation();
  },[]);

  return (
    <>
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
      <div className="row" style={{height:"92vh", background:""}} >
           <Adsidenav></Adsidenav>
           <div className="col-md-10  border border-2 border-solid border-dark" style={{overflow:"auto"}}>
             <h3 className='text-center my-4'>Dashboard</h3>
           </div>
      </div>
    </>
  )
}

export default Dash