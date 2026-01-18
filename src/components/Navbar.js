import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = (e, dropdownName) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
    setOpenDropdown(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen]);

  const navClasses = `main-navbar ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`;
  const linksClasses = `navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`;

  return (
    <nav className={navClasses}>
      <div className="navbar-left">
        <ul className={linksClasses}>
          <li className="dropdown">
            <a href="#programs" onClick={(e) => handleDropdownClick(e, 'programs')}>Programs</a>
            <ul className={`dropdown-menu ${openDropdown === 'programs' ? 'open' : ''}`}>
              <li><Link to="/kids-program" onClick={closeMobileMenu}>Kids Program</Link></li>
              <li><Link to="/homeschool-program" onClick={closeMobileMenu}>Homeschool Program</Link></li>
              <li><Link to="/adult-program" onClick={closeMobileMenu}>Adult Program</Link></li>
              <li><Link to="/fundamentals-program" onClick={closeMobileMenu}>Fundamentals Program</Link></li>
              <li><Link to="/competition-training" onClick={closeMobileMenu}>Competition Training</Link></li>
              <li><Link to="/wrestling-program" onClick={closeMobileMenu}>Wrestling Program</Link></li>
              <li><Link to="/private-lessons" onClick={closeMobileMenu}>Private Lessons</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#schedule" onClick={(e) => handleDropdownClick(e, 'schedule')}>Schedule</a>
            <ul className={`dropdown-menu ${openDropdown === 'schedule' ? 'open' : ''}`}>
              <li><Link to="/training-schedule" onClick={closeMobileMenu}>Training Schedule</Link></li>
              <li><Link to="/instructors" onClick={closeMobileMenu}>Instructors</Link></li>
              <li><Link to="/facility" onClick={closeMobileMenu}>Our Facility</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#more" onClick={(e) => handleDropdownClick(e, 'more')}>More</a>
            <ul className={`dropdown-menu ${openDropdown === 'more' ? 'open' : ''}`}>
              <li><Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link></li>
              <li><Link to="/about" onClick={closeMobileMenu}>About / Our Method</Link></li>
              <li><Link to="/blog" onClick={closeMobileMenu}>Blog</Link></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-logo">
        <Link to="/">REIGN JIU JITSU</Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-contact">
          <a href="tel:17134466008">Call or text (713) 446-6008</a>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/ReignJiuJitsu/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/reignjiujitsu/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        <button className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
