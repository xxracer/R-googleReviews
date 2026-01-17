import React, { useState, useEffect } from 'react';
import './FAQ.css';

const defaultFaqData = [
  {
    question: "What is Brazilian Jiu Jitsu?",
    answer: "Brazilian Jiu Jitsu (BJJ) is a martial art and combat sport based on grappling, ground fighting, and submission holds. It focuses on the skill of taking an opponent to the ground, controlling them, and using techniques to force them into submission."
  },
  {
    question: "How old do I have to be to join?",
    answer: "We offer programs for all ages! Our kids' classes start as young as 4 years old, and our adult programs are open to individuals of all ages and fitness levels. It's never too late to start."
  },
  {
    question: "Do you offer free trial classes?",
    answer: "Yes, we do! We encourage everyone to try a free introductory class to experience our academy, meet our instructors, and see if our program is the right fit for you. You can book one through the button on our homepage."
  }
];

const FAQItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={`faq-item ${faq.open ? 'open' : ''}`}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        {faq.question}
        <span className="faq-icon">{faq.open ? '−' : '+'}</span>
      </div>
      <div className="faq-answer-wrapper">
        <p className="faq-answer">{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQ = ({ faqData = defaultFaqData, title = "Frequently Asked Questions" }) => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqData.map(item => ({ ...item, open: false })));
  }, [faqData]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false; // Only one open at a time
        }
        return faq;
      })
    );
  };

  return (
    <section id="faq" className="faq-section">
      <h2 className="section-title">{title}</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            toggleFAQ={toggleFAQ}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;