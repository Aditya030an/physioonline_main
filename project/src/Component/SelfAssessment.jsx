import React, { useState } from "react";
// import home1 from "./photos/home-bg.mp4";
import BookSession from "./BookSession";

const SelfAssessment = ({ setShowSelfAssessment }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-opacity-35 bg-black backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg max-w-lg w-full p-6 md:p-10 relative text-center">
        {/* Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
          i
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold mt-7 mb-3">
          Welcome to the first step on your "Holistic Health"!
        </h2>

        {/* Steps */}
        <div className="text-left text-sm md:text-base text-gray-700 space-y-1">
          <p>
            <strong>Step 1 :</strong> You will be assessed on your Physical
            Flexibility and Strength via Yog Asana, stress via simple set of
            questions and also your body pain's and BMI scale.
          </p>
          <p>
            <strong>Step 2 :</strong> You should perform Yog Asana's facing
            camera. Artificial Engine (AI) will correct you if need be.
          </p>
          <p>
            <strong>Step 3 :</strong> Once assessment is done, system will
            generate report showing your overall score and also individual
            muscle strength and flexibility.
          </p>
          <p>
            <strong>Step 4 :</strong> Our Health Transformation manager will
            call you to move ahead on your health journey.
          </p>
          <p>
            <strong>Note :</strong> Self Assessment can only be assessed on
            laptops and android devices.
          </p>
          <p className="font-semibold">Not available on IOS devices</p>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex items-center justify-center gap-3 ">
          <button
            onClick={() => {
              setShowBookingForm(true);
              // setShowSelfAssessment(false);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full py-2 rounded-md transition duration-300"
          >
            Yes, I have it
          </button>
          <button
            onClick={() => {
              setShowSelfAssessment(false);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full py-2 rounded-md transition duration-300"
          >
            No, I don’t
          </button>
        </div>
      </div>
      {/* {showVideo && (
        <div className="absolute top-0 left-0 bg-black w-full h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={home1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )} */}
      {showBookingForm && (
        <BookSession setShowBookingForm={setShowBookingForm} />
      )}
    </div>
  );
};

export default SelfAssessment;
