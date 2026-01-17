import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';

const PrivateLessons = () => {
  const pageFaqs = [
    {
      question: "Can I share a Private Lesson with a friend?",
      answer: "Yes, private lessons offer the flexibility to work with the coach on a one-on-one basis or in a small group environment, allowing you to train with a partner or small group."
    },
    {
      question: "Are Private Lessons suitable for complete beginners?",
      answer: "Absolutely. Beginners often find that private lessons help them build a solid foundation and confidence faster, making their subsequent transition into group classes more effective and enjoyable."
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
    <div className="program-page">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <ProgramHero
        title="Private Lessons"
        sectionId="private_lessons_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_32e7f546ef5043418e7e8229d64bb099~mv2.png"
      />

      <section className="program-intro">
        <p>
          Accelerate your progress with Private BJJ lessons. Work directly with our instructors to focus on your goals, from self-defense to competition preparation. Many students find that private Jiu Jitsu classes near me give them the boost they need to succeed.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Focus on Your Goals</h2>
          <p>
            Private lessons are the fastest way to improve. Get personalized feedback and instruction tailored to your specific needs.
          </p>
          <ul>
            <li>- Accelerate your progress</li>
            <li>- Focus on your specific goals</li>
            <li>- Ideal for self-defense or competition prep</li>
            <li>- Get the boost you need to succeed</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_dfc350dae9d242e6b35ea9ab6499341c~mv2.png" alt="Instructor coaching a student" />
        </div>
      </section>

      <FAQ faqData={pageFaqs} title="Private Lessons FAQs" />
    </div>
  );
};

export default PrivateLessons;
