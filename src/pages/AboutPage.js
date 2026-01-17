import React from 'react';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';
import './ProgramPage.css'; // Re-use styles for consistency

const AboutPage = () => {
  const pageFaqs = [
    {
      question: "What is Reign BJJ's commitment to the Katy community?",
      answer: "Reign Jiu Jitsu is 100% committed to our community, offering the highest quality training in Katy to help individuals achieve their fitness and self-defense goals in a supportive environment."
    },
    {
      question: "Do you focus more on competition or self-defense?",
      answer: "We integrate both. Jiu Jitsu is fundamentally a self-defense system, but we offer specialized training streams—like our Competition Program—to serve advanced goals."
    },
    {
      question: "What mental benefits can I expect from the training?",
      answer: "Training leads to improved confidence, boosted energy, reduced stress, and better sleep, contributing to significant mental and spiritual benefits."
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
        title="About / Our Method"
        sectionId="about_us_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_ac4e41c0457d42fcbc4f4f070b3eb0b8~mv2.jpeg"
      />

      <section className="program-intro">
        <p>
          Our method is based on discipline, respect, and technical excellence. At Reign Jiu Jitsu, we combine traditional Jiu Jitsu with modern training to create well-rounded martial artists. Students learn not just to train, but to live by the values of perseverance and humility.
        </p>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <FAQ faqData={pageFaqs} title="About Us FAQs" />
      </div>
    </div>
  );
};

export default AboutPage;
