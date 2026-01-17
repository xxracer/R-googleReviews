import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';

const CompetitionTraining = () => {
  const pageFaqs = [
    {
      question: "Does the program include nutritional guidance?",
      answer: "Yes, our customized training includes key nutrition strategies and advice from a dedicated coach to optimize weight cuts and maximize in-competition performance."
    },
    {
      question: "What level of experience is required for Competition Training?",
      answer: "This program is geared toward intermediate to advanced practitioners (typically blue belt and up) who have a solid understanding of the fundamentals and are looking to specialize."
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
        title="Competition Training"
        sectionId="competition_training_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_80a936d01653434093c7bf7f4276b689~mv2.png"
      />

      <section className="program-intro">
        <p>
          For those who want to take their training to the next level, our Competition Training program is led by experienced coaches who prepare students for local, national, and international tournaments. Push yourself, sharpen your game, and represent BJJ Katy Texas with pride.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Prepare for the Podium</h2>
          <p>
            Our program is designed to sharpen your game and prepare you for the highest levels of competition.
          </p>
          <ul>
            <li>- Led by experienced, world-class coaches</li>
            <li>- Prepare for local, national, and international tournaments</li>
            <li>- Sharpen your game and push your limits</li>
            <li>- Represent BJJ in Katy, Texas with pride</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_8ff5a096294b498eb84b3f63dd24889b~mv2.jpg" alt="Team with medals" />
        </div>
      </section>

      <FAQ faqData={pageFaqs} title="Competition Training FAQs" />
    </div>
  );
};

export default CompetitionTraining;
