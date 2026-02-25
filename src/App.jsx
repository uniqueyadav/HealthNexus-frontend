import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Adlogin from './Pages/Adlogin';
import Addash from './Admin/Addash';
import Addd from './Admin/Addd';
import Addp from './Admin/Addp';
import Viewp from './Admin/Viewp';
import Viewfeed from './Admin/Viewfeed';
import Viewd from './Admin/Viewd';
import Viewenquiry from './Admin/Viewenquiry';
import Addnews from './Admin/Addnews';
import Viewapp from './Admin/Viewapp';
import Reg from './Pages/Reg';
import Login from './Pages/Login';
import Ddash from './Component/Ddash';
import Pdash from './Component/Pdash';
import Pappointment from './Patient/Pappointment';
import Dappointment from './Doctor/Dappointment';
import Preqapp from './Patient/Preqapp';
import Pfeed from './Patient/Pfeed';
import Penapp from './Doctor/Penapp';
import Canapp from './Doctor/Canapp';
import Conapp from './Doctor/Conapp';
import Comapp from './Doctor/Comapp';
import Pviewfeed from './Patient/Pviewfeed';
import Home from './Component/Home';
import Header from './Component/Header';
import ChangePassword from './Component/ChangePassword';
import ForgotPassword from './Pages/ForgotPassword';
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="container-fluid">
      

      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/admin' element={<Adlogin/>} />
        <Route path='/patientdash' element={<Pdash/>} />
        <Route path='/doctordash' element={<Ddash/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/reg' element={<Reg/>} />
        <Route path='/dashboard' element={<Addash/>} />
        <Route path='/admindash' element={<Addash/>} />
        <Route path='/addpatient' element={<Addp/>} />
        <Route path='/adddoctor' element={<Addd/>} />
        <Route path='/viewdoctor' element={<Viewd/>} />
        <Route path='/viewpatient' element={<Viewp/>} />
        <Route path='/viewfeedback' element={<Viewfeed/>} />
        <Route path='/viewenquiry' element={<Viewenquiry/>} />
        <Route path='/addnews' element={<Addnews/>} />
        <Route path='/viewappointment' element={<Viewapp/>} />
        <Route path='/patientappointment' element={<Pappointment/>} />
        <Route path='/preqappointment' element={<Preqapp/>} />
        <Route path='/patientfeed' element={<Pfeed/>} />
        <Route path='/doctorappointment' element={<Dappointment/>} />
        <Route path='/pendingapp' element={<Penapp/>} />
        <Route path='/cancelapp' element={<Canapp/>} />
        <Route path='/confirmeapp' element={<Conapp/>} />
        <Route path='/completeapp' element={<Comapp/>} />
        <Route path='/patientviewfeed' element={<Pviewfeed/>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>

     </div>
    </>
  )
}

export default App
