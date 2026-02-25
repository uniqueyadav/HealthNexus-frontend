import React from 'react'
import {Link, useNavigate } from 'react-router-dom';


function Footer() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 bg-info mt-5">
          <div className="row">
            <div className="col-md-3 mx-auto py-4 bg-info">
              <h4 className='namm'><span className='text-white'>HEALTH</span><span className='text-secondary'>NEX</span><span className='text-primary'>US</span></h4>
              <span className='mt-5 '><span className=' fs-5' >HealthNexus</span> is Healthcare platform connecting Doctors, Hospitals, Home care service providers, Pharmacies & Laboratories with the patients. Facilitating Online Appointment, Online Consultation Text as well Video, Door Delivery of Health packages, Lab Sample Collection at Home</span>
              <div className="row py-5">
                <div className="col-md-3 mx-auto">
                  <i className=" fs-2 rounded-circle fa-brands fa-twitter"></i>
                </div>
                <div className="col-md-3 mx-auto">
                  <i className=" fs-2 rounded-circle fa-brands fa-facebook"></i>
                </div>
                <div className="col-md-3 mx-auto">
                  <i className=" fs-2 rounded-circle fa-brands fa-youtube"></i>
                </div>
                <div className="col-md-3 mx-auto">
                  <i className=" fs-2 rounded-circle fa-brands fa-linkedin"></i>
                </div>
              </div>
            </div>
            <div className="col-md-2 mx-auto py-4 bg-info">
              <h4 className='namm'><span className='text-primary'>OUR  </span><span className='text-white'>DEPARTMENT</span></h4>
              <div className="mt-4">
               <Link className="lin">Outpatient Department</Link>
               <hr />
               <Link className="lin">Pediatrics Department</Link>
               <hr />
               <Link className="lin">Neurology Department</Link> 
               <hr />
               <Link className="lin">Dental Department</Link>
               <hr />
               <Link className="lin">Cardiology Department</Link>
               <hr />
               <Link className="lin"> Diagnostic Department</Link>
              </div>
            </div>
            <div className="col-md-2 mx-auto py-4 bg-info">
              <h4 className='namm'><span className='text-primary'>QUICK </span><span className='text-white'>LINKS</span></h4>
               <div className="mt-4">
               <Link className="lin">About US</Link>
               <hr />
               <Link className="lin">Contact US</Link>
               <hr />
               <Link className="lin">Privacy Policy</Link> 
               <hr />
               <Link className="lin">Terms & Conditions</Link>
               </div>
            </div>
            <div className="col-md-3 mx-auto py-4 bg-info">
              <h4 className='namm'><span className='text-primary'>GET IN </span><span className='text-white'>TOUCH</span></h4>
              <div className="mt-4">
                <span className='fs-5'><i className="fa-solid fa-location-dot  text-primary fs-2"></i><span  className='text-white'> B 1,Behind Krishna Nagar Metro Station, Sindhu Nagar, Manas Nagar,Kanpur Road, Krishna Nagar, Lucknow, Uttar Pradesh 226005</span></span>
                <hr />
                <div className="mt-4">
                  <span><i className="fa-regular fa-envelope text-primary fs-2 "></i><span className='text-white fs-5'> healthnexus.system@gmail.com</span></span><hr />
                  <span><i className="fa-solid fa-phone text-primary fs-2 "></i><span className='text-white fs-5'> +91 8175864835</span></span>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className="row-12 designedby">
          <div className="col-md-12  text-center text-white">
            <span >Copyright 2025 Designed By AMIT YADAV | All Rights Reserved</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer