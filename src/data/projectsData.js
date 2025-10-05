// Projects data - Frontend only
export const projectsData = [
  {
    _id: "1",
    title: "Tisane Labs",
    description: "Built and deployed AI-driven text analysis APIs with sentiment and contextual insights, alongside a secure role-based authentication system for controlled data access.",
    fullDescription: "A comprehensive meeting booking application built with the MERN stack. This application allows users to schedule, manage, and track meetings efficiently. Features include real-time availability checking, automated email notifications, calendar integration, and a responsive dashboard for both users and administrators.",
    techStack: [
      "React.js",
      "Node.js", 
      "Express",
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
    githubUrl: "https://github.com/singhnaman320/meeting-booking-app",
    features: [
      "Real-time meeting scheduling",
      "Calendar integration",
      "Email notifications",
      "User authentication",
      "Admin dashboard",
      "Responsive design"
    ],
    challenges: [
      "Implementing real-time availability checking",
      "Managing complex scheduling logic",
      "Ensuring data consistency across time zones"
    ],
    learnings: [
      "Advanced React state management",
      "MongoDB aggregation pipelines",
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
    description: "Developed a high-performance social media platform with interest-based communities, real-time messaging, and interactive posts, stories, and group features.",
    fullDescription: "A complete e-commerce solution built with React and Node.js. Features include product catalog, shopping cart, secure payment processing, order management, and admin panel. The platform supports multiple payment methods and provides a seamless shopping experience across all devices.",
    techStack: [
      "React",
      "Node.js",
      "Express", 
      "MongoDB",
      "JavaScript",
      "Tailwind CSS"
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
    githubUrl: "https://github.com/singhnaman320/ecommerce-platform",
    features: [
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Order tracking",
      "User profiles and order history",
      "Admin dashboard for inventory management"
    ],
    challenges: [
      "Implementing secure payment processing",
      "Managing complex product variations",
      "Optimizing performance for large product catalogs"
    ],
    learnings: [
      "Payment gateway integration",
      "Advanced database optimization",
      "Security best practices for e-commerce"
    ],
    duration: "4 months",
    teamSize: "Solo Project", 
    createdAt: "2023-08-01",
    updatedAt: "2023-12-01"
  },
  {
    _id: "3",
    title: "Real-Time Chat Application", 
    description: "Modern messaging platform with real-time communication capabilities, group chats, file sharing, and online status indicators for seamless user experience.",
    fullDescription: "A real-time chat application built with React and Socket.io. Features include instant messaging, group chats, file sharing, emoji support, and online status indicators. The application provides a smooth and responsive messaging experience similar to popular chat platforms.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS"
    ],
    category: "Full Stack Development",
    status: "Completed",
    featured: false,
    images: [
      "/images/chat-app-1.jpg",
      "/images/chat-app-2.jpg",
      "/images/chat-app-3.jpg"
    ],
    demoUrl: "https://realtime-chat-demo.vercel.app",
    githubUrl: "https://github.com/singhnaman320/realtime-chat-app",
    features: [
      "Real-time messaging",
      "Group chat functionality", 
      "File and image sharing",
      "Emoji support",
      "Online/offline status",
      "Message history"
    ],
    challenges: [
      "Implementing real-time communication",
      "Managing socket connections efficiently",
      "Handling file uploads and sharing"
    ],
    learnings: [
      "WebSocket implementation",
      "Real-time data synchronization",
      "Optimizing socket performance"
    ],
    duration: "2 months",
    teamSize: "Solo Project",
    createdAt: "2023-05-01", 
    updatedAt: "2023-07-01"
  },
  {
    _id: "4",
    title: "Task Management Dashboard",
    description: "Comprehensive task management application with project organization, team collaboration, progress tracking, and intuitive interface for productivity.",
    fullDescription: "A comprehensive task management application with project organization, team collaboration, and progress tracking. Built with modern React patterns and a clean, intuitive interface that helps teams stay organized and productive.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL", 
      "JavaScript",
      "Tailwind CSS",
      "JWT"
    ],
    category: "Full Stack Development",
    status: "In Progress",
    featured: false,
    images: [
      "/images/task-manager-1.jpg",
      "/images/task-manager-2.jpg",
      "/images/task-manager-3.jpg"
    ],
    demoUrl: "https://task-manager-demo.vercel.app",
    githubUrl: "https://github.com/singhnaman320/task-management-app",
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
