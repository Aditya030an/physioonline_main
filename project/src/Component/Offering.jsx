
import { motion } from "framer-motion";                                                     

import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import p2 from "./photos/p2.jpeg";
import joint from "./photos/jointpain.png";
import joint1 from "./photos/joint.png";
import back from "./photos/backpain.png";
import neck from "./photos/neck.png";
import shoulder from "./photos/shoulder.png";
import injury from "./photos/injury.png";
import symptoms from "./photos/symptoms.png";
import podiatry from "./photos/podiatry.jpg";
import strength from "./photos/banner1.png";
import pf4 from "./photos/pf4.jpeg";
import { useNavigate } from "react-router-dom";
import Permises from "./permises"
import stoke from "./photos/stoke.png"
import Hemiplegia from "./photos/Hemiplegia .jpeg"
import Parkinson from "./photos/Parkinson.png"
import gbs from "./photos/gbs.png"
import brain from "./photos/brain.png"
import spinal from "./photos/spinal.png"
import physio from "./photos/physio.jpeg"
import home from "./photos/paramhome.jpeg";
import waist from "./photos/waist.png"
import physio1 from "./photos/physio1.jpeg"
import physio2 from "./photos/physio2.jpeg"
const services = [
  { name: "Joint Pain", img: joint1 },
  { name: "Knee Pain", img: joint },
  { name: "Back Pain", img: back },
  { name: "Neck Pain", img: neck },
  { name: "Shoulder Pain", img: shoulder },
  { name: "Sports Injuries", img: injury },
  { name: "Arthritis Care", img: symptoms },
  { name: "Podiatry Service ", img:   podiatry  },
  { name: "Stroke Rehabilitation", img: stoke },
  { name: "Hemiplegia Rehabilitation", img: Hemiplegia },
  { name: "Parkinson’s Therapy", img: Parkinson },
  { name: "GBS Rehabilitation", img: gbs },
  { name: "Multiple Sclerosis Rehab", img: brain },
  { name: "Brain Injury Rehab", img: brain },
  { name: "Spinal Cord Injury Rehab", img: spinal },
  { name: "Obesity Management", img: waist },

];

const ServicesScroll = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full p-6 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg rounded-lg overflow-hidden">

<h2 className="text-3xl md:text-4xl font-bold text-center text-[#003A80]">
        Conditions We Treat at Movement Rehab
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4">
        Specialized physiotherapy for orthopedic and neurological conditions including stroke rehabilitation, back pain, arthritis, and injury recovery.
      </p>

      {/* Hidden SEO keywords */}
      <p className="hidden">
        Physiotherapy in Indore, Stroke Rehabilitation, Neurological Physiotherapy,
        Back Pain Treatment, Knee Pain Physiotherapy, Best Rehab Center
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">

        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer"
          >
            {/* Icon */}
            <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-[#00C4CD] transition">
              <img
                src={service.img}
                alt={service.name}
                className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-[#003A80]">
              {service.name}
            </h3>
          </motion.div>
        ))}

      </div>

    
{/* Section 1 */}
<section className="flex flex-col md:flex-row items-center bg-white px-8 md:px-16 py-24 mt-12 rounded-xl overflow-hidden">

<motion.div
initial={{ opacity: 0, x: -80 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="md:w-1/2 flex justify-center md:justify-start"
>
<motion.img
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.4 }}
  src={home}
  className="w-[420px] h-[400px] object-cover rounded-xl shadow-xl"
/>
</motion.div>

<motion.div
initial={{ opacity: 0, x: 80 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="md:w-1/2 mt-8 md:mt-0 md:pl-12 border-r-4 border-[#00C4CD]"
>


<p className="mt-4 text-gray-600 leading-relaxed">
At Movement Rehab – Physiotherapy & Rehabilitation Center in Indore, we focus on providing ethical, evidence-based physiotherapy and advanced manual therapy treatments. Our approach emphasizes understanding each patient’s condition in detail and developing personalized rehabilitation programs that deliver meaningful and long-lasting results.

</p>

<p className="mt-4 text-gray-700 leading-relaxed">
We believe that effective physiotherapy begins with a comprehensive clinical assessment, hands-on manual therapy, and functional rehabilitation training. Our goal is not only to reduce pain but also to restore movement, improve strength, enhance mobility, and support overall physical performance.
</p>

<p className="mt-4 text-gray-700 leading-relaxed">
Whenever possible, we emphasize early intervention and preventive physiotherapy care. By identifying the underlying causes of pain or movement dysfunction, we help patients reduce the risk of long-term complications and maintain an active and healthy lifestyle.

</p>

<motion.button
whileHover={{ scale: 1.08 }}
whileTap={{ scale: 0.95 }}
onClick={() => navigate("/Appointment")}
className="mt-6 bg-[#003A80] text-white font-semibold py-3 px-7 rounded-lg shadow-md hover:bg-[#002a5e]"
>
Book consultation
</motion.button>

</motion.div>
</section>


{/* Section 2 */}
<section className="flex flex-col md:flex-row items-center bg-gray-50 px-8 md:px-16 py-24 rounded-xl mt-12 overflow-hidden">

<motion.div
initial={{ opacity: 0, x: -80 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="md:w-1/2 border-l-4 border-[#00C4CD] px-6 md:px-10 py-10"
>

<h2 className="text-3xl font-bold text-[#003A80]">
Specialist physiotherapy treatment
</h2>

<p className="mt-4 text-gray-600 leading-relaxed">
With a combined 13+ years of experience, the Movement Rehab team of highly specialized practitioners provides expert care in the assessment and treatment of musculoskeletal conditions such as arthritis, back pain, and sports injuries, as well as neurological conditions including hemiplegia, paralysis, Guillain-Barré Syndrome (GBS), brain injuries, and other neurological disorders
</p>

<p className="mt-4 text-gray-600 leading-relaxed">
We also offer dedicated expertise in the highly specialized areas of Pilates and obesity management, ensuring every client receives individual, highly specialized treatment tailored to their specific needs and health goals.
</p>

<motion.button
whileHover={{ scale: 1.08 }}
whileTap={{ scale: 0.95 }}
onClick={() => navigate("/Appointment")}
className="mt-6 bg-[#003A80] text-white font-semibold py-3 px-7 rounded-lg shadow-md hover:bg-[#002a5e]"
>
Book consultation
</motion.button>

</motion.div>

<motion.div
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0 relative"
>
  <div className="relative w-full max-w-[700px]">

    {/* 🔵 Glow Background */}
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

    {/* 🟡 Main Image */}
    <motion.img
      src={physio}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[380px] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    />

    {/* 🟣 Floating Image Left */}
    <motion.img
      src={physio1}
      initial={{ x: -80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      whileHover={{ scale: 1.08 }}
      className="absolute -bottom-10 -left-10 w-[220px] h-[180px] object-cover rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
    />

    {/* 🔴 Floating Image Right */}
    <motion.img
      src={physio2}
      initial={{ x: 80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      whileHover={{ scale: 1.08 }}
      className="absolute -top-10 -right-10 w-[200px] h-[160px] object-cover rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
    />

    {/* ✨ Glass Overlay Effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

  </div>
</motion.div>
</section>





<Permises></Permises>


    </div>
  );
};

export default ServicesScroll;












// import React from "react";
// import { motion } from "framer-motion";

// // Import your icons/images
// import joint from "./photos/joint.png";
// import knee from "./photos/jointpain.png";
// import back from "./photos/backpain.png";
// import neck from "./photos/neck.png";
// import shoulder from "./photos/shoulder.png";
// import injury from "./photos/injury.png";
// import arthritis from "./photos/symptoms.png";
// import foot from "./photos/podiatry.jpg";
// import stoke from "./photos/stoke.png"
// import Hemiplegia from "./photos/Hemiplegia .jpeg"
// import Parkinson from "./photos/Parkinson.png"
// import gbs from "./photos/gbs.png"
// import brain from "./photos/brain.png"
// import spinal from "./photos/spinal.png"

// const services = [
//   { name: "Joint Pain Treatment", img: joint },
//   { name: "Knee Pain Physiotherapy", img: knee },
//   { name: "Back Pain Treatment", img: back },
//   { name: "Neck Pain Therapy", img: neck },
//   { name: "Shoulder Pain Rehab", img: shoulder },
//   { name: "Sports Injury Rehabilitation", img: injury },
//   { name: "Arthritis Care", img: arthritis },
//   { name: "Podiatry & Foot Care", img: foot },

//   // Neurological Conditions
  // { name: "Stroke Rehabilitation", img: stoke },
  // { name: "Hemiplegia Rehabilitation", img: Hemiplegia },
  // { name: "Parkinson’s Therapy", img: Parkinson },
  // { name: "GBS Rehabilitation", img: gbs },
  // { name: "Multiple Sclerosis Rehab", img: brain },
  // { name: "Brain Injury Rehab", img: brain },
  // { name: "Spinal Cord Injury Rehab", img: spinal },
// ];

// const ServicesSection = () => {
//   return (
    // <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 px-6 md:px-16">

    //   {/* Heading */}
    //   <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003A80]">
    //     Conditions We Treat at Movement Rehab
    //   </h2>

    //   <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4">
    //     Specialized physiotherapy for orthopedic and neurological conditions including stroke rehabilitation, back pain, arthritis, and injury recovery.
    //   </p>

    //   {/* Hidden SEO keywords */}
    //   <p className="hidden">
    //     Physiotherapy in Indore, Stroke Rehabilitation, Neurological Physiotherapy,
    //     Back Pain Treatment, Knee Pain Physiotherapy, Best Rehab Center
    //   </p>

    //   {/* Grid */}
    //   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">

    //     {services.map((service, index) => (
    //       <motion.div
    //         key={index}
    //         whileHover={{ y: -8 }}
    //         className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer"
    //       >
    //         {/* Icon */}
    //         <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-[#00C4CD] transition">
    //           <img
    //             src={service.img}
    //             alt={service.name}
    //             className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
    //           />
    //         </div>

    //         {/* Title */}
    //         <h3 className="text-sm font-semibold text-gray-700 group-hover:text-[#003A80]">
    //           {service.name}
    //         </h3>
    //       </motion.div>
    //     ))}

    //   </div>

    // </section>
//   );
// };

// export default ServicesSection;