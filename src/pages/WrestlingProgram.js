import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProgramPage.css';
import FAQ from '../components/FAQ';

const WrestlingProgram = () => {
    const [images, setImages] = useState({
        hero: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
        detail1: 'https://placehold.co/600x400?text=Wrestling+Training+1',
        detail2: 'https://placehold.co/900x500?text=Wrestling+Training+2',
        heroCoords: { x: 0, y: 0 }
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const endpoints = [
                    { key: 'hero', url: '/api/content/wrestling_hero_image' },
                    { key: 'detail1', url: '/api/content/wrestling_detail_1' },
                    { key: 'detail2', url: '/api/content/wrestling_detail_2' }
                ];

                const newImages = { ...images };

                for (const endpoint of endpoints) {
                    try {
                        const res = await axios.get(endpoint.url);
                        if (res.data && res.data.content_value) {
                            let val = res.data.content_value;
                            if (endpoint.key === 'hero') {
                                try {
                                    const content = JSON.parse(val);
                                    newImages.hero = content.url || val;
                                    newImages.heroCoords = content.coords || { x: 0, y: 0 };
                                } catch (e) {
                                    // Not JSON or missing fields
                                    newImages.hero = val;
                                    newImages.heroCoords = { x: 0, y: 0 };
                                }
                            } else {
                                // Simple image string or JSON
                                try {
                                    const parsed = JSON.parse(val);
                                    if (parsed.url) val = parsed.url;
                                } catch (e) { }
                                newImages[endpoint.key] = val;
                            }
                        }
                    } catch (err) {
                        // Keep default
                    }
                }
                setImages(newImages);
            } catch (error) {
                console.error('Error fetching wrestling content:', error);
            }
        };
        fetchContent();
    }, []);

    const pageFaqs = [
        {
            question: 'Do I need prior wrestling experience to join?',
            answer:
                'No. We tailor instruction for newcomers and experienced grapplers alike, ensuring everyone learns proper stance, motion, and mat awareness from day one.'
        },
        {
            question: 'Can wrestling training help my Jiu Jitsu?',
            answer:
                'Absolutely. Takedown entries, level changes, and top control developed in wrestling directly boost your Gi and No-Gi performance.'
        }
    ];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <div className="program-page">
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <section
                className="program-hero"
            >
                <div className="program-hero-bg" style={{
                    backgroundImage: `url('${images.hero}')`,
                    backgroundPosition: `${images.heroCoords.x}px ${images.heroCoords.y}px` // Basic positioning
                }}></div>
                <h1 className="program-hero-title">Wrestling Program</h1>
            </section>

            <section className="program-intro">
                <h2>Strong. Fast. Disciplined.</h2>
                <p>
                    Wrestling is a complete sport that builds real-world athleticism: strength, balance, speed, coordination, and grit.
                    Sessions focus on stance and motion, hand-fighting, level changes, shots, and safe finishes, taught with clear
                    progressions and controlled intensity.
                </p>
            </section>

            <section className="program-details-section">
                <div className="program-details-text">
                    <h2>Why It Matters</h2>
                    <ul>
                        <li>- Develops full-body strength and conditioning</li>
                        <li>- Sharpens footwork, reaction time, and body control</li>
                        <li>- Builds confidence, resilience, and work ethic</li>
                        <li>- Takedown skills and top pressure directly support Jiu Jitsu and No-Gi</li>
                    </ul>
                </div>
                <div className="program-details-image">
                    <img
                        src={images.detail1}
                        alt="Two athletes drilling wrestling stance and motion"
                    />
                </div>
            </section>

            <section className="program-intro" style={{ maxWidth: '1000px' }}>
                <div className="program-details-text" style={{ margin: '0 auto' }}>
                    <h2>Who It&apos;s For</h2>
                    <p>Beginners, teens, and competitors looking to upgrade overall athletic performance.</p>
                    <h2 style={{ marginTop: '40px' }}>What to Bring</h2>
                    <p>Rashguard and shorts; wrestling shoes optional (clean soles). Mouthguard recommended.</p>
                    <h2 style={{ marginTop: '40px' }}>Ready to train?</h2>
                    <p>Join our Wrestling Program and build a stronger, faster version of you.</p>
                </div>
            </section>

            <div style={{ textAlign: 'center', margin: '0 auto 60px auto', maxWidth: '900px', padding: '0 20px' }}>
                <img
                    src={images.detail2}
                    alt="Coach guiding wrestling technique"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            </div>

            <FAQ faqData={pageFaqs} title="Wrestling Program FAQs" />
        </div>
    );
};

export default WrestlingProgram;
