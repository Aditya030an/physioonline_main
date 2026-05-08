import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaEnvelope,FaArrowRight,FaPhoneAlt , FaInstagram,  FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className="relative bg-gray-50 text-gray-700 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 border-t">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        {/* Clinic Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003A80]">
            Movement Rehab
          </h2>

          <p className="mt-3 text-sm text-gray-600">
          Expert physiotherapy care for recovery, mobility, and long-term wellness.
          </p>
        </motion.div>


        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-[#003A80]">
            Quick Links
          </h3>


          <ul className="mt-4 space-y-3 text-gray-600">
  {[
    { name: "Home", path: "/" },
    { name: "Services", path: "/Service" },
    { name: "Blogs", path: "/Blogs" },
    { name: "About Us", path: "/About" },
    { name: "Book Appointment", path: "/Book" }, // make sure route exists
  ].map((link, index) => (
    <li key={index}>
      <Link
        to={link.path}
        className="hover:text-[#00C4CD] cursor-pointer transition"
      >
        {link.name}
      </Link>
    </li>
  ))}
</ul>
        </motion.div>


        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-[#003A80]">
            Contact Us
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
  <FaPhoneAlt className="text-[#00C4CD] mt-1" />
  <div className="flex flex-col">
    <span>+91 6262 666 558</span>
    <span>+91 9827 636538</span>
  </div>
</li>

            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#00C4CD]" />
              movementrehab.in@gmail.com
            </li>

            <li className="flex items-start">
  <div className="text-sm text-gray-600 leading-relaxed">
    
    {/* Location 1 */}
    <p className="mt-3 font-semibold text-[#003A80]">
      MOVEMENT REHAB CENTER
    </p>
    <p>
      Akhand Param Dham, Near NDP's School, Khandwa Road, Indore 452020
    </p>
    <p className="text-[#00C4CD] font-medium">
      ⏰ 9:00 AM – 1:00 PM
    </p>

    {/* Location 2 */}
    <p className="mt-3 font-semibold text-[#003A80]">
      MAYA'S BODY CARE
    </p>
    <p>
      438, Treasure Town, Bijalpur, Indore, Madhya Pradesh 452012
    </p>
    <p className="text-[#00C4CD] font-medium">
      ⏰ 6:00 PM – 8:00 PM
    </p>

  </div>
</li>
          </ul>
        </motion.div>


        {/* Appointment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-[#003A80]">
            Book Appointment
          </h3>

          <p className="text-sm text-gray-600 mt-3">
            Schedule your physiotherapy consultation and begin
            your recovery journey today.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/Appointment"
            className="inline-flex items-center gap-2 mt-4 bg-[#003A80] text-white px-6 py-3 rounded-lg hover:bg-[#002a5e] transition"
          >
            Book Now
            <FaArrowRight />
          </motion.a>
        </motion.div>

      </div>


      {/* Social Media */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 sm:mt-12">

{[
  {
    icon: FaFacebookF,
    link: "https://www.facebook.com/share/17xeGBg4Wg/"
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/movement__rehab?igsh=cWdiMW5wOWxrenQ2"
  },
  {
    icon: FaWhatsapp,
    link: "https://wa.me/message/INE4UXIOMRKYP1"
  },
  {
    icon: FaYoutube,
    link: "https://youtube.com/@movementrehab?si=c-Ag2H1QbUJ0xE6-"
  },
].map((item, index) => {
  const Icon = item.icon;

  return (
    <motion.a
      key={index}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="p-3 bg-white border text-[#003A80] rounded-full shadow-sm hover:bg-[#00C4CD] hover:text-white transition"
    >
      <Icon size={16} />
    </motion.a>
  );
})}

</div>


      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t pt-6">
        © {new Date().getFullYear()} Movement Rehab. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;