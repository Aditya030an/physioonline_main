import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/navbar.jsx";
import Home from "./Component/Home";
import Offering from "./Component/Offering.jsx";
import Appointment from "./Component/Appointment.jsx";
import Process from "./Component/Process.jsx";
import About from "./Component/About.jsx";
import Service from "./Component/Service.jsx";
import Book from "./Component/Book.jsx";
import Onlineprocess from "./Component/Onlineprocess.jsx";
import Footer from "./Component/Footer.jsx";
import ForgotPassword from "./Component/ForgotPassword.jsx";
import Login from "./Component/Login.jsx";
import Signup from "./Component/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Component/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Calander from "./Component/Calander.jsx";
import Todo from "./Component/Todo.jsx";
import Statics from "./Component/Statics.jsx";
import FAQ from "./Component/FAQ.jsx";
import Physioconnect from "./Component/Physioconnect.jsx"
import Blogs from "./Component/Blogs.jsx"
import Profile from "./Component/profile.jsx"
import Permises from "./Component/permises.jsx"
import chatbot from "./Component/Chatbot.jsx"
function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Define routes for Home only */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="Appointment" element={<Appointment />} />
          <Route path="Book" element={<Book />} />
          <Route path="About" element={<About />} />
          <Route path="Offering" element={<Offering />} />
          <Route path="Service" element={<Service />} />
          <Route path="Onlineprocess" element={<Onlineprocess />} />
          <Route path="Process" element={<Process />} />
          <Route path="Physioconnect" element={<Physioconnect />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Permises" element={<Permises />} />
          
          <Route path="chatbot" element={<chatbot />} />
          <Route
            path="Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
          <Route path="/calander" element={<Calander />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer></Footer>

        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;


