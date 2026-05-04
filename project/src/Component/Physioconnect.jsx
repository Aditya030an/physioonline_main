import React from "react";
import { FaGraduationCap, FaHandshake } from "react-icons/fa";
import {
  FaRupeeSign,
  FaBullhorn,
  FaUserFriends,
  FaLeaf,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
const principles = [
    {
      icon: <FaGraduationCap className="text-white text-2xl" />,
      title: "Educate",
      description:
        "Our advanced surgical treatments provide effective solutions, combining expert care and cutting-edge technology to achieve the best patient outcomes.",
      color: "bg-green-500",
    },
    {
      icon: <FaBullhorn className="text-white text-2xl" />,
      title: "Aware",
      description:
        "Our services are available in over 300+ pincodes, ensuring convenience and accessibility for clients in diverse regions across the country.",
      color: "bg-green-600",
    },
    {
      icon: <FaHandshake className="text-white text-2xl" />,
      title: "Connect",
      description:
        "Our treatments are designed to be cost-effective, providing high-quality care and exceptional results without compromising your budget or expectations.",
      color: "bg-green-700",
    },
  ];

const supportItems = [
  {
    icon: <FaRupeeSign className="text-xl text-green-600" />,
    title: "Boost Your Earnings with More Clients!",
    description:
      "Join our platform and connect with a steady stream of clients looking for expert physiotherapy services. Increase your earnings while helping more people get back on their feet.",
  },
  {
    icon: <FaBullhorn className="text-xl text-green-600" />,
    title: "Expand Your Online Presence, Be Seen by Thousands",
    description:
      "Stand out in the digital space with your own professional profile. We help you showcase your expertise, credentials, and client reviews to attract more patients online.",
  },
  {
    icon: <FaUserFriends className="text-xl text-green-600" />,
    title: "Grow Your Business with Strategic Marketing Support",
    description:
      "Leave the marketing to us! Our platform promotes your services through targeted digital campaigns, helping you grow your client base without any extra effort.",
  },
  {
    icon: <FaLeaf className="text-xl text-green-600" />,
    title: "Your Success is Our Mission - Let's Grow Together",
    description:
      "We are committed to helping you succeed. Whether you're just starting out or a seasoned professional, our platform provides the tools and support you need.",
  },
  {
    icon: <FaChartLine className="text-xl text-green-600" />,
    title: "Enhance Skills with Continuous Learning Opportunities",
    description:
      "Stay ahead in your field with access to exclusive webinars, courses, professional development tools, and expert insights from the best in the industry.",
  },
  {
    icon: <FaUsers className="text-xl text-green-600" />,
    title: "Be Part of a Thriving Professional Community",
    description:
      "Join a network of top physiotherapists and gain access to valuable resources, continuing education, and peer support. Collaborate, learn, and grow together.",
  },
];

const PhysioSupportSection = () => {
  return (
    <section className="mt-20 py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Empowering Growth with{" "}
          <span className="text-green-700">Innovative Support</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Transform your practice with our innovative support, designed to
          enhance your growth and elevate patient care efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {supportItems.map((item, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white p-3 rounded-full shadow-md">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <div className="mt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-full transition">
                Join Now →
              </button>
            </div>
          </div>
        ))}
      </div>
      <section className="py-20 bg-white px-6 text-center">
      <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-5">
        Our Core Principles
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
        Our Principles
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        There are 3 principles that lay our foundation
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {principles.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-left bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div
              className={`${item.color} p-4 rounded-full mb-4 shadow-lg`}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition">
          Get Started Today
        </button>
      </div>
    </section>
    </section>
  );
};

export default PhysioSupportSection;