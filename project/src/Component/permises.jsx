import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Images
import pf4 from "./photos/paramhome.jpeg";

import p2 from "./photos/gallery1.jpeg";
import strength from "./photos/gallery2.jpeg";
import gallery3 from "./photos/gallery3.JPG"
import room from "./photos/room.jpeg"
import inner from "./photos/innerside.jpeg"
import raw from "./photos/raw1.jpg"
const galleryImages = [ p2, strength, pf4, raw, gallery3,inner];

const PremisesPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white">

      {/* ================= MAIN SECTION ================= */}
      <section className="px-6 md:px-16 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* 🔥 LEFT - LANDSCAPE PREMIUM IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-[450px]">

              {/* Accent Border */}
              <div className="absolute -inset-2 border-2 border-[#00C4CD] rounded-2xl"></div>

              {/* Image */}
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                src={pf4}
                className="relative w-full h-[280px] object-cover rounded-2xl shadow-xl"
              />

            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h2 className="text-3xl font-bold text-[#003A80]">
              Our Premises
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              At Movement Rehab, we pride ourselves on delivering exceptional levels of physiotherapy care and effective practice. Our premises are designed to create a calm, peaceful, and healing environment, surrounded by greenery and open-air spaces that promote relaxation and recovery. We also offer residential facilities for patients, providing a comfortable stay and continuous care for those who require extended rehabilitation and support.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Appointment")}
              className="mt-8 bg-[#003A80] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#002a5e]"
            >
              Book Consultation
            </motion.button>

          </motion.div>

        </div>

      </section>

      {/* ================= GALLERY ================= */}
      <section className="px-6 md:px-16 py-20 bg-gradient-to-r from-[#f5fcff] to-[#eef9ff]">

        <h2 className="text-3xl font-semibold text-center text-[#003A80] mb-12">
          Our Facility
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                className="w-full h-[220px] object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#003A80]/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= POPUP ================= */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            className="max-w-[90%] max-h-[80vh] rounded-xl shadow-2xl"
          />

        </motion.div>
      )}

      {/* ================= CTA ================= */}
      <section className="text-center py-20 px-6">

        <h2 className="text-3xl font-semibold text-[#003A80]">
          Start Your Recovery Journey
        </h2>

        <p className="mt-3 text-gray-600">
          Book your consultation and experience expert physiotherapy care.
        </p>

        <button
          onClick={() => navigate("/Appointment")}
          className="mt-6 bg-[#00C4CD] text-white px-10 py-3 rounded-lg hover:opacity-90"
        >
          Book Appointment
        </button>

      </section>

    </div>
  );
};

export default PremisesPage;