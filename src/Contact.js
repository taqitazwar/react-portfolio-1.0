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
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/taqitazwar', color: '#333' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/ttazwar/', color: '#0077B5' }
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
                    <span className="btn-icon">🚀</span>
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
                <div className="status-indicator available"></div>
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
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
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