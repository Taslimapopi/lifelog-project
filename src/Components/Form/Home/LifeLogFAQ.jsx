import { useState } from "react";

const faqs = [
  {
    question: "What is LifeLog Server?",
    answer:
      "LifeLog Server is a secure backend platform that allows users to store and manage their daily life activities, memories, and personal logs safely.",
  },
  {
    question: "Is my data safe on LifeLog Server?",
    answer:
      "Yes. LifeLog Server follows modern security practices including authentication, authorization, and encrypted data storage to protect user information.",
  },
  {
    question: "Can I access LifeLog Server from any device?",
    answer:
      "Yes. Since LifeLog Server is web-based, you can access it from any device such as mobile, tablet, or desktop with an internet connection.",
  },
  {
    question: "Will LifeLog Server offer premium features in the future?",
    answer:
      "Yes. In the future, LifeLog Server plans to introduce premium features such as advanced analytics, cloud backup, and enhanced customization options.",
  },
];

const LifeLogFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" px-4 py-12 bg-primary rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-800 hover:bg-gray-50 rounded-xl"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeLogFAQ;
