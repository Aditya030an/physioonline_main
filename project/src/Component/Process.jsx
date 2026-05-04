import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float } from "@react-three/drei";

const steps = [
  {
    number: "01",
    title: "Book A Session",
    description: "Schedule your physiotherapy session online with ease.",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827504.png",
  },
  {
    number: "02",
    title: "Assessment On Call",
    description: "A professional physiotherapist will assess your condition.",
    icon: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
  },
  {
    number: "03",
    title: "Physiotherapist Visit",
    description: "A specialist will visit you at your convenience.",
    icon: "https://cdn-icons-png.flaticon.com/512/2910/2910226.png",
  },
  {
    number: "04",
    title: "Home Treatment",
    description: "Receive expert physiotherapy at your home.",
    icon: "https://cdn-icons-png.flaticon.com/512/3481/3481376.png",
  },
];

const StepCard = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative flex flex-col items-center text-center rounded-3xl p-6 shadow-lg bg-white bg-opacity-90 backdrop-blur-lg border border-[#457B9D] hover:scale-105 transition-all duration-300"
    >
      <div className="absolute -top-6 left-6 bg-[#457B9D] text-yellow-500 text-xl font-bold rounded-full px-4 py-2 shadow-md">
        {step.number}
      </div>
      <div className="w-20 h-20 flex items-center justify-center bg-[#457B9D] bg-opacity-20 rounded-full mb-4">
        <img src={step.icon} alt={step.title} className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-semibold text-[#457B9D]">{step.title}</h3>
      <p className="mt-2 text-sm text-[#457B9D] opacity-80">{step.description}</p>
    </motion.div>
  );
};

// 🎯 Animated 3D Sphere Background
const MovingSphere = () => {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime() * 1) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={sphereRef}>
        <Sphere args={[2, 32, 32]}>
          <meshStandardMaterial color={"#457B9D"} wireframe />
        </Sphere>
      </mesh>
    </Float>
  );
};

const ThreeDBackground = () => {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full">
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />
      <MovingSphere />
    </Canvas>
  );
};

const PhysiotherapyProcess = () => {
  return (
    <div className="relative flex flex-col items-center py-20 bg-[#F1FAEE] overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <ThreeDBackground />
      </div>

      {/* Headings */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-[#457B9D] tracking-wide"
      >
        Physiotherapy <span className="text-yellow-500">Booking</span>
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-2xl font-medium text-[#457B9D] mt-2"
      >
        How It Works
      </motion.h3>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-6 md:px-16">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PhysiotherapyProcess;