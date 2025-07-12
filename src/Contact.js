import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Contact.css';

const Contact = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Animate page elements on load
    gsap.fromTo('.contact-header', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Contact cards - Right to Left animation
    gsap.fromTo('.contact-card', 
      { x: 150, opacity: 0, scale: 0.9, rotateY: 10 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out", 
        delay: 0.3 
      }
    );

    // Contact info items - Right to Left animation
    gsap.fromTo('.contact-info-item', 
      { x: 100, opacity: 0 }, 
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out", 
        delay: 0.6 
      }
    );

    // Social links - Right to Left animation
    gsap.fromTo('.social-links', 
      { x: 80, opacity: 0 }, 
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out", 
        delay: 0.8 
      }
    );

    // Social link items - Right to Left animation
    gsap.fromTo('.social-link', 
      { x: 60, opacity: 0, scale: 0.9 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power3.out", 
        delay: 0.9 
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'ttazwar@mun.ca',
      link: 'mailto:ttazwar@mun.ca'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://www.linkedin.com/in/ttazwar/'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'View my code',
      link: 'https://github.com/taqitazwar'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '(709) 740-2655',
      link: 'tel:+17097402655'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'St. John\'s, NL, Canada',
      link: 'https://maps.google.com/?q=St.+John\'s,+NL,+Canada'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/taqitazwar', color: '#333' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ttazwar/', color: '#0077B5' }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="contact-header">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Let's connect and build something amazing together
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-card form-card">
            <div className="card-header">
              <h2>Send me a message</h2>
              <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project, idea, or just say hello!"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-success">
                  <span className="success-icon">✅</span>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-card info-card">
            <div className="card-header">
              <h2>Contact Information</h2>
              <p>Prefer to reach out directly? Here are my contact details.</p>
            </div>

            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  className="contact-item"
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <div className="contact-label">{info.label}</div>
                    <div className="contact-value">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="availability">
              <div className="availability-status">
                <span>Available for opportunities</span>
              </div>
              <p className="availability-text">
                I'm currently pursuing my Computer Science degree at Memorial University of Newfoundland and actively seeking co-op opportunities to apply my technical skills in a professional development environment.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <h3>Connect with me</h3>
          <div className="social-grid">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-link"
                style={{ '--social-color': social.color }}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
              >
                <span className="social-icon">
                  {social.name === 'GitHub' && (
                    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  )}
                  {social.name === 'LinkedIn' && (
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                    </svg>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="back-to-home">
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact; 