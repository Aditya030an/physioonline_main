import React, { useState, useEffect } from "react";
import Onlineprocess from "./Onlineprocess";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
const Book = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [previousBookingTime, setPreviousBookingTime] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    time: "",
    date: "",
    category: "",
  });

 const timeSlots = [];

let currentTime = new Date();
let currentHour = currentTime.getHours();

// Round up to next hour if minutes > 0
if (currentTime.getMinutes() > 0) {
  currentHour += 1;
}

const endHour = 19; // 7:00 PM

for (let hour = currentHour; hour <= endHour; hour++) {
  let period = hour < 12 ? "am" : "pm";
  let displayHour = hour % 12 === 0 ? 12 : hour % 12;
  let formattedHour = `${displayHour}:00 ${period}`;
  timeSlots.push(formattedHour);
}

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`${API_URL}/api/user/getUser`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (userResponse.data.success) {
        setFormData((prev) => ({
          ...prev,
          name: userResponse?.data?.user?.name,
          email: userResponse?.data?.user?.email,
          phoneNumber: userResponse?.data?.user?.phoneNumber,
        }));
      } else {
        toast.error(userResponse.data.message);
      }

      const appointmentResponse = await axios.get(
        `${API_URL}/api/bookAppointment/getUserBookingAppointment`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (appointmentResponse.data.success) {
        const appointmentData = appointmentResponse.data.data;
        console.log("appointmentData", appointmentData);
        if (appointmentData.length > 0) {
          setPreviousBookingTime(appointmentData.map((appt) => appt?.time));
        }
      } else {
        toast.error(appointmentResponse.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

    useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, date: today }));
    }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }else{
      toast.info("Please login first");
      navigate("/login");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict only numbers in phone input and limit to 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // only digits
      if (value.length > 10) return; // max 10 digits
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = "Full name is required.";
    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be 10 digits.";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!formData?.category) newErrors.category = "Please select a category.";
    if (!formData?.time) newErrors.time = "Please select a time.";

    // if (!isChecked) newErrors.terms = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookAppointment = async (e) => {
    if(!token){
      toast.info("Please login first");
      navigate("/login");
    }
    e.preventDefault();
    console.log("formData", formData);
    if (validate()) {
      try {
        const response = await axios.post(
          `${API_URL}/api/bookAppointment/createAppointment`,
          {
            ...formData,
            bookingType: "online",
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
              category: "",
            time: "",
          });
          fetchUserData();
          const today = new Date().toISOString().split("T")[0];
          setFormData((prev) => ({ ...prev, date: today }));
          // setIsChecked(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please fix the errors before booking.");
    }
  };
  return (
    <div>
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-[#F1FAEE] text-[#457B9D] px-6 md:px-16 py-12">
        {/* Left Section - Hero Text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold">
            Book <span className="text-yellow-500">Online Physiotherapy</span>{" "}
            <br />
            Consultation Now
          </h1>
        </div>

        {/* Right Section - Booking Form */}
        <div className="relative w-full md:w-1/3 mt-16 md:mt-24">
          <div className="bg-white text-[#457B9D] rounded-lg shadow-lg p-6 md:p-8 relative">
            {/* Icon at Top */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 rounded-full p-3 border-4 border-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3209/3209990.png"
                alt="Doctor Icon"
                className="w-10 h-10"
              />
            </div>

            {/* Form Heading */}
            <h2 className="text-xl font-semibold text-center mt-6">
              Online Consultation
            </h2>

            {/* Form Inputs */}
            <form onSubmit={handleBookAppointment}>
              <div className="mt-4">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-2 border rounded mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">Mobile Number*</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Your contact number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-2 border rounded mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-2 border rounded mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

               <div className="mt-4">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Category</option>
                <option>Physiotherapy</option>
                <option>Fitness</option>
                <option>Nutrition</option>
                <option>Wellness</option>
                <option>Rehabilitation</option>
                <option>Joint Pain</option>
                <option>Knee Pain</option>
                <option>Back Pain</option>
                <option>Neck Pain</option>
                <option>Shoulder Pain</option>
                <option>Sports Injuries</option>
                <option>Arthritis Care</option>
                <option>Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

             <div className="mt-4">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

              <div className="mt-4">
                <label className="text-sm font-medium">
                  Preferred Consultation Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Time</option>
                  {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <option
                      key={slot}
                      value={slot}
                      disabled={previousBookingTime.includes(slot)}
                    >
                      {slot} {previousBookingTime.includes(slot) && "(Booked)"}
                    </option>
                  ))
                ) : (
                  <option value="">No slots available</option>
                )}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>

              <p className="text-xs mt-4">
                *I authorize the physiotherapy team to contact me for my online
                session.
              </p>

              <button
                type="submit"
                className="w-full bg-[#457B9D] text-white font-bold py-3 rounded mt-4 hover:bg-[#345E72] transition"
              >
                Book consultationSESSION →
              </button>
            </form>
          </div>
        </div>
      </div>
      <Onlineprocess></Onlineprocess>
    </div>
  );
};

export default Book;
