import React from "react";
import { useNavigate } from "react-router-dom";
import about from "./photos/aboutus.jpeg";
import { ShieldCheck, Activity, HeartPulse, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "./photos/mayankgupta.jpeg"
const AboutUs = () => {

  const navigate = useNavigate();

  return (
<section className="pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-20 lg:pb-28 px-4 sm:px-6 lg:px-20 bg-white">

<div className="max-w-5xl mx-auto text-center">

  <p className="text-[#00C4CD] font-semibold tracking-wide mb-4">
    ABOUT MOVEMENT REHAB
  </p>

  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-[#003A80] leading-tight mb-6">
    Restoring Movement <br />
    <span className="text-[#00C4CD]">Improving Lives</span>
  </h1>

  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-14">
  At Movement Rehab – Physiotherapy & Rehabilitation Center, our work is guided by clear clinical principles that prioritize ethical care, professional expertise, and patient-centered rehabilitation.

  </p>

</div>

{/* Large Image Section */}

<div className="max-w-7xl mx-auto relative">

  <div className="overflow-hidden rounded-3xl shadow-xl">

    <img
      src={about}
      alt="Physiotherapy Treatment"
      className="w-full h-[260px] sm:h-[380px] lg:h-[500px] object-cover"
    />

  </div>

  {/* Floating Info Card */}

  <div className="static mt-4 sm:absolute sm:bottom-8 sm:left-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg border max-w-sm">

    <p className="text-sm text-gray-500 mb-1">
      Trusted Care
    </p>

    <p className="text-xl font-semibold text-[#003A80]">
      Helping patients recover and move better every day.
    </p>

  </div>

</div>
<section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-20 bg-gray-50">

  <div className="max-w-7xl mx-auto">

    {/* Section Heading */}

    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">

      <p className="text-[#00C4CD] font-semibold tracking-wide mb-3">
        OUR PURPOSE
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#003A80] mb-6">
        Our Mission
      </h2>

      <p className="text-base sm:text-lg text-gray-600">
      Our mission is to transform society by advancing the role of physiotherapy in health, wellness, and rehabilitation—helping individuals prevent disability, restore function, and lead healthier, more active lives.
      </p>

    </div>

    {/* Mission Statement */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-10 lg:p-12 text-center mb-12 sm:mb-16 lg:mb-20">

      <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
        “We believe movement is medicine. Our goal is to help every
        patient regain strength, mobility, and confidence through
        personalized rehabilitation programs and compassionate care.”
      </p>

    </div>


    {/* Core Values */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition">

        <h3 className="text-xl font-semibold text-[#003A80] mb-3">
          Patient-Centered Care
        </h3>

        <p className="text-gray-600">
          Every treatment plan is tailored to the patient’s condition,
          lifestyle, and long-term recovery goals.
        </p>

      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition">

        <h3 className="text-xl font-semibold text-[#003A80] mb-3">
          Evidence-Based Therapy
        </h3>

        <p className="text-gray-600">
          Our physiotherapists use modern rehabilitation techniques
          backed by research and clinical experience.
        </p>

      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition">

        <h3 className="text-xl font-semibold text-[#003A80] mb-3">
          Long-Term Wellness
        </h3>

        <p className="text-gray-600">
          We focus on preventing injuries and improving overall
          physical health beyond short-term recovery.
        </p>

      </div>

    </div>

  </div>

</section>


{/* principles */}
<section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#003A80] leading-tight">
            The Principles That Guide Our Practice
          </h2>

          <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            At <span className="font-semibold text-black">Movement Rehab – Physiotherapy & Rehabilitation Center</span>, our work is guided by clear clinical principles that prioritize ethical care, professional expertise, and patient-centered rehabilitation.
          </p>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Our approach is based on careful clinical assessment, evidence-based physiotherapy, and functional rehabilitation strategies designed to support safe recovery and restore optimal movement.
          </p>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            We focus on helping individuals reduce pain, regain strength, improve mobility, and return to meaningful daily activities. By addressing the underlying causes of movement dysfunction, our goal is to support long-term physical health, functional independence, and improved quality of life.
          </p>
        </motion.div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {[
            {
              icon: <ShieldCheck size={28} />,
              title: "Ethical Care",
              desc: "Transparent, patient-first treatment approach."
            },
            {
              icon: <Activity size={28} />,
              title: "Evidence-Based",
              desc: "Modern physiotherapy backed by research."
            },
            {
              icon: <HeartPulse size={28} />,
              title: "Pain Recovery",
              desc: "Focused on safe and effective healing."
            },
            {
              icon: <Brain size={28} />,
              title: "Functional Rehab",
              desc: "Restore real-life movement and independence."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="text-blue-600 mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>




{/* OUR TEAM */}
<section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 bg-white">
  <div className="max-w-5xl mx-auto">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <p className="text-[#00C4CD] font-semibold tracking-wide mb-3">
        OUR SPECIALIST
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#003A80] mb-6">
        Meet Our Physiotherapy Expert
      </h2>

      <p className="text-base sm:text-lg text-gray-600">
        Dedicated to helping patients recover faster, move better, and live healthier lives.
      </p>
    </div>

    {/* Doctor Card */}
    <div className="flex justify-center">
      <div className="text-center max-w-sm">

        {/* Image with Link */}
        <Link to="/profile">
          <div className="overflow-hidden rounded-2xl mb-6 shadow-lg cursor-pointer">
          <img
  src={profile}
  alt="Dr Mayank Gupta"
  className="w-full h-[300px] sm:h-[340px] object-cover object-top hover:scale-105 transition duration-500"
/>
          </div>
        </Link>

        {/* Name with Link */}
        <Link to="/profile">
          <h3 className="text-2xl font-semibold text-[#003A80] hover:text-[#00C4CD] transition cursor-pointer">
            Dr. Mayank Gupta (PT)
          </h3>
        </Link>

        <p className="text-[#00C4CD] font-medium mt-1">
          Neuro & Musculoskeletal Physiotherapist
        </p>


        <Link
    to="/profile"
    className="mt-2 inline-block text-[#00C4CD] font-semibold hover:underline transition"
  >
    Read More →
  </Link>

      </div>
    </div>

  </div>
</section>







{/* CTA Button */}
<section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 bg-gray-50">

<div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 lg:p-12 text-center border border-gray-100">

  <h2 className="text-4xl font-semibold text-[#003A80] mb-4">
    Start Your Recovery Today
  </h2>

  <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
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

</section>
  );
};

export default AboutUs;