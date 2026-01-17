import React from 'react';
import './ProgramPage.css';
import FAQ from '../components/FAQ';
import ProgramHero from '../components/ProgramHero'; // Import the new component

const KidsProgram = () => {
  const pageFaqs = [
    {
      question: "What is the minimum age for the Kids Program?",
      answer: "Our Kids Jiu Jitsu program is suitable for children ages 6 and up, focusing on fundamentals and character development."
    },
    {
      question: "What gear is required for my child's first class?",
      answer: "For the trial class, comfortable athletic wear is sufficient. If you enroll in an Unlimited Membership, a complimentary Gi (uniform) is often provided."
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
        title="Kids Program"
        sectionId="kids_program_image"
        defaultImage="https://static.wixstatic.com/media/c5947c_690fa9195b12420bb76a88e15c1502b1~mv2.jpeg"
      />

      <section className="program-intro">
        <p>
          Our Kids Jiu Jitsu classes are designed to help children build confidence, respect, and discipline while having fun. From preschoolers (ages 4 and up) to teens, our children’s Jiu Jitsu and teens Jiu Jitsu classes focus on developing coordination, teamwork, and self-defense skills. We also welcome families looking for family Jiu Jitsu programs.
        </p>
      </section>

      <section className="program-details-section">
        <div className="program-details-text">
          <h2>Building Confidence and Skills</h2>
          <p>
            We provide a safe and supportive environment where children can learn and grow. Our curriculum is designed to be engaging and effective.
          </p>
          <ul>
            <li>- Develop coordination and teamwork</li>
            <li>- Learn valuable self-defense skills</li>
            <li>- Build respect and discipline</li>
            <li>- Have fun while learning</li>
          </ul>
        </div>
        <div className="program-details-image">
          <img src="https://static.wixstatic.com/media/c5947c_78dcb424cd4245d9acc5de69236867dc~mv2.jpeg" alt="Instructor teaching young kids" />
        </div>
      </section>

      <div style={{'textAlign':'center'}}>
        <img src="https://static.wixstatic.com/media/c5947c_5cedfbdb69ec448a9e5e0c60dba8235a~mv2.jpeg" alt="Smiling kids after class" />
      </div>

      <FAQ faqData={pageFaqs} title="Kids Program FAQs" />
    </div>
  );
};

export default KidsProgram;
