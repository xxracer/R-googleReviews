
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import FAQ from '../components/FAQ';
import './Instructors.css'; // Import the new CSS file

const API_URL = '/api/instructors';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log("Instructors Data Received from API:", data);
        // Ensure sorting by ID
        const sortedData = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setInstructors(sortedData);
      })
      .catch(err => console.error("Error fetching instructors:", err));
  }, []);

  const parseBio = (bio) => {
    // If bio is already HTML (contains <p> or <h3>), return it as is.
    if (typeof bio === 'string' && (bio.includes('<p>') || bio.includes('<h3>'))) {
      return DOMPurify.sanitize(bio);
    }

    // Fallback: Parse the custom array format or raw string
    const bioArray = Array.isArray(bio) ? bio : [bio];
    let html = '';

    bioArray.forEach(paragraph => {
      const p = String(paragraph).trim(); // Ensure string
      if (p.startsWith('#')) {
        html += `<h3>${p.substring(1).trim()}</h3>`;
      } else if (p.startsWith('*')) {
        html += `<p><strong>${p.substring(1).trim()}</strong></p>`;
      } else {
        html += `<p>${p}</p>`;
      }
    });

    return DOMPurify.sanitize(html);
  };

  const pageFaqs = [
    {
      question: "What are the primary competition achievements of the instructors?",
      answer: "Our instructors are highly decorated competitors, with major titles including IBJJF World and Pan American championships."
    },
    {
      question: "What belt ranks do the instructors hold?",
      answer: "Our team is led by accomplished Black Belts, ensuring that students receive instruction at the highest level of technical knowledge and competitive experience."
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
    <div className="instructors-page">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <h1>Meet Our World-Class Instructors</h1>

      {instructors.map((instructor, index) => (
        <div key={instructor.id} className={`instructor-item ${index % 2 !== 0 ? 'reverse' : ''}`}>
          <div className="instructor-image-wrapper">
            <img
              src={instructor.image}
              alt={instructor.name}
            />
          </div>
          <div className="instructor-bio">
            <h2>{instructor.name}</h2>
            {instructor.title && <p className="instructor-title">{instructor.title}</p>}
            <div
              className="instructor-bio-content"
              dangerouslySetInnerHTML={{ __html: parseBio(instructor.bio) }}
            />
          </div>
        </div>
      ))}

      <FAQ faqData={pageFaqs} title="Instructor FAQs" />
    </div>
  );
};

export default Instructors;
