import React from 'react';
import FAQ from '../components/FAQ';

const OurFacilityPage = () => {
  const pageFaqs = [
    {
      question: "How often are the training mats cleaned?",
      answer: "We maintain germ-free facilities, prioritizing hygiene by cleaning the mats daily and thoroughly, adhering to a high standard of safety and cleanliness."
    },
    {
      question: "Does the facility have locker rooms or showers?",
      answer: "Yes, we provide modern amenities, including dedicated changing areas and showers, for the convenience of our students."
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
    <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <h1 style={{ marginBottom: '20px' }}>Our Facility</h1>
      <p style={{ marginBottom: '40px', fontSize: '18px', lineHeight: '1.7' }}>
        Our academy is equipped with high-quality mats, clean locker rooms, and a welcoming environment. Parents and students alike love the safe and professional setting. More than just a gym, Reign is a community-driven martial arts academy in Katy, TX.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
        <img
          src="https://static.wixstatic.com/media/c5947c_475cbf851e054bdc915bfcbb7fd2b704~mv2.png"
          alt="Facility interior wide shot"
          style={{ width: '100%', maxWidth: '440px', height: 'auto', borderRadius: '8px' }}
        />
        <img
          src="https://static.wixstatic.com/media/c5947c_b40f2d46adab45ae967e41fd1868925b~mv2.png"
          alt="Training equipment / mats close-up"
          style={{ width: '100%', maxWidth: '440px', height: 'auto', borderRadius: '8px' }}
        />
      </div>
      <FAQ faqData={pageFaqs} title="Facility FAQs" />
    </div>
  );
};

export default OurFacilityPage;