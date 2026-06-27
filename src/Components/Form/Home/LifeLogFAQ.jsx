import { useState, useEffect, useRef } from "react";

const faqs = [
  { q: "What is LifeLog?", a: "LifeLog is a platform to share life stories, motivational and educational content with others. Creators can monetize their content and earn income directly through the platform." },
  { q: "Is my data safe on LifeLog?", a: "Yes. LifeLog follows modern security practices including Firebase authentication, JWT authorization, and encrypted data storage to protect your information." },
  { q: "Can I access LifeLog from any device?", a: "Yes. Since LifeLog is web-based, you can access it from any device — mobile, tablet, or desktop — with an internet connection." },
  { q: "What is a premium lesson?", a: "Premium lessons are exclusive content available only to subscribed members. Authors can choose to publish their content as premium to earn income from their work." },
  { q: "How do I become a content creator?", a: "Simply sign up, go to your dashboard, and start publishing lessons. You can track your articles, subscriptions, and income from the Author Analytics Dashboard." },
];

const LifeLogFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    faqs.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, 150 * i);
    });
  }, []);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="rounded-2xl px-8 py-10" style={{ background: "#0d3d38" }}>
      <h2 className="text-2xl font-medium text-white text-center mb-8">
        Frequently asked questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-400"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "0.5px solid rgba(80,227,194,0.25)",
              opacity: visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-medium"
              style={{ color: "#50E3C2", background: "transparent", border: "none" }}
            >
              <span>{faq.q}</span>
              <span
                className="text-xl transition-transform duration-300"
                style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)", color: "#50E3C2" }}
              >
                +
              </span>
            </button>

            <div
              style={{
                maxHeight: openIndex === i ? "200px" : "0",
                overflow: "hidden",
                opacity: openIndex === i ? 1 : 0,
                transition: "max-height 0.4s ease, opacity 0.3s ease",
              }}
            >
              <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeLogFAQ;