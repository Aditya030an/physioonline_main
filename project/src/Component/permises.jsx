import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import pf4 from "./photos/paramhome.jpeg";
import p2 from "./photos/gallery1.jpeg";
import strength from "./photos/gallery2.jpeg";
import gallery3 from "./photos/gallery3.JPG";
import inner from "./photos/innerside.jpeg";
import raw from "./photos/raw1.jpg";

const galleryImages = [p2, strength, pf4, raw, gallery3, inner];

const PremisesPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white overflow-hidden">
      {/* MAIN SECTION */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[450px] mx-auto">
              <div className="absolute -inset-1.5 sm:-inset-2 border-2 border-[#00C4CD] rounded-2xl"></div>

              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                src={pf4}
                alt="Movement Rehab Premises"
                className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[280px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003A80]">
              Our Premises
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              At Movement Rehab, we pride ourselves on delivering exceptional
              levels of physiotherapy care and effective practice. Our premises
              are designed to create a calm, peaceful, and healing environment,
              surrounded by greenery and open-air spaces that promote relaxation
              and recovery. We also offer residential facilities for patients,
              providing a comfortable stay and continuous care for those who
              require extended rehabilitation and support.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Appointment")}
              className="mt-7 sm:mt-8 w-full sm:w-auto bg-[#003A80] text-white px-7 sm:px-8 py-3 rounded-lg shadow-md hover:bg-[#002a5e] transition"
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-20 bg-gradient-to-r from-[#f5fcff] to-[#eef9ff]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#003A80] mb-8 sm:mb-12">
            Our Facility
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer bg-white"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Facility ${i + 1}`}
                  className="w-full h-[220px] sm:h-[240px] md:h-[220px] lg:h-[260px] object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#003A80]/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl sm:text-3xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            ✕
          </button>

          <motion.img
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Selected Facility"
            className="w-auto max-w-full max-h-[75vh] sm:max-h-[82vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* CTA */}
      <section className="text-center py-14 sm:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#003A80]">
          Start Your Recovery Journey
        </h2>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Book your consultation and experience expert physiotherapy care.
        </p>

        <button
          onClick={() => navigate("/Appointment")}
          className="mt-6 w-full sm:w-auto bg-[#00C4CD] text-white px-8 sm:px-10 py-3 rounded-lg hover:opacity-90 transition"
        >
          Book Appointment
        </button>
      </section>
    </div>
  );
};

export default PremisesPage;