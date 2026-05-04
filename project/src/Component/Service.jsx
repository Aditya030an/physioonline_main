


import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import personalized from "./photos/Personalized.png"
import banner from "./photos/MRbanner.png"
import { FaBone, FaBrain, FaRunning, FaFemale, FaDumbbell, FaWeight } from "react-icons/fa";
const services = [
  {
    title: "Orthopedic Rehabilitation",
    desc: "Advanced treatment for musculoskeletal injuries and joint pain.",
    icon: <FaBone />
  },
  {
    title: "Neuro Rehabilitation",
    desc: "Specialized therapy for stroke and neurological recovery.",
    icon: <FaBrain />
  },
  {
    title: "Sports Rehabilitation",
    desc: "Return-to-sport programs designed for athletes.",
    icon: <FaRunning />
  },
  {
    title: "Gynecological Rehabilitation",
    desc: "Pelvic health therapy and post-pregnancy recovery.",
    icon: <FaFemale />
  },
  {
    title: "Pilates Therapy",
    desc: "Improve posture, flexibility and core strength.",
    icon: <FaDumbbell />
  },
  {
    title: "Obesity Management",
    desc: "Physiotherapy-guided weight management programs.",
    icon: <FaWeight />
  }
];

export default function PhysiotherapyServices() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">

      {/* HERO */}

      <section className="relative min-h-[90vh] flex items-center pt-32 px-6 lg:px-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">

{/* Background Accent Shapes */}

<div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#00C4CD]/20 rounded-full blur-3xl"></div>

<div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-[#003A80]/10 rounded-full blur-3xl"></div>


<div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

  {/* LEFT CONTENT */}

  <div>

    <h1 className="text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#003A80]">

      Restore Movement. <br />

      <span className="text-[#00C4CD]">
        Rebuild Strength.
      </span>

    </h1>

    <p className="text-lg text-gray-600 max-w-lg mb-10">
      Expert physiotherapy and rehabilitation programs designed to
      relieve pain, restore mobility and improve quality of life
      through personalized treatment plans.
    </p>


    {/* CTA BUTTONS */}

    <div className="flex flex-wrap gap-6">


      <button
        onClick={() => navigate("/Appointment")}
        className="px-8 py-4 border border-[#003A80] text-[#003A80] rounded-lg hover:bg-[#003A80] hover:text-white transition"
      >
        Book Appointment
      </button>

    </div>


    {/* TRUST STATS */}

    <div className="flex gap-10 mt-12 text-sm text-gray-500">

      <div>
        <p className="text-2xl font-semibold text-[#003A80]">10+</p>
        Years Experience
      </div>

      <div>
        <p className="text-2xl font-semibold text-[#003A80]">1000+</p>
        Patients Treated
      </div>

      <div>
        <p className="text-2xl font-semibold text-[#003A80]">6+</p>
        Specialized Therapies
      </div>

    </div>

  </div>


  {/* RIGHT VISUAL */}

  <div className="relative">

  <div className="bg-gray-100 h-[420px] rounded-2xl shadow-inner overflow-hidden">

<img
  src={banner}
  alt="Physiotherapy Treatment"
  className="w-full h-full object-cover rounded-2xl"
/>

</div>


    {/* Floating Card */}

    <div className="absolute -bottom-8 -left-8 bg-white shadow-xl rounded-xl p-6 border">

      <p className="text-sm text-gray-500">
        Recovery Success
      </p>

      <p className="text-3xl font-semibold text-[#003A80]">
        92%
      </p>

    </div>

  </div>

</div>

</section>

      {/* SERVICES CARDS */}

      <section className="py-24 px-6 lg:px-20 bg-gray-50">

<div className="max-w-4xl mb-16">

  <h2 className="text-4xl lg:text-5xl font-semibold text-[#003A80] mb-4">
    Our Specializations
  </h2>

  <p className="text-gray-600 text-lg max-w-2xl">
  We provide advanced physiotherapy care for neurological and musculoskeletal conditions, along with wellness-focused programs designed to improve long-term physical health, mobility, and overall well-being.
  </p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

  {services.map((service, index) => (

    <motion.div
      key={index}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition"
    >

      {/* ICON */}

      <div className="w-14 h-14 rounded-xl bg-[#003A80]/10 flex items-center justify-center mb-6 text-[#003A80] text-2xl">
        {service.icon}
      </div>

      {/* TITLE */}

      <h3 className="text-2xl font-semibold mb-3 text-[#003A80]">
        {service.title}
      </h3>

      {/* DESCRIPTION */}

      <p className="text-gray-600 mb-6 leading-relaxed">
        {service.desc}
      </p>



    </motion.div>

  ))}

</div>

</section>

      {/* FEATURE SECTION */}

      <section className="py-28 px-6 lg:px-20 bg-white">

<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

  {/* LEFT IMAGE */}

  <div className="relative">

  <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-100">

<img
  src={personalized}
  alt="Physiotherapy Treatment"
  className="w-full h-[420px] object-contain"
/>

</div>

    {/* Floating stat card */}

    <div className="absolute -bottom-8 -right-8 bg-white shadow-xl rounded-xl p-6 border">

      <p className="text-sm text-gray-500">Recovery Success</p>

      <p className="text-3xl font-semibold text-[#003A80]">
        92%
      </p>

    </div>

  </div>


  {/* RIGHT CONTENT */}

  <div>

    <h2 className="text-4xl lg:text-5xl font-semibold text-[#003A80] mb-6">
      Personalized Rehabilitation Programs
    </h2>

    <p className="text-gray-600 text-lg leading-relaxed mb-8">
    Every patient needs a customized rehabilitation program based on their condition, goals, and lifestyle. Our approach focuses on restoring functional abilities according to individual needs, daily activities, and professional demands through structured, evidence-based physiotherapy.
    </p>


    {/* BENEFITS */}

    <div className="space-y-6">

      <div className="flex gap-4 items-start">

        <div className="w-10 h-10 rounded-lg bg-[#00C4CD]/20 flex items-center justify-center text-[#003A80] font-semibold">
          ✓
        </div>

        <p className="text-gray-700">
        Individualized treatment plans after detailed clinical assessmen
        </p>

      </div>

      <div className="flex gap-4 items-start">

        <div className="w-10 h-10 rounded-lg bg-[#00C4CD]/20 flex items-center justify-center text-[#003A80] font-semibold">
          ✓
        </div>

        <p className="text-gray-700">
        Integration of advanced manual therapy and rehabilitation techniques
        </p>

      </div>

      <div className="flex gap-4 items-start">

        <div className="w-10 h-10 rounded-lg bg-[#00C4CD]/20 flex items-center justify-center text-[#003A80] font-semibold">
          ✓
        </div>

        <p className="text-gray-700">
        Ongoing progress tracking for optimal recovery and long-term results
        </p>

      </div>

    </div>

  </div>

</div>

</section>

      {/* TREATMENT PROCESS */}

      <section className="py-28 px-6 lg:px-20 bg-gray-50">

<div className="max-w-7xl mx-auto">

  {/* Heading */}

  <div className="max-w-3xl mb-16">

    <h2 className="text-4xl lg:text-5xl font-semibold text-[#003A80] mb-4">
      Why Choose Movement Rehab
    </h2>

    <p className="text-gray-600 text-lg">
    At Movement Rehab, the focus is on long-term recovery, personalized treatment, and restoring physical independence through advanced, evidence-based rehabilitation techniques. Set in a green and peaceful environment, the clinic offers a calm and supportive space for healing, along with residential facilities for patients who require structured and continuous rehabilitation.
    </p>

  </div>

  {/* Feature Cards */}

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Expert Physiotherapists
      </h3>

      <p className="text-gray-600">
        Our team includes highly trained physiotherapists with expertise in
        orthopedic, neurological and sports rehabilitation.
      </p>

    </div>


    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Personalized Treatment
      </h3>

      <p className="text-gray-600">
        Every treatment program is tailored according to your condition,
        recovery goals and lifestyle requirements.
      </p>

    </div>


    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Modern Rehabilitation Methods
      </h3>

      <p className="text-gray-600">
        We use advanced physiotherapy techniques and evidence-based
        rehabilitation practices to accelerate recovery.
      </p>

    </div>


    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Faster Recovery
      </h3>

      <p className="text-gray-600">
        Our goal is to restore mobility quickly and help patients return
        to normal life safely and confidently.
      </p>

    </div>


    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Holistic Care
      </h3>

      <p className="text-gray-600">
        We focus on complete rehabilitation including mobility, strength,
        posture correction and long-term injury prevention.
      </p>

    </div>


    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-[#00C4CD]/20 rounded-xl flex items-center justify-center text-[#003A80] text-2xl mb-6">
        ✓
      </div>

      <h3 className="text-2xl font-semibold text-[#003A80] mb-3">
        Continuous Monitoring
      </h3>

      <p className="text-gray-600">
        Progress is regularly monitored to ensure the treatment plan is
        delivering the best possible results.
      </p>

    </div>

  </div>

</div>

</section>

      {/* CTA */}
      <section className="py-28 px-6 lg:px-20 bg-gray-50">

<div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">

  <h2 className="text-4xl font-semibold text-[#003A80] mb-4">
    Start Your Recovery Today
  </h2>

  <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
    Book your physiotherapy consultation with Movement Rehab and take the
    first step toward pain-free movement and better mobility.
  </p>

  <div className="flex justify-center gap-6 flex-wrap">

  <button
  onClick={() => navigate("/Appointment")}
  className="px-8 py-4 border border-[#003A80] text-[#003A80] rounded-lg hover:bg-[#003A80] hover:text-white transition"
>
  Book Appointment
</button>

  </div>

</div>

</section>

    </div>
  );
}