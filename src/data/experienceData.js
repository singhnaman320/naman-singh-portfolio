// Experience data - Frontend only
export const experienceData = [
  {
    _id: "1",
    company: "Acme In Tech Pvt. Ltd.",
    position: "Full-Stack Developer",
    location: "Lucknow, India",
    startDate: "2024-03-01",
    endDate: null, // Current position
    current: true,
    description: "Built scalable web and mobile applications across domains like social media, e-commerce, real estate, and insurance analytics. Designed high-performance backend systems with Node.js, DynamoDB, and PostgreSQL, while implementing real-time messaging and AI-powered APIs. Enhanced user experience through intuitive React.js interfaces, role-based access control, and optimized database structures.",
    technologies: [
      "Node.js",
      "React.js", 
      "MongoDB",
      "Express.js",
      "Amazon DynamoDB",
      "Amazon S3",
      "Payload CMS",
      "Terraform",
      "PostgreSQL",
      "WIX"
    ],
    logo: "/images/acmeInTech-logo.png",
    website: "https://acmeintech.com",
    type: "Full-time",
    achievements: [
      "Developed scalable applications across multiple domains",
      "Implemented real-time messaging systems",
      "Built AI-powered APIs and integrations",
      "Optimized database performance and structures"
    ]
  },
  {
    _id: "2", 
    company: "Masai School",
    position: "Full-Stack Developer Intern",
    location: "Remote, India",
    startDate: "2022-03-01",
    endDate: "2023-05-31",
    current: false,
    description: "Developed full-stack projects including a Meeting Room Booking System, Insurance Management, and E-commerce platforms. Applied MERN and Spring Boot to build secure authentication, robust APIs, and interactive UIs. Strengthened problem-solving by implementing booking conflict resolution, dynamic dashboards, and seamless checkout flows.",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB", 
      "Express.js",
      "Java",
      "SpringBoot",
      "Hibernate",
      "MySQL"
    ],
    logo: "/images/masai-logo.png",
    website: "https://masaischool.com",
    type: "Internship",
    achievements: [
      "Built Meeting Room Booking System with conflict resolution",
      "Developed Insurance Management platform",
      "Created E-commerce platform with secure checkout",
      "Implemented dynamic dashboards and interactive UIs"
    ]
  },
  {
    _id: "3",
    company: "Wizcure Pharmaa Pvt. Ltd.",
    position: "Maintenance Engineer", 
    location: "Bhiwadi, India",
    startDate: "2018-11-01",
    endDate: "2021-01-31",
    current: false,
    description: "Led preventive and corrective maintenance of pharmaceutical production equipment, ensuring minimal downtime and regulatory compliance. Managed a 10-member team, optimized equipment servicing schedules, and improved operational efficiency by 20%.",
    technologies: [
      "Maintenance Tools & Techniques",
      "Team & Workflow Tools"
    ],
    logo: "/images/wizcure-logo.png", 
    website: "https://wizcure.com",
    type: "Full-time",
    achievements: [
      "Improved operational efficiency by 20%",
      "Managed 10-member maintenance team",
      "Ensured regulatory compliance",
      "Optimized equipment servicing schedules"
    ]
  }
]

// Helper functions
export const getCurrentExperience = () => {
  return experienceData.find(exp => exp.current)
}

export const getPastExperiences = () => {
  return experienceData.filter(exp => !exp.current)
}

export const getExperienceById = (id) => {
  return experienceData.find(exp => exp._id === id)
}

// Get company logo - moved from utils
export const getCompanyLogo = (companyName) => {
  if (!companyName) return '/images/company-placeholder.jpg'
  
  const experience = experienceData.find(exp => exp.company === companyName)
  return experience?.logo || '/images/company-placeholder.jpg'
}

// Format date range helper
export const formatExperienceDate = (startDate, endDate, current = false) => {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
  
  if (current || !endDate) {
    return `${startFormatted} - Present`
  }
  
  const end = new Date(endDate)
  const endFormatted = end.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
  
  return `${startFormatted} - ${endFormatted}`
}
