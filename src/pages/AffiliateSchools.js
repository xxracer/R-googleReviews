import React from 'react';
import FAQ from '../components/FAQ';

const AffiliateSchools = () => {
  const pageFaqs = [
    {
      question: "What is the benefit of being part of an affiliate network?",
      answer: "Our network provides students access to top-level training, seminars, and events at our partner schools."
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
      <h1 style={{ marginBottom: '20px' }}>Affiliate Schools</h1>
      <p style={{ marginBottom: '40px', fontSize: '18px', lineHeight: '1.7' }}>
        Reign Jiu Jitsu is proud to be connected with affiliate schools and partners across Texas and beyond. Our network provides students with access to top-level training, seminars, and events, including Pablo Silva Jiu Jitsu HQ.
      </p>
      <img
        src="https://placehold.co/900x600?text=Logo+Collage+of+Affiliates"
        alt="Logo collage of affiliates / partner schools"
        style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '60px' }}
      />
      <FAQ faqData={pageFaqs} title="Affiliate School FAQs" />
    </div>
  );
};

export default AffiliateSchools;