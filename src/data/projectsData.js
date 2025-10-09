// Projects data - Frontend only
export const projectsData = [
  {
    _id: "1",
    title: "Tisane Labs",
    description: "AI-driven text analysis API platform with sentiment and contextual insights, alongside a secure role-based authentication system for controlled data access.",
    fullDescription: "A comprehensive meeting booking application built with the MERN stack. This application allows users to schedule, manage, and track meetings efficiently. Features include real-time availability checking, automated email notifications, calendar integration, and a responsive dashboard for both users and administrators.",
    techStack: [
      "React.js",
      "Node.js", 
      "Express.js",
      "PostgreSQL",
      "AWS",
      "Tailwind CSS"
    ],
    category: "Full-Stack Developer",
    status: "Completed",
    featured: true,
    images: [
      "/images/Tisane-Labs-One.png",
      "/images/Tisane-Labs-Two.png", 
      "/images/Tisane-Labs-Three.png",
      "/images/Tisane-Labs-Four.png"
    ],
    demoUrl: "https://tisane.ai/home",
    /* githubUrl: "", */
    features: [
      "Implemented contextual analysis, entity extraction, and granular topic modeling",
      "Enabled automatic translation, multilingual word lists, and accurate language identification",
      "Email notifications",
      "User authentication",
      "Admin dashboard",
      "Responsive design"
    ],
    challenges: [
      "Ensuring accuracy in translation and language identification across diverse datasets",
      "NLP model accuracy with real-time performance",
      "Ensuring data consistency across time zones"
    ],
    learnings: [
      "Hands-on experience in sentiment analysis, topic modeling",
      "Gained security-first principles with role-based authentication",
      "Real-time data synchronization"
    ],
    duration: "3 months",
    teamSize: "Solo Project",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-15"
  },
  {
    _id: "2", 
    title: "Hush Application",
    description: "High-performance social media platform with interest-based communities, real-time messaging, and interactive posts, stories, and group features.",
    fullDescription: "A complete e-commerce solution built with React and Node.js. Features include product catalog, shopping cart, secure payment processing, order management, and admin panel. The platform supports multiple payment methods and provides a seamless shopping experience across all devices.",
    techStack: [
      "Node.js",
      "Express.js", 
      "Terraform",
      "Amazon DynamoDB",
      "Amazon S3"
    ],
    category: "Backend Developer",
    status: "Completed",
    featured: true,
    images: [
      "/images/Hush-One.png",
      "/images/Hush-Two.png",
      "/images/Hush-Three.png",
      "/images/Hush-Four.png"
    ],
    demoUrl: "https://play.google.com/store/apps/details?id=ac.hush.app&hl=en-US",
    /* githubUrl: "", */
    features: [
      "Interest-based communities with group creation, stories, posts, and threaded comment replies",
      "Real-time private and group chat with scalable messaging architecture",
      "Secure payment processing",
      "Order tracking",
      "User profiles and order history",
      "Admin dashboard for inventory management"
    ],
    challenges: [
      "Designing a backend that efficiently handles both relational and NoSQL data structures",
      "Ensuring real-time synchronization for chats",
      "Optimizing performance for large product catalogs"
    ],
    learnings: [
      "Gained expertise in architecting hybrid database systems for performance and scalability",
      "Building user based real-time communication systems",
      "Security best practices for e-commerce"
    ],
    duration: "4 months",
    teamSize: "Solo Project", 
    createdAt: "2023-08-01",
    updatedAt: "2023-12-01"
  },
  {
    _id: "3",
    title: "Serenity", 
    description: "Insurance analytics platform with automated notifications, personalized communication, interactive dashboards, and optimized reporting performance.",
    fullDescription: "A real-time chat application built with React and Socket.io. Features include instant messaging, group chats, file sharing, emoji support, and online status indicators. The application provides a smooth and responsive messaging experience similar to popular chat platforms.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    category: "Full Stack Developer",
    status: "Completed",
    featured: false,
    images: [
      "/images/Serenity-One.png",
      "/images/Serenity-Two.png",
      "/images/Serenity-Three.png",
      "/images/Serenity-Four.png"
    ],
    demoUrl: "https://www.serenityhp.com",
    /* githubUrl: "", */
    features: [
      "Integration of dynamic templates enables personalized communication with users",
      "Interactive charts provide clear visualization of insurance trends and claims data", 
      "File and image sharing",
      "Emoji support",
      "Online/offline status",
      "Message history"
    ],
    challenges: [
      "Representing large insurance and claims datasets in an intuitive, interactive format",
      "Maintaining data accuracy and integrity",
      "Handling file uploads and sharing"
    ],
    learnings: [
      "Well-designed dashboards make trends actionable and decision-making faster",
      "Proper indexing and query tuning significantly enhance reporting efficiency",
      "Optimizing socket performance"
    ],
    duration: "2 months",
    teamSize: "Solo Project",
    createdAt: "2023-05-01", 
    updatedAt: "2023-07-01"
  },
  {
    _id: "4",
    title: "Meal Prep Admin Panel",
    description: "Personalized meal delivery application with custom meal selection, real-time order updates, push notifications, and scalable role-based user management.",
    fullDescription: "A comprehensive task management application with project organization, team collaboration, and progress tracking. Built with modern React patterns and a clean, intuitive interface that helps teams stay organized and productive.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB", 
      "Firebase",
    ],
    category: "Full Stack Developer",
    status: "In Progress",
    featured: false,
    images: [
      "/images/MealPrep-One.jpeg",
      "/images/MealPrep-Two.jpeg",
      "/images/MealPrep-Three.jpeg",
      "/images/MealPrep-Four.jpeg"
    ],
    /* demoUrl: "https://task-manager-demo.vercel.app", */
    /* githubUrl: "", */
    features: [
      "Personalized meal selection platform with admin dashboard for seamless management",
      "Real-time order updates via Firebase push notifications, including bulk notifications",
      "Progress tracking and analytics",
      "Deadline management",
      "File attachments",
      "Activity timeline"
    ],
    challenges: [
      "Ensuring smooth coordination between frontend React.js components and backend Node.js APIs",
      "Implementing individual & bulk push notifications",
      "Performance optimization for large datasets"
    ],
    learnings: [
      "Strengthened understanding of role-based access control and secure user management",
      "Gained hands-on experience implementing real-time notifications with Firebase",
      "Performance optimization techniques"
    ],
    duration: "Ongoing",
    teamSize: "Solo Project",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-20"
  },
  {
    _id: "5",
    title: "PGI Equipment Admin Panel",
    description: "PGI Equipment Admin Panel with dashboard, analytics, PDF exports, user authentication, and automated maintenance tracking for efficient equipment management.",
    fullDescription: "A comprehensive task management application with project organization, team collaboration, and progress tracking. Built with modern React patterns and a clean, intuitive interface that helps teams stay organized and productive.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Material UI",
      "Express API"
    ],
    category: "Frontend Developer",
    status: "In Progress",
    featured: false,
    images: [
      "/images/PGIEquip-One.png",
      "/images/PGIEquip-Two.png",
      "/images/PGIEquip-Three.png",
      "/images/PGIEquip-Four.png"
    ],
    /* demoUrl: "https://task-manager-demo.vercel.app", */
    /* githubUrl: "", */
    features: [
      "Interactive admin panel with Dashboard, Add Equipment, Analytics, and user authentication",
      "OTP-based password management and email integration for secure user access",
      "Progress tracking and analytics",
      "Deadline management",
      "File attachments",
      "Activity timeline"
    ],
    challenges: [
      "Implementing OTP-based authentication and ensuring secure password updates",
      "Handling dynamic equipment data in real-time",
      "Performance optimization for large datasets"
    ],
    learnings: [
      "Hands-on experience integrating frontend with Express.js APIs and Tailwind for responsive UI",
      "Learned to manage real-time data updates, and downloadable report generation effectively.",
      "Performance optimization techniques"
    ],
    duration: "Ongoing",
    teamSize: "Solo Project",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-20"
  },

  /*
  {
    _id: "6",
    title: "Elevate Realty",
    description: "PGI Equipment Admin Panel with dashboard, analytics, PDF exports, user authentication, and automated maintenance tracking for efficient equipment management.",
    fullDescription: "A comprehensive task management application with project organization, team collaboration, and progress tracking. Built with modern React patterns and a clean, intuitive interface that helps teams stay organized and productive.",
    techStack: [
      "WIX",
      "WIX Velo",
      "JavaScript",
      "HTML",
      "CSS3"
    ],
    category: "Full-Stack Developer",
    status: "In Progress",
    featured: false,
    images: [
      "/images/ER-One.png",
      "/images/ER-Two.png",
      "/images/ER-Three.png",
      "/images/ER-Four.png"
    ],
    demoUrl: "https://www.elevaterealtyinfo.com",
    githubUrl: "",
    features: [
      "Project and task organization",
      "Team collaboration tools",
      "Progress tracking and analytics",
      "Deadline management",
      "File attachments",
      "Activity timeline"
    ],
    challenges: [
      "Complex data relationships",
      "Real-time collaboration features",
      "Performance optimization for large datasets"
    ],
    learnings: [
      "PostgreSQL advanced queries",
      "Complex state management",
      "Performance optimization techniques"
    ],
    duration: "Ongoing",
    teamSize: "Solo Project",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-20"
  }
*/
]

// Export individual project by ID for project detail pages
export const getProjectById = (id) => {
  return projectsData.find(project => project._id === id)
}

// Export filtered projects by category
export const getProjectsByCategory = (category) => {
  if (category === 'All' || !category) return projectsData
  return projectsData.filter(project => project.category === category)
}

// Export featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}
