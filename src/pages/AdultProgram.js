import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';

const AdultProgram = () => {
  const pageFaqs = [
    {
      question: "Does the training cover self-defense techniques?",
      answer: "Jiu Jitsu is an inherently effective self-defense system. Our curriculum incorporates techniques for real-life situations, focusing on controlling an opponent regardless of size or strength."
    },
    {
      question: "Do I need any previous martial arts experience to join the Adult Program?",
      answer: "No. We welcome complete beginners and recommend starting with our Fundamentals Program to build a solid, safe foundation before moving to the main Adult classes."
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
        title="Adult Program"
        sectionId="adult_program_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_fae53860ebbd4e9a8644aa66c76e45e1~mv2.jpg"
      />

      <section className="program-intro">
        <p>
          Our Adult Jiu Jitsu program provides a supportive environment for beginners and advanced students alike. Whether your goal is self-defense, fitness, or personal growth, you’ll find the right path here. Classes include both gi and no-gi Jiu Jitsu in Katy, TX.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Self-Defense, Fitness, and Growth</h2>
          <p>
            Our classes are designed to help you achieve your goals, whether you're a beginner or an advanced student.
          </p>
          <ul>
            <li>- Learn effective self-defense techniques</li>
            <li>- Improve your fitness and overall health</li>
            <li>- Experience personal growth in a supportive community</li>
            <li>- Classes include both Gi and No-Gi training</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_200495ae287d4122be667a7e4a8f4551~mv2.jpg" alt="Adults drilling techniques" />
        </div>
      </section>

      <div style={{'textAlign':'center', 'marginBottom': '60px'}}>
        <img src="https://static.wixstatic.com/media/c5947c_32c260b29da7493f94738d8603598770~mv2.jpg" alt="Group of adult students after a jiu jitsu class" />
      </div>

      <FAQ faqData={pageFaqs} title="Adult Program FAQs" />
    </div>
  );
};

export default AdultProgram;
