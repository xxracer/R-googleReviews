import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-seo-text">
          <p>Reign Jiu Jitsu – proudly part of the Texas Jiu Jitsu and Houston BJJ community. Your home for BJJ Texas and Jiu Jitsu Houston TX.</p>
        </div>
        <div className="footer-links">
          <a href="/kids-program">Programs</a>
          <a href="/schedule">Schedule</a>
          <a href="/instructors">Instructors</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Reign Jiu Jitsu. All rights reserved.
          <div className="footer-credits">
            Made By <a href="https://ilptechnology.com/" target="_blank" rel="noopener noreferrer">ILP Technologys</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;