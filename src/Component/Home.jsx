import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

function Home() {
  const [news,setNews] = useState([]);
  async function getnews() {
    const response = await axios.get('http://localhost:8000/api/news');
    if(response.data.msg=="Success"){
      setNews(response.data.value);
    }
  }
  useEffect(()=>{
    getnews();
  },[])

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("is-visible");
        } else {
          revealElements[i].classList.remove("is-visible");
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // page load par bhi chale

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);
  return (
    <>
    <div className="row">
      <div className="body1 py-4">
        <section className="about">
        <p>
          Online Registration System (ORS) is a Digital India initiative aimed at providing
          online access to hospital services for patients, integrated with Ayushman Bharat Health Account.
        </p>
      </section>

      {/* 🎠 Carousel Section */}
      <section className="carousel">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            
            {/* Slide 1 */}
            <div className="carousel-item active" data-bs-interval="2500">
              <div className="slide slide-blue">
                <div className="slide-content slide1">
                  <p >
                    <strong>Ayushman Bharat Health Account</strong> <br />
                    ABHA is the first step towards creating safer and efficient digital health
                    records for you and your family.
                  </p>
                </div>
                <div className="img1">
                    <img src="img/abdm.png" alt="ABDM" className="slide-img" />
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item" data-bs-interval="2500">
              <div className="slide slide-green">
                <div className="slide-content">
                  <p>
                    Now getting an OPD appointment, lab reports, and blood availability
                    in any government hospital has become online and easy.
                  </p>
                  <Link to="/reg" className="btn yellow mt-3">
                    <i className="fa-solid fa-right-to-bracket"></i> Registration
                  </Link>
                </div>
                <img src="img/ORS1.png" alt="ORS" className="slide-img" />
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item" data-bs-interval="2500">
              <div className="slide slide-blue">
                <div className="slide-content">
                  <p>
                    Online Appointment Booking For Tele-Consultation — Stay Home, e-OPD!
                  </p>
                  <Link to="/reg" className="btn yellow mt-3">
                    <i className="fa-solid fa-right-to-bracket"></i> Registration
                  </Link>
                </div>
                <img src="img/SMS_NEW.png" alt="Tele Consultation" className="slide-img" />
              </div>
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1 mx-auto box1"></div>
            <div className="col-md-3 mx-auto box1 reveal">
              <div className="row py-3">
                <div className="col-md-10 fs-5 fw-bold">BEST CHECKUP</div>
                <div className="col-md-2 text-info fw-bold fs-3">01</div>
              </div>
              <div className="row">
                <div className="col-md-12 fs-5">
                  <p>To eliminate the chances of future health issues it's very important and Lucknow Hospital has been set up to provide access to superior quality diagnostics services.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mx-auto box1 reveal">
              <div className="row py-3">
                <div className="col-md-10 fs-5 fw-bold">ONLINE APPOINTMENT</div>
                <div className="col-md-2 text-info fw-bold fs-3">02</div>
              </div>
              <div className="row">
                <div className="col-md-12 fs-5">
                  <p>Book doctor's appointment online to consult with the best doctors in Lucknow. Visit the best hospital in Lucknow and meet the top doctors for best-class medical facilities</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mx-auto box1 reveal">
              <div className="row py-3">
                <div className="col-md-10 fs-5 fw-bold">24 X 7 AVAILABLE</div>
                <div className="col-md-2 text-info fw-bold fs-3">03</div>
              </div>
              <div className="row">
                <div className="col-md-12 fs-5">
                  <p>We provide around the clock monitoring for mission-critical, customer-facing applications. Our skilled Doctors are ready to respond to and resolve incidents 24/7, 365.</p>
                </div>
              </div>
            </div>
            <div className="col-md-1 mx-auto box1"></div>
          </div>
        </div>
      </div>
      <div className="body1 row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 mx-auto reveal">
              <div className="img-box">
               <img src="img/photo-h.avif" alt="" />
              </div>
            </div>
            <div className="col-md-6 mx-auto mt-5 reveal">
              <div className="row">
                <div className="col-md-3 pb-3">
                    <span><i class="fa-solid fa-arrow-right text-info"></i><span className='fs-5'> About Us</span></span>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h2><span>WELCOME TO</span><span className='text-info'> HEALTHNEXUS</span></h2>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-12 fs-5">
                    <p>We, at Lucknow Hospital provide the highest quality and affordable treatments to our patients. Our hospital is located at Krishna Nagar, Lucknow, Uttar Pradesh. All patients are assured of the best service in a very pleasant and non-stressful atmosphere. Proper attention is paid to hygiene and sanitation. We have the best and most experienced surgeons and specialists treating our patients with utmost care. With our rich knowledge and experience, be assured of quality healthcare services that we provide. We have an unwavering commitment to medical ethics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
  <div className="row g-4">

    {/* Top Doctor */}
    <div className="col-md-4">
      <div className="custom-card text-white bg-gradient-primary h-100">
        <div className="card-body text-center">
          <div className="icon-box mb-3">
            <i className="bi bi-person-badge-fill"></i>
          </div>
          <h4 className="fw-bold">Top Doctor</h4>
          <p className="mt-3">
            Highly experienced and trusted medical professionals ranked 
            based on expertise and patient reviews.
          </p>
        </div>
      </div>
    </div>

    {/* Working Hours */}
    <div className="col-md-4">
      <div className="custom-card bg-gradient-info h-100">
        <div className="card-body">
          <h4 className="fw-bold text-center mb-4">Working Hours</h4>

          <div className="d-flex justify-content-between py-2 border-bottom">
            <span>Monday - Friday</span>
            <span>08:00 - 17:00</span>
          </div>

          <div className="d-flex justify-content-between py-2 border-bottom">
            <span>Saturday</span>
            <span>09:00 - 18:00</span>
          </div>

          <div className="d-flex justify-content-between py-2">
            <span>Sunday</span>
            <span>09:00 - 13:00</span>
          </div>

        </div>
      </div>
    </div>

    {/* Emergency Case */}
    <div className="col-md-4">
      <div className="custom-card text-white bg-gradient-danger h-100">
        <div className="card-body text-center">
          <div className="icon-box mb-3">
            <i className="bi bi-telephone-fill"></i>
          </div>
          <h4 className="fw-bold">Emergency Case</h4>
          <p className="mt-3">
            Emergency calls are answered directly by our experienced 
            Incident Advisors available 24/7.
          </p>
        </div>
      </div>
    </div>

   </div>
  </div>

  <div className="container py-5">
  <div className="col-md-8 mx-auto">

    <div className="text-center fw-bold mb-4 fs-2 text-dark">
      News <span className="text-secondary">/</span>
      <span className="text-primary"> Notice</span>
    </div>

    {/* 👇 Scroll Wrapper */}
    <div className="news-scroll">

      <div className="accordion custom-accordion" id="newsAccordion">
        {news.map((n, index) => (
          <div className="accordion-item custom-item mb-3" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed custom-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {n.title}
              </button>
            </h2>

            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#newsAccordion"
            >
              <div className="accordion-body custom-body">
                {n.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

  </div>
</div>

</div>  
      <Footer></Footer>
    </>
  )
}

export default Home