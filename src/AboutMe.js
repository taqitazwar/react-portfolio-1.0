import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.css';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = ({ setCurrentPage }) => {
  // Utility function for robust scroll-to-top behavior
  const scrollToTop = () => {
    // Method 1: Try smooth scroll
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Method 2: Force instant scroll
      window.scrollTo(0, 0);
    }

    // Method 3: Additional fallback for stubborn mobile browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    // Execute immediately and also with a small delay
    scrollToTop();
    setTimeout(scrollToTop, 100);
  };

  useEffect(() => {
    // Animate page elements on load
    gsap.fromTo('.about-header', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // About sections - Right to Left animation
    gsap.fromTo('.about-section', 
      { x: 100, opacity: 0, scale: 0.95 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out", 
        delay: 0.3,
        scrollTrigger: {
          trigger: '.about-section',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills items - Right to Left animation
    gsap.fromTo('.skill-item',
      { x: 120, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.skills-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Education cards - Right to Left animation
    gsap.fromTo('.education-item',
      { x: 150, opacity: 0, rotateY: 10 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.education-timeline',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Experience cards - Right to Left animation
    gsap.fromTo('.experience-card',
      { x: 150, opacity: 0, rotateY: 10 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.experience-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Achievement cards - Right to Left animation
    gsap.fromTo('.achievement-item',
      { x: 100, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.achievements-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skill bars animation
    gsap.fromTo('.skill-bar', 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 1.5, ease: "power3.out", delay: 0.8, stagger: 0.1 }
    );

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const skills = [
    { name: 'Python', level: 100, icon: '🐍', category: 'Programming' },
    { name: 'Java', level: 100, icon: '☕', category: 'Programming' },
    { name: 'JavaScript', level: 100, icon: '⚡', category: 'Programming' },
    { name: 'C', level: 100, icon: '💻', category: 'Programming' },
    { name: 'HTML5 & CSS3', level: 100, icon: '🌐', category: 'Web' },
    { name: 'React.js', level: 100, icon: '⚛️', category: 'Web' },
    { name: 'Node.js & Express.js', level: 100, icon: '🌟', category: 'Web' },
    { name: 'SQL & SQLite', level: 100, icon: '🗄️', category: 'Database' },
    { name: 'MongoDB', level: 100, icon: '🍃', category: 'Database' },
    { name: 'Git & GitHub', level: 100, icon: '🔧', category: 'Tools' },
    { name: 'Data Analysis (Pandas, NumPy)', level: 100, icon: '📊', category: 'Data Science' },
    { name: 'Flutter & Dart', level: 100, icon: '📱', category: 'Mobile' }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Memorial University of Newfoundland',
      period: 'May 2022 - Present',
      description: 'Pursuing a comprehensive degree in Computer Science with a focus on software development and algorithms.',
      achievements: [
        'Currently enrolled in Bachelor of Science program',
        'Studying software engineering principles',
        'Hands-on experience with various programming languages'
      ]
    },
    {
      degree: 'Certificate in Business Administration',
      school: 'Memorial University of Newfoundland',
      period: 'May 2025 - Present',
      description: 'Complementing technical skills with business knowledge and management principles.',
      achievements: [
        'Business management fundamentals',
        'Strategic planning and analysis',
        'Entrepreneurship and leadership skills'
      ]
    }
  ];

  const experience = [
    {
      title: 'Entrepreneurship Training Program',
      company: 'Memorial University of Newfoundland',
      period: 'January 2025 - May 2025',
      type: 'Full-Time',
      description: 'Participated in Memorial\'s comprehensive Entrepreneurship Training Program (ETP), an education program for graduate students interested in starting a business and learning entrepreneurship fundamentals.',
      achievements: [
        'Completed Discover and Develop programs building essential entrepreneurial skills and knowledge',
        'Developed business planning and venture creation capabilities through structured curriculum',
        'Built valuable connections with fellow entrepreneurs and industry professionals',
        'Gained practical experience in startup fundamentals and business development strategies',
        'Enhanced understanding of innovation, market analysis, and entrepreneurial leadership'
      ]
    },
    {
      title: 'Brand Ambassador',
      company: 'Gap Inc',
      period: 'September 2023 - Present',
      type: 'Full-Time',
      description: 'Promoting brand awareness and driving sales through customer engagement and marketing initiatives.',
      achievements: [
        'Achieved "Employee of the Month" recognition by surpassing monthly target by 15%',
        'Recognized 4 times for most lead creations, contributing to more overall revenue through email marketing',
        'Advised customers on product selection, optimizing satisfaction scores, increasing conversion by 15% and boosting business',
        'Developed strong communication and customer service skills in fast-paced retail environment'
      ]
    },
    {
      title: 'Outbound Sales Representative',
      company: 'The Sydney Call Centre',
      period: 'February 2023 - November 2023',
      type: 'Full-Time',
      description: 'Managed customer relationships and technical sales operations while developing communication and data management skills.',
      achievements: [
        'Handled 80+ customer interactions daily using CRM systems and database management',
        'Exceeded weekly performance targets by 20% through analytical approach and data-driven decision making',
        'Maintained 100% documentation accuracy in customer database, improving data integrity',
        'Developed strong communication and problem-solving skills applicable to technical roles'
      ]
    },
    {
      title: 'Ambassador',
      company: 'International Youth Math Challenge',
      period: 'August 2019 -\nSeptember 2023',
      type: 'Full-Time',
      description: 'Promoted STEM education and mathematical problem-solving among youth participants.',
      achievements: [
        'Facilitated mathematical problem-solving sessions for international participants',
        'Promoted computational thinking and analytical skills development',
        'Collaborated with educators to develop engaging STEM learning experiences',
        'Demonstrated leadership in educational technology and mathematics'
      ]
    }
  ];

  const personalInfo = {
    bio: "I'm a Computer Science student at Memorial University of Newfoundland with a passion for software development and problem-solving. Currently pursuing my Bachelor of Science degree while gaining practical experience in customer service and sales. I enjoy working on coding projects, contributing to open-source initiatives, and am always eager to learn new technologies and expand my programming expertise. I'm actively seeking co-op opportunities to apply my technical skills in a professional software development environment.",
    interests: [
      'Software Development',
      'Web Development',
      'Data Analysis',
      'Mobile App Development',
      'Machine Learning',
      'Artificial Intelligence',
      'Problem Solving'
    ],
    languages: ['English (Fluent)', 'Bengali (Native)', 'Hindi (Fluent)', 'Urdu (Fluent)', 'Arabic (Intermediate)'],
    hobbies: ['Programming', 'Automotive Technology', 'Collecting Stamps', 'Technology', 'Small Businesses'],
    values: ['Innovation', 'Continuous Learning', 'Problem Solving', 'Quality Code', 'Teamwork']
  };

  const achievements = [
    { title: 'Portfolio Website Creation', year: '2025', description: 'Created portfolio website from scratch using React.js with modern UI/UX design' },
    { title: 'AWS Cloud Certification Journey', year: '2024', description: 'Started AWS Cloud Practitioner certification preparation' },
    { title: 'Employee of the Month', year: '2024', description: 'Recognized for highest loyal membership generations increasing monthly revenue through email marketing' },
    { title: 'Sales Performance Excellence', year: '2023', description: 'Exceeded weekly sales targets by 20% through analytical approach and data-driven decisions' },
    { title: 'Daily Stars Highest Achievers Award', year: '2019', description: 'Awarded for exceptional academic performance and excellence in mathematics and science' },
    { title: 'Technical Leadership', year: '2019 - Present', description: 'Selected as Ambassador for International Youth Math Challenge, promoting STEM education globally' }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Page Header */}
        <div className="about-header">
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">
            Get to know me better - my journey, skills, and passions
          </p>
        </div>

        {/* Personal Introduction */}
        <section className="about-section intro-section">
          <div className="section-header">
            <h2>Who I Am</h2>
          </div>
          <div className="intro-content">
            <div className="bio-text">
              <p>{personalInfo.bio}</p>
            </div>
            <div className="personal-details">
              <div className="detail-group">
                <h3>Interests</h3>
                <div className="tag-list">
                  {personalInfo.interests.map((interest, index) => (
                    <span key={index} className="tag">{interest}</span>
                  ))}
                </div>
              </div>
              <div className="detail-group">
                <h3>Languages</h3>
                <div className="tag-list">
                  {personalInfo.languages.map((language, index) => (
                    <span key={index} className="tag">{language}</span>
                  ))}
                </div>
              </div>
              <div className="detail-group">
                <h3>Hobbies</h3>
                <div className="tag-list">
                  {personalInfo.hobbies.map((hobby, index) => (
                    <span key={index} className="tag">{hobby}</span>
                  ))}
                </div>
              </div>
              <div className="detail-group">
                <h3>Core Values</h3>
                <div className="tag-list">
                  {personalInfo.values.map((value, index) => (
                    <span key={index} className="tag value-tag">{value}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="about-section skills-section">
          <div className="section-header">
            <h2>Technical Skills</h2>
            <p>My technology stack and the tools that power my projects</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <div className="skill-info">
                    <span className="skill-icon">{skill.icon}</span>
                    <div>
                      <h3 className="skill-name">{skill.name}</h3>
                      <span className="skill-category">{skill.category}</span>
                    </div>
                  </div>
                </div>
                <div className="skill-progress">
                  <div 
                    className="skill-bar" 
                    style={{ '--skill-width': `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="about-section education-section">
          <div className="section-header">
            <h2>Education</h2>
            <p>My academic journey and achievements</p>
          </div>
          <div className="timeline">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{edu.degree}</h3>
                    <span className="timeline-period">{edu.period}</span>
                  </div>
                  <h4 className="timeline-institution">{edu.school}</h4>
                  <p className="timeline-description">{edu.description}</p>
                  <div className="timeline-achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="about-section experience-section">
          <div className="section-header">
            <h2>Professional Experience</h2>
            <p>Technical roles and relevant work experience</p>
          </div>
          <div className="experience-grid">
            {experience.map((exp, index) => (
              <div key={index} className="experience-card">
                <div className="experience-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  <div className="experience-meta">
                    <span className="experience-period">{exp.period}</span>
                    <span className={`experience-type ${exp.type.toLowerCase()}`}>{exp.type}</span>
                  </div>
                </div>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Involvement Section */}
        <section className="about-section community-section">
          <div className="section-header">
            <h2>Community Involvement</h2>
            <p>Leadership and volunteer experiences</p>
          </div>
          <div className="experience-grid">
            <div className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>Volunteer Coordinator</h3>
                  <h4>The Salvation Army</h4>
                </div>
                <div className="experience-meta">
                  <span className="experience-type volunteer">Volunteer</span>
                </div>
              </div>
              <p className="experience-description">Participated in community outreach programs focused on poverty alleviation and homelessness support initiatives.</p>
              <div className="experience-achievements">
                <h5>Key Contributions:</h5>
                <ul>
                  <li>Supported End Homelessness campaign in St. John's community</li>
                  <li>Demonstrated commitment to social responsibility and community service</li>
                  <li>Developed teamwork and organizational skills through volunteer coordination</li>
                </ul>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>Fundraising Volunteer</h3>
                  <h4>Memorial University of Newfoundland</h4>
                </div>
                <div className="experience-meta">
                  <span className="experience-type volunteer">Volunteer</span>
                </div>
              </div>
              <p className="experience-description">Supported university food bank operations and fundraising initiatives to assist students in need.</p>
              <div className="experience-achievements">
                <h5>Key Contributions:</h5>
                <ul>
                  <li>Collected monetary and food donations for MUN Food Bank operations</li>
                  <li>Organized fundraising events and community outreach programs</li>
                  <li>Demonstrated leadership and commitment to student community support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="about-section achievements-section">
          <div className="section-header">
            <h2>Achievements & Awards</h2>
            <p>Recognition and milestones in my journey</p>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <span className="achievement-year">{achievement.year}</span>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <div className="back-to-home">
          <button 
            className="btn btn-outline"
            onClick={() => handlePageChange('home')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 
