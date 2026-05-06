import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/navbar.jsx";
import Home from "./Component/Home";
import Offering from "./Component/Offering.jsx";
import Appointment from "./Component/Appointment.jsx";

import About from "./Component/About.jsx";
import Service from "./Component/Service.jsx";

import Footer from "./Component/Footer.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Blogs from "./Component/Blogs.jsx";

import chatbot from "./Component/Chatbot.jsx";
function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Define routes for Home only */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Appointment" element={<Appointment />} />

          <Route path="About" element={<About />} />
          <Route path="Offering" element={<Offering />} />
          <Route path="Service" element={<Service />} />

          <Route path="Blogs" element={<Blogs />} />

          <Route path="chatbot" element={<chatbot />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer></Footer>

        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
