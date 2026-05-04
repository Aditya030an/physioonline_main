import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";
const FillPersonalDetails = ({ setShowPersonalDetailForm }) => {
  const questions = [
    "What is your name?",
    "What is your email?",
    "What is your age?",
    "What is your gender?",
    "What city you are from?",
    "What is your profession?",
    "What are your hobbies?",
    "What languages do you speak?",
    "Tell us about yourself.",
  ];

  const fieldNames = [
    "name",
    "email",
    "age",
    "gender",
    "city",
    "profession",
    "hobbies",
    "language",
    "about",
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[step].trim() === "") return;
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers[step].trim() === "") return;

    const formData = new FormData();
    fieldNames.forEach((field, index) => {
      formData.append(field, answers[index]);
    });

const payload = {};
fieldNames.forEach((field, index) => {
  payload[field] = answers[index];
});
console.log("payload" , payload);
    const response = await axios.post(
      `${API_URL}/api/userDetails/createUserPersonalDetails`,
      payload,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("response", response);
    if (response.data.success) {
      toast.success(response.data.message);
      setShowPersonalDetailForm(false);
    }else{
        toast.error(response.data.message);
    }

  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-opacity-35 bg-black backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white shadow-lg rounded-2xl w-[90%] max-w-xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-1">Tell us about you!</h2>
            <p className="text-sm text-gray-500">
              Question: {step + 1} of {questions.length}
            </p>
          </div>

          <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
            <div
              className="h-full bg-purple-400 rounded-full"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="relative flex items-start">
            {/* Step Indicator */}
            <div className="flex flex-col items-center mr-4 pt-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-lg flex items-center justify-center font-medium text-gray-700">
                {step + 1}
              </div>
              <div className="w-1 h-full bg-purple-400 mt-2 rounded-full" />
            </div>

            {/* Main Form */}
            <div className="flex-1">
              <p className="text-lg font-medium mb-3">{questions[step]}</p>
              <input
                type="text"
                name={fieldNames[step]}
                value={answers[step]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                placeholder="Type your answer..."
              />

              {step === questions.length - 1 ? (
                <button
                  type="submit"
                  disabled={answers[step].trim() === ""}
                  className={`${
                    answers[step].trim() === ""
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-purple-400 hover:bg-purple-500"
                  } text-white font-semibold py-2 px-6 rounded-full transition duration-300`}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[step].trim() === ""}
                  className={`${
                    answers[step].trim() === ""
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-purple-400 hover:bg-purple-500"
                  } text-white font-semibold py-2 px-6 rounded-full transition duration-300`}
                >
                  Next
                </button>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Your information is saved to provide you with the best results.
              </p>
            </div>
          </div>
        </form>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowPersonalDetailForm(false)}
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillPersonalDetails;
