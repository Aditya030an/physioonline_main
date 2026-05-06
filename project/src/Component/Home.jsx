import Appointment from "./Appointment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaArrowRight } from "react-icons/fa";
import Offering from "./Offering";
import Chatbot from "./Chatbot";
import raw1 from "./photos/raw1.jpg";
import raw2 from "./photos/raw2.jpg";
import raw3 from "./photos/raw3.jpg";
import raw4 from "./photos/raw4.jpg";
import raw5 from "./photos/raw5.jpg";
import raw6 from "./photos/raw6.jpg";
import banner from "./photos/physioo.png";
const Home = () => {
  const navigate = useNavigate();

  const posts = [raw1, raw2, raw3, raw4, raw5, raw6];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full pt-20 sm:pt-24 bg-white">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-full sm:min-h-[420px] lg:min-h-screen object-contain"
        />
      </div>

      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <span className="text-[#00C4CD] font-semibold uppercase tracking-widest text-sm">
              Welcome to Our Clinic
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003A80] mt-4 leading-tight">
              Holistic Healing <br /> Through Advanced Physiotherapy
            </h1>

            <div className="w-24 h-1 bg-[#00C4CD] mt-6 rounded-full"></div>

            <p className="text-gray-600 text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed">
              At Movement Rehab, we restore function, reduce pain, and improve
              mobility through advanced, evidence-based physiotherapy
            </p>
          </div>

          <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
            <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
              At our clinic, we believe in the perfect synergy of physiotherapy
              and Pilates, blending expert care with mindful movement.
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
              Under the expert guidance of Dr. Mayank Gupta (PT), we deliver
              advanced physiotherapy and rehabilitation services rooted in
              evidence-based practice. Our approach focuses on restoring
              functional movement, relieving pain, and enhancing overall quality
              of life.
            </p>

            <div className="mt-8 bg-[#003A80] text-white p-5 rounded-xl">
              <p className="text-base sm:text-lg font-semibold">
                Dedicated to providing compassionate care and effective
                treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offering Section */}
      <Offering />
      <Appointment></Appointment>

      {/* Instagram Section */}
      <section className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[600px] sm:h-[600px] bg-[#00C4CD]/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
          {/* LEFT SIDE */}
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00C4CD]/10 text-[#00C4CD] rounded-full text-sm font-semibold mb-6">
              <FaInstagram className="text-lg" />
              Instagram Presence
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Follow our journey on <br />
              <span className="bg-gradient-to-r from-[#003A80] to-[#00C4CD] text-transparent bg-clip-text">
                @movementrehab
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
              Explore expert physiotherapy insights, real recovery journeys, and
              guided exercises designed to help you move better, faster, and
              stronger.
            </p>

            {/* CTA */}
            <a
              href="https://www.instagram.com/movement__rehab?igsh=cWdiMW5wOWxrenQ2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-10 group flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#003A80] to-[#0059d6] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Visit Instagram
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </button>
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* Glass Card */}
            <div className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Recovery Moments
                </h3>

                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                  Latest Posts
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl cursor-pointer"
                  >
                    {/* Image */}
                    <img
                      src={post}
                      className="w-full h-28 sm:h-36 md:h-40 object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition duration-500"></div>

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition duration-500">
                      <p className="text-white text-xs font-medium">
                        View Session →
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p className="text-center text-gray-500 mt-6 text-sm">
                Daily rehab tips • Real patient progress • Expert guidance
              </p>
            </div>

            {/* Floating Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#003A80]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00C4CD]/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* CTA button */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 lg:p-12 text-center border border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#003A80] mb-4">
            Start Your Recovery Today
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Book your physiotherapy consultation with Movement Rehab and take
            the first step toward pain-free movement and better mobility.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/Appointment")}
              className="px-5 py-3 sm:px-8 sm:py-4 border border-[#003A80] text-[#003A80] rounded-lg hover:bg-[#003A80] hover:text-white transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
        <Chatbot></Chatbot>
      </section>
    </div>
  );
};

export default Home;
