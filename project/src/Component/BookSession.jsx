import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

const BookSession = ({setShowBookingForm}) => {
    const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [previousBookingTime, setPreviousBookingTime] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [loading , setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    category: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  // const timeSlots = [];
  // for (let hour = 7; hour <= 19; hour++) {
  //   const formattedHour =
  //     hour < 12
  //       ? `${hour < 10 ? "0" + hour : hour}:00 am`
  //       : `${hour - 12}:00 pm`;
  //   timeSlots.push(formattedHour);
  // }

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

    if (!isChecked) newErrors.terms = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
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

  console.log("previous booked " , previousBookingTime);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }else{
      toast.info("Please login first");
      navigate("/login");
    }
  }, [token]);

  const handleBookAppointment = async () => {
    setLoading(true);
    if(!token){
      toast.info("Please login first");
      navigate("/login");
    }
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
            setLoading(false);
          toast.success(response.data.message);
          setFormData({
            category: "",
            time: "",
          });
          setShowBookingForm(false);
        } else {
            setLoading(false);
          toast.error(response.data.message);
        }
      } catch (err) {
      setLoading(false);
        console.log(err);
      }
    } else {
        setLoading(false);
      toast.error("Please fix the errors before booking.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-opacity-35 bg-black backdrop-blur-sm flex items-center justify-center">
         <div className="relative flex flex-col items-center justify-center py-10 px-6 bg-gray-50 max-w-6xl w-full rounded-xl">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          Book Free Session
        </h2>
        <div className="absolute top-7 right-7 cursor-pointer" onClick={()=>{setShowBookingForm(false)}}>❌</div>
        <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                readOnly={token ? true : false}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                readOnly={token ? true : false}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Id"
                readOnly={token ? true : false}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
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

            <div>
              <input
                type="date"
                name="date"
                value={formData.date}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
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
          </div>

          <div className="flex items-start space-x-2 mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mt-1 h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 cursor-pointer"
            />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              I have read and agree to physio
              <a href="#" className="text-yellow-400 font-semibold ml-1">
                Terms of Use
              </a>{" "}
              and
              <a href="#" className="text-yellow-400 font-semibold ml-1">
                Privacy Policy
              </a>
              .
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </label>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleBookAppointment}
              className="px-10 py-4 bg-yellow-400 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all"
            >
              {loading ? "Booking..." : "Book a Free Demo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSession