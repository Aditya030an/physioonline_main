import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FloatingChat = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to Movement Rehab!" },
    { sender: "bot", text: "💪 Let’s understand your problem step by step." },
    { sender: "bot", text: "👉 Where is your pain? (Back / Knee / Neck / Shoulder)" },
  ]);

  const [input, setInput] = useState("");
  const [step, setStep] = useState("area"); 
  const [userData, setUserData] = useState({
    area: "",
    severity: "",
    duration: "",
  });

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    const lower = userMsg.toLowerCase();

    setTimeout(() => {
      // STEP 1: Pain Area
      if (step === "area") {
        setUserData((prev) => ({ ...prev, area: userMsg }));
        setStep("severity");

        addBotMessage("📊 How severe is your pain?\n👉 Mild / Moderate / Severe");
        setInput("");
        return;
      }

      // STEP 2: Severity
      if (step === "severity") {
        setUserData((prev) => ({ ...prev, severity: userMsg }));
        setStep("duration");

        addBotMessage("⏳ How long have you had this pain?\n👉 Few days / Weeks / Months");
        setInput("");
        return;
      }

      // STEP 3: Duration
      if (step === "duration") {
        const finalData = { ...userData, duration: userMsg };
        setUserData(finalData);
        setStep("complete");

        // Diagnosis Response
        addBotMessage("🧠 Based on your inputs:");
        addBotMessage(
          `👉 ${finalData.area} pain (${finalData.severity}) for ${userMsg}`
        );

        addBotMessage(
          "💡 This may be due to muscle weakness, posture, or strain."
        );

        addBotMessage(
          "✅ We recommend physiotherapy exercises + expert consultation."
        );

        addBotMessage(
          "📅 Would you like to book an appointment with our physiotherapist?"
        );

        setInput("");
        return;
      }

      // FINAL STEP: Appointment decision
      if (step === "complete") {
        if (
          lower.includes("yes") ||
          lower.includes("book") ||
          lower.includes("appointment")
        ) {
          addBotMessage("🚀 Redirecting you to booking page...");
          setTimeout(() => {
            navigate("/appointment");
          }, 1000);
        } else {
          addBotMessage("👍 No problem! Let me know if you need help.");
        }
      }
    }, 500);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[340px] h-[460px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#00A99D] text-white p-4 flex justify-between items-center">
              <span className="font-semibold text-sm">
                💪 Movement Rehab
              </span>
              <FaTimes onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white"
                        : "bg-white shadow"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your answer..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-[#00A99D] text-white p-2 rounded-full"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white flex items-center justify-center shadow-xl"
      >
        {open ? <FaTimes size={20} /> : <FaComments size={22} />}
      </motion.button>
    </div>
  );
};

export default FloatingChat;