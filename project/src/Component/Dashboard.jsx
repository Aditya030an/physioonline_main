import React, { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { HiOutlineHome, HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineEditNote } from "react-icons/md";
import FillPersonalDetails from "./fillPersonalDetails";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

import Calander from "./Calander";
import FAQ from "./FAQ";
import Statics from "./Statics";
import Todo from "./Todo";
import SelfAssessment from "./SelfAssessment";
import BookSession from "./BookSession";
import { FaPlay, FaDownload } from "react-icons/fa";
import music from "./photos/meditation.mp3";

const Dashboard = () => {
  const router = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const [showPersonalDetailForm, setShowPersonalDetailForm] = useState(false);
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  // const currentDate = new Date().toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });

  const [personalDetailFilled, setPersonalDetailFilled] = useState(false);
  useEffect(() => {
    const checkPersonalDetailFilled = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/userDetails/getUserPersonalDetails`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log("response", response);
        if (response.data.success) {
          setPersonalDetailFilled(true);
        }
      } catch (err) {
        console.log("err", err);
        toast.error(err.message);
      }
    };
    checkPersonalDetailFilled();
  }, []);

  const [activeView, setActiveView] = useState("home");

  return (
    <div
      className="min-h-screen w-full flex bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588776814546-b102d4f4b908?fit=crop&w=1470&q=80')",
      }}
    >
      {/* Sidebar */}
      <div className="w-16 md:w-20 bg-white bg-opacity-80 flex flex-col items-center py-6 space-y-6 shadow-lg">
        <div className="text-purple-600 text-3xl font-bold cursor-pointer" onClick={() => router("/")} >X</div>
        <HiOutlineHome
          className={`text-2xl cursor-pointer ${
            activeView === "home" ? "text-purple-600" : "text-gray-600"
          }`}
          onClick={() => setActiveView("home")}
        />
        <FaCalendarAlt
          className={`text-2xl cursor-pointer ${
            activeView === "calender" ? "text-purple-600" : "text-gray-600"
          }`}
          onClick={() => setActiveView("calendar")}
        />
        <MdOutlineEditNote
          className={`text-2xl cursor-pointer ${
            activeView === "todo" ? "text-purple-600" : "text-gray-600"
          }`}
          onClick={() => setActiveView("todo")}
        />
        <FaChartBar
          className={`text-2xl cursor-pointer ${
            activeView === "statistics" ? "text-purple-600" : "text-gray-600"
          }`}
          onClick={() => setActiveView("statistics")}
        />
        <HiOutlineSpeakerphone
          className={`text-2xl cursor-pointer ${
            activeView === "faq" ? "text-purple-600" : "text-gray-600"
          }`}
          onClick={() => setActiveView("faq")}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-4 text-white">
        <div className="flex items-center gap-2 justify-end">
          <button className="text-white px-4 rounded-full bg-purple-600 text-sm py-1 cursor-pointer">
            Refer A Friend
          </button>

          <button
            onClick={() => setShowBookingForm(true)}
            className="text-white px-4 rounded-full bg-purple-600 text-sm py-1 cursor-pointer"
          >
            Book A Session
          </button>
        </div>
        {/* Top bar remains the same */}
        {activeView === "home" && (
          <>
            {/* All the original sections like Plan, Meditation, Fill details */}
            <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-md border-l-4 border-red-500 text-black">
              <p className="font-semibold text-red-600">No Active Plan</p>
              <p className="text-sm">
                You don't have an active subscription. Contact your{" "}
                <span className="text-purple-600 font-semibold underline cursor-pointer">
                  Health Transformation Manager
                </span>{" "}
                to subscribe and start the "Holistic Health" journey.
              </p>
            </div>

            <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-md text-black flex justify-between items-center">
              <div>
                <p>
                  Hello,{" "}
                  <span className="capitalize font-medium">atharva gupta</span>
                </p>
                <p className="text-sm text-gray-500">No Session Scheduled</p>
              </div>
              <button
                onClick={() => {
                  setShowSelfAssessment(true);
                }}
                className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm"
              >
                Self Assessment
              </button>
            </div>

            <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-md text-black flex justify-between items-center">
              <div>
                <p className="font-medium">Meditation for today</p>
                <p className="text-sm text-gray-600">
                  Higher-Self Meditation – Integration of the Higher Self into
                  Daily Life
                </p>
              </div>
              <div className="flex space-x-2">
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm flex items-center"
                  >
                    <FaPlay className="mr-2" /> Play
                  </button>
                )}

                {isPlaying && (
                  <audio ref={audioRef} controls className="flex items-center">
                    <source src={music} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                )}

                <button className="bg-gray-200 text-black px-4 py-1 rounded-full text-sm flex items-center">
                  <FaDownload className="mr-2" /> Download
                </button>
              </div>
            </div>

            {!personalDetailFilled && (
              <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-md text-black flex justify-between items-center">
                <p className="font-medium">
                  Please fill the basic details for demo
                </p>
                <button
                  onClick={() => setShowPersonalDetailForm(true)}
                  className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm"
                >
                  Fill Details
                </button>
              </div>
            )}
          </>
        )}

        {activeView === "calendar" && <Calander />}

        {activeView === "todo" && <Todo />}

        {activeView === "statistics" && <Statics />}

        {activeView === "faq" && <FAQ />}
      </div>

      {showPersonalDetailForm && (
        <FillPersonalDetails
          setShowPersonalDetailForm={setShowPersonalDetailForm}
        />
      )}

      {showSelfAssessment && (
        <SelfAssessment setShowSelfAssessment={setShowSelfAssessment} />
      )}

      {showBookingForm && (
        <BookSession setShowBookingForm={setShowBookingForm} />
      )}
    </div>
  );
};

export default Dashboard;
