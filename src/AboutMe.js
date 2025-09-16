import React, { useState, useEffect } from 'react';

const AboutMe = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
      title: 'Brand Ambassador',
      company: 'Royal LePage Atlantic',
      period: 'June 2024 - Present',
      location: 'St. John\'s, NL',
      type: 'Full-Time',
      description: 'Promoting brand awareness and driving sales through customer engagement and marketing initiatives.',
      achievements: [
        'Achieved "Employee of the Month" for excellence',
        'Recognized four times for most lead creations',
        'Developed strong communication and customer service skills in fast-paced retail environment'
      ]
    },
    {
      title: 'Sales Associate',
      company: 'Johnson Insurance',
      period: 'June 2023 - May 2024',
      location: 'St. John\'s, NL',
      type: 'Full-Time',
      description: 'Managed customer relationships and technical sales operations while developing communication and data management skills.',
      achievements: [
        'Handled 80+ customer interactions daily using CRM systems and database management',
        'Exceeded weekly performance targets through analytical approach and data-driven decision making',
        'Maintained 100% documentation accuracy in customer database',
        'Developed strong communication and problem-solving skills applicable to technical roles'
      ]
    },
    {
      title: 'Ambassador',
      company: 'International Youth Math Challenge',
      period: 'September 2019 - June 2023',
      location: 'Global',
      type: 'Volunteer',
      description: 'Promoted STEM education and mathematical excellence among youth globally.',
      achievements: [
        'Organized and facilitated educational workshops',
        'Mentored students in advanced mathematics',
        'Contributed to curriculum development'
      ]
    }
  ];

  const personalInfo = {
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
    { title: 'NL Eats Hackathon Winner', year: '2025', description: 'Pitched a creative business food insecurity solution for Newfoundland' },
    { title: 'AWS Cloud Certification Journey', year: '2024', description: 'Started AWS Cloud Practitioner certification preparation' },
    { title: 'Employee of the Month', year: '2024', description: 'Recognized for highest loyal membership generations increasing monthly revenue through email marketing' },
    { title: 'Sales Performance Excellence', year: '2023', description: 'Exceeded weekly sales targets by 20% through analytical approach and data-driven decisions' },
    { title: 'Daily Stars Highest Achievers Award', year: '2019', description: 'Awarded for exceptional academic performance and excellence in mathematics and science' },
    { title: 'Technical Leadership', year: '2019 - 2023', description: 'Selected as Ambassador for International Youth Math Challenge, promoting STEM education globally' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Rest of your component JSX would go here */}
      {/* I'm only showing the data structure fixes - you'll need to add back your full JSX */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
        
        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{skill.icon}</span>
                  <span className="font-semibold">{skill.name}</span>
                </div>
                <div className="text-sm text-gray-300">{skill.category}</div>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add your other sections here */}
      </div>
    </div>
  );
};

export default AboutMe;
