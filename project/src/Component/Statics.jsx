import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

const Statics = () => {
  const [appointments, setAppointments] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

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
        calculateStats(appointmentData);
      } else {
        toast.error(appointmentResponse.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch appointments.");
    }
  };

  const calculateStats = (data) => {
    const stats = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    const formatted = Object.entries(stats).map(([category, count]) => ({
      category,
      count,
    }));
    setCategoryStats(formatted);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Appointment Statistics
        </h1>

        {categoryStats.length === 0 ? (
          <p className="text-center text-gray-500">No data to display.</p>
        ) : (
          <>
            {/* Bar Chart */}
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed List */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                Detailed Appointments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appt) => (
                  <div
                    key={appt._id}
                    className="bg-white p-4 rounded-md shadow border-l-4 border-blue-500"
                  >
                    <p className="font-semibold">{appt.category}</p>
                    <p className="text-gray-600 text-sm">📅 {appt.date}</p>
                    <p className="text-gray-600 text-sm">⏰ {appt.time}</p>
                    <p className="text-gray-600 text-sm">📡 {appt.bookingType}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Statics;
