import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';

const FundamentalsProgram = () => {
  const pageFaqs = [
    {
      question: "Who is the Fundamentals Program for?",
      answer: "It's designed for new students who are just beginning their Jiu Jitsu journey. It's the perfect entry point before joining the main adult classes."
    },
    {
      question: "What will I learn in this program?",
      answer: "You will learn the core movements, body positioning, and essential self-defense techniques that form the bedrock of the art, all in a safe and supportive environment."
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
        title="Fundamentals Program"
        sectionId="fundamentals_program_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_c7ef85e5ccc24f99b71c499e9c5d41fd~mv2.jpg"
      />

      <section className="program-intro">
        <p>
          Start your journey with our Fundamentals Jiu Jitsu classes. This program covers basic movements, positions, and techniques, ensuring that new students build a strong foundation. Perfect for those looking for beginner Jiu Jitsu near me.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Build a Strong Foundation</h2>
          <p>
            Our fundamentals program is designed to give you the confidence and skills you need to succeed in your Jiu Jitsu journey.
          </p>
          <ul>
            <li>- Learn basic movements and positions</li>
            <li>- Understand core techniques</li>
            <li>- Build a solid foundation for advanced classes</li>
            <li>- Perfect for beginners</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_9de5932b95dc4de18b8a7277f4f8509b~mv2.png" alt="Instructor demonstrating a basic move" />
        </div>
      </section>

      <div style={{'textAlign':'center', 'marginBottom': '60px'}}>
        <img src="https://static.wixstatic.com/media/c5947c_b9ce4dd9773847f0b3a64d02df753405~mv2.png" alt="New students practicing" />
      </div>

      <FAQ faqData={pageFaqs} title="Fundamentals Program FAQs" />
    </div>
  );
};

export default FundamentalsProgram;
