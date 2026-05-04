import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [reSendOtp, setReSendOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);
  const [value, setValue] = useState("forgot");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("inside frontend", email, value);
    e.preventDefault();
    setLoader(true);
    try {
      if (password !== confirmPassword) {
        toast.error("Password does not match");
        setLoader(false);
        return;
      }
      const response = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password,
        value,
        updatePassword,
      });
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setVerifyOtp(true);
        setReSendOtp(false);
        if (updatePassword) {
          setUpdatePassword(false);
          setConfirmPassword("");
          setVerifyOtp(false);
          setReSendOtp(false);
          setOtp("");
          navigate("/login");
        }
        const expiresAt = new Date(response.data.otpExpires);
        const now = new Date();
        const secondsLeft = Math.floor((expiresAt - now) / 1000);

        setTimer(secondsLeft > 0 ? secondsLeft : 0);
        setCountdownActive(true);
      } else {
        toast.error(response.data.message);
        setEmail("");
        setPassword("");
        setOtp("");
      }
    } catch (error) {
      if (error.response) {
        console.log("Login error:", error.response.data.message);
        toast.error(error.response.data.message); // show user-friendly message
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
    setLoader(false);
  };
  const handleVerifiedOtp = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/api/user/verifiedOtp`, {
        email,
        otp,
      });
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setUpdatePassword(true);
        setVerifyOtp(false);
      } else {
        setReSendOtp(true);
        setVerifyOtp(false);
        setOtp("");
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setReSendOtp(true);
        setVerifyOtp(false);
        setOtp("");
        console.log("Login error:", error.response.data.message);
        toast.error(error.response.data.message); // show user-friendly message
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
    setLoader(false);
  };
  useEffect(() => {
    let interval;
    if (countdownActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0 && countdownActive) {
      setCountdownActive(false);
      setReSendOtp(true);
    }

    return () => clearInterval(interval);
  }, [countdownActive, timer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setVerifyOtp(false);
            }}
            value={email}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {updatePassword && (
            <>
              <input
                name="password"
                type="password"
                placeholder="New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setVerifyOtp(false);
                }}
                value={password}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="confirePassword"
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setVerifyOtp(false);
                }}
                value={confirmPassword}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          {verifyOtp && (
            <>
              <input
                name="otp"
                placeholder="Enter 6 digit Otp"
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                value={otp}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-sm text-gray-600 text-center mt-1">
                OTP will expire in:{" "}
                <span className="font-semibold text-red-500">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              </p>
            </>
          )}

          {verifyOtp && value === "forgot" ? (
            <button
              type="button"
              onClick={handleVerifiedOtp}
              disabled={loader}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loader ? "Loading..." : "Verify Otp"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loader}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loader ? "Loading..." : (reSendOtp ? "Resend Otp" : (updatePassword ? "Update Password" : "Generate Otp"))}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
