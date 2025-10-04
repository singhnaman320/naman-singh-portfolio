// Skills data - Frontend only
export const skillsData = [
  // Frontend Technologies
  {
    _id: "1",
    name: "React.js",
    category: "Frontend",
    proficiency: "Advanced",
    level: 90,
    yearsOfExperience: 2,
    icon: "⚛️",
    order: 1,
    isActive: true
  },
  {
    _id: "2", 
    name: "JavaScript",
    category: "Frontend",
    proficiency: "Expert",
    level: 95,
    yearsOfExperience: 3,
    icon: "🟨",
    order: 2,
    isActive: true
  },
  {
    _id: "3",
    name: "Tailwind CSS",
    category: "Frontend", 
    proficiency: "Advanced",
    level: 75,
    yearsOfExperience: 2,
    icon: "🎨",
    order: 3,
    isActive: true
  },
  {
    _id: "4",
    name: "Bootstrap CSS",
    category: "Frontend",
    proficiency: "Advanced", 
    level: 75,
    yearsOfExperience: 1,
    icon: "🅱️",
    order: 4,
    isActive: true
  },

  // Backend Technologies
  {
    _id: "5",
    name: "Node.js",
    category: "Backend",
    proficiency: "Advanced",
    level: 85,
    yearsOfExperience: 3,
    icon: "🟢",
    order: 5,
    isActive: true
  },
  {
    _id: "6",
    name: "Express.js", 
    category: "Backend",
    proficiency: "Advanced",
    level: 90,
    yearsOfExperience: 2,
    icon: "🚀",
    order: 6,
    isActive: true
  },
  {
    _id: "7",
    name: "SpringBoot",
    category: "Backend",
    proficiency: "Intermediate",
    level: 70,
    yearsOfExperience: 1,
    icon: "🍃",
    order: 7,
    isActive: true
  },

  // Database Technologies
  {
    _id: "8",
    name: "MongoDB",
    category: "Database",
    proficiency: "Advanced",
    level: 90,
    yearsOfExperience: 2,
    icon: "🍃",
    order: 8,
    isActive: true
  },
  {
    _id: "9",
    name: "MySQL",
    category: "Database",
    proficiency: "Intermediate", 
    level: 75,
    yearsOfExperience: 1,
    icon: "🐬",
    order: 9,
    isActive: true
  },
  {
    _id: "10",
    name: "Firebase Firestore",
    category: "Database",
    proficiency: "Intermediate",
    level: 80,
    yearsOfExperience: 1,
    icon: "🔥",
    order: 10,
    isActive: true
  },

  // DevOps/Cloud Technologies
  {
    _id: "11",
    name: "Amazon DynamoDB",
    category: "DevOps/Cloud",
    proficiency: "Advanced",
    level: 70,
    yearsOfExperience: 1,
    icon: "☁️",
    order: 11,
    isActive: true
  },
  {
    _id: "12",
    name: "Amazon S3",
    category: "DevOps/Cloud",
    proficiency: "Advanced",
    level: 95,
    yearsOfExperience: 1,
    icon: "📦",
    order: 12,
    isActive: true
  },
  {
    _id: "13",
    name: "Render",
    category: "DevOps/Cloud",
    proficiency: "Advanced",
    level: 90,
    yearsOfExperience: 2,
    icon: "🚀",
    order: 13,
    isActive: true
  },
  {
    _id: "14",
    name: "Vercel",
    category: "DevOps/Cloud",
    proficiency: "Advanced",
    level: 95,
    yearsOfExperience: 2,
    icon: "▲",
    order: 14,
    isActive: true
  },
  {
    _id: "15",
    name: "Netlify",
    category: "DevOps/Cloud",
    proficiency: "Advanced",
    level: 85,
    yearsOfExperience: 2,
    icon: "🌐",
    order: 15,
    isActive: true
  },
  {
    _id: "16",
    name: "Terraform",
    category: "DevOps/Cloud",
    proficiency: "Intermediate",
    level: 65,
    yearsOfExperience: 1,
    icon: "🏗️",
    order: 16,
    isActive: true
  },

  // Tools
  {
    _id: "17",
    name: "Git",
    category: "Tools",
    proficiency: "Advanced",
    level: 95,
    yearsOfExperience: 2,
    icon: "📝",
    order: 17,
    isActive: true
  },
  {
    _id: "18",
    name: "GitHub",
    category: "Tools",
    proficiency: "Advanced",
    level: 85,
    yearsOfExperience: 1,
    icon: "🐙",
    order: 18,
    isActive: true
  },
  {
    _id: "19",
    name: "Postman",
    category: "Tools",
    proficiency: "Expert",
    level: 95,
    yearsOfExperience: 3,
    icon: "📮",
    order: 19,
    isActive: true
  },
  {
    _id: "20",
    name: "Swagger",
    category: "Tools",
    proficiency: "Intermediate",
    level: 80,
    yearsOfExperience: 1,
    icon: "📋",
    order: 20,
    isActive: true
  },

  // Languages
  {
    _id: "21",
    name: "Java",
    category: "Languages",
    proficiency: "Intermediate",
    level: 70,
    yearsOfExperience: 1,
    icon: "☕",
    order: 21,
    isActive: true
  }
]

// Helper functions
export const getSkillsByCategory = (category) => {
  if (!category || category === 'All') return skillsData
  return skillsData.filter(skill => skill.category === category && skill.isActive)
}

export const getSkillById = (id) => {
  return skillsData.find(skill => skill._id === id)
}

export const getAllCategories = () => {
  const categories = [...new Set(skillsData.map(skill => skill.category))]
  return categories.sort()
}

export const getSkillsByProficiency = (proficiency) => {
  return skillsData.filter(skill => skill.proficiency === proficiency && skill.isActive)
}

export const getFeaturedSkills = () => {
  return skillsData.filter(skill => skill.level >= 85 && skill.isActive)
}

// Category order as per memory
export const categoryOrder = [
  'Frontend',
  'Backend', 
  'Database',
  'DevOps/Cloud',
  'Tools',
  'Languages',
  'Other'
]

export const getCategorizedSkills = () => {
  const categorized = {}
  
  categoryOrder.forEach(category => {
    categorized[category] = getSkillsByCategory(category)
  })
  
  return categorized
}
