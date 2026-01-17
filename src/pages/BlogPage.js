import React from 'react';
import FAQ from '../components/FAQ';

const BlogPage = () => {
  const pageFaqs = [
    {
      question: "What kind of topics does the Reign BJJ blog cover?",
      answer: "Our blog covers a wide range of topics, including expert technique breakdowns, self-defense strategies, fitness and weight loss tips, community news, and coverage of local tournaments."
    },
    {
      question: "Can I submit an article or suggest a topic for the blog?",
      answer: "We encourage community involvement! Please use our Contact Us page to submit content suggestions or inquire about guest contributions."
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
      <h1 style={{ marginBottom: '20px' }}>Our Blog</h1>
      <p style={{ marginBottom: '40px', fontSize: '18px', lineHeight: '1.7' }}>
        Our blog shares training tips, competition updates, and stories from our community. Articles cover topics such as beginner Jiu Jitsu near me, best martial arts for kids in Katy, and competition BJJ Houston. Follow our blog to stay inspired and informed.
      </p>
      <img
        src="https://placehold.co/900x400?text=Featured+Blog+Article"
        alt="Featured blog article"
        style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '60px' }}
      />
      {/* Note: In a real application, the blog posts would be dynamically generated here. */}
      <FAQ faqData={pageFaqs} title="Blog FAQs" />
    </div>
  );
};

export default BlogPage;