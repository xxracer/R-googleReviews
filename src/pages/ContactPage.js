import React from 'react';
import FAQ from '../components/FAQ';
import ContactUs from '../components/ContactUs';

const ContactPage = () => {
  const pageFaqs = [
    {
      question: "How do I schedule a free trial class?",
      answer: "You can schedule your free trial by calling us or sending a message through our website. We'll be happy to get you set up."
    },
    {
      question: "Where is the academy located?",
      answer: "Reign BJJ is located at 1648A S Mason Rd, Katy, Texas 77450."
    },
    {
      question: "What are the academy's operating hours?",
      answer: "Our operating hours vary based on the class schedule. Please check the Schedule page for precise times, or call us during the late afternoon for direct assistance."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1>Contact Us</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.7', maxWidth: '800px', margin: '20px auto 40px auto' }}>
          Ready to start your journey? Contact Reign Jiu Jitsu in Katy, TX today. Schedule your free trial class or ask about our self-defense classes in Katy TX, kids martial arts, and private Jiu Jitsu lessons near me.
        </p>
      </div>
      <ContactUs />
      <div style={{ maxWidth: '900px', margin: '60px auto' }}>
        <FAQ faqData={pageFaqs} title="Contact FAQs" />
      </div>
    </div>
  );
};

export default ContactPage;