import React, { useState } from "react";

const faqs = [
  {
    question: "What is the Holistic Health Program?",
    answer:
      "The Holistic Health Program is designed to assess and improve your overall well-being through physical, mental, and lifestyle guidance.",
  },
  {
    question: "Can I take the self-assessment on my phone?",
    answer:
      "Self-assessment can only be accessed on laptops and Android devices. It is not available on iOS devices.",
  },
  {
    question: "How do I schedule a session with my Health Transformation Manager?",
    answer:
      "After completing your self-assessment, your assigned manager will reach out to guide your journey and help schedule your first session.",
  },
  {
    question: "Is the AI-based correction system safe?",
    answer:
      "Yes, the AI system only provides posture correction feedback and does not store any personal data or recordings.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border rounded-md bg-white shadow-sm"
          >
            <button
              className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
