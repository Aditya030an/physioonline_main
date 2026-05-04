import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

const Calander = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchUserData = async () => {
    try {
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
        setAppointments(appointmentData);
      } else {
        toast.error(appointmentResponse.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch appointments.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow-md rounded-md p-4 border-l-4 border-purple-600"
              >
                <p className="font-semibold text-lg text-purple-700">{appt.category}</p>
                <p className="text-gray-600">📅 Date: {appt.date}</p>
                <p className="text-gray-600">⏰ Time: {appt.time}</p>
                <p className="text-gray-600">🧑‍⚕️ Type: {appt.bookingType}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calander;
