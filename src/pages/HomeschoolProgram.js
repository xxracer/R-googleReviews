import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero';

const HomeschoolProgram = () => {
  const pageFaqs = [
    {
      question: "What are the qualifications of the instructor for the Homeschool program?",
      answer: "The program is led by a black belt instructor who also has a background as a Physical Education and Health teacher, providing a unique and qualified perspective for homeschool students."
    },
    {
      question: "Can these classes count toward my child’s P.E. requirement?",
      answer: "Yes, the program emphasizes physical fitness, helping children build strength, flexibility, and overall health, fulfilling the physical activity goals often associated with P.E. "
    },
    {
      question: "What unique benefits does the program offer for homeschool children?",
      answer: "It provides valuable social development and connection with peers, alongside specialized instruction in confidence, discipline, and physical fitness in a screen-free environment. "
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
        title="Homeschool Program"
        sectionId="homeschool_program_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_84d1216506fb4e4485d07d065cea8b98~mv2.png"
      />

      <section className="program-intro">
        <p>
          Reign Jiu Jitsu proudly offers a Homeschool Jiu Jitsu program tailored to families seeking daytime martial arts training. Students benefit from physical fitness, social interaction, and learning the values of discipline and perseverance. If you’re searching for homeschool martial arts near me, our program is the perfect fit.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Physical Fitness & Social Interaction</h2>
          <p>
            Our program is designed to provide a comprehensive experience for homeschool students, focusing on key areas of development.
          </p>
          <ul>
            <li>- Benefit from physical fitness</li>
            <li>- Develop social interaction skills</li>
            <li>- Learn the values of discipline and perseverance</li>
            <li>- Perfect for daytime martial arts training</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_b0565367f7d345408d6f1e8853fb5f2f~mv2.png" alt="Small homeschool class" />
        </div>
      </section>

      <div style={{'textAlign':'center', 'marginBottom': '60px'}}>
        <img src="https://static.wixstatic.com/media/c5947c_d824ca9346fc4e299f2d533a72eae649~mv2.png" alt="Parents watching kids train" />
      </div>

      <FAQ faqData={pageFaqs} title="Homeschool Program FAQs" />
    </div>
  );
};

export default HomeschoolProgram;
