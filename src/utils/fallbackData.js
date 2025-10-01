/**
 * Fallback data to ensure the app always has something to display
 * when the backend is unavailable
 */

export const fallbackHome = {
  name: "Naman",
  title: "Full Stack Developer",
  bio: "Passionate developer building amazing web experiences.",
  profileImage: null,
  resumeUrl: null,
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    email: ""
  }
}

export const fallbackProjects = []

export const fallbackExperiences = []

export const fallbackSkills = {
  Frontend: [],
  Backend: [],
  Database: [],
  "DevOps/Cloud": [],
  Tools: [],
  Languages: [],
  Other: []
}

export const fallbackStats = {
  totalProjects: 0,
  yearsExperience: 0,
  technologiesUsed: 0,
  clientsServed: 0
}

export const getFallbackData = (dataType) => {
  switch (dataType) {
    case 'home':
      return fallbackHome
    case 'projects':
      return fallbackProjects
    case 'experiences':
      return fallbackExperiences
    case 'skills':
      return fallbackSkills
    case 'stats':
      return fallbackStats
    default:
      return null
  }
}

export default {
  fallbackHome,
  fallbackProjects,
  fallbackExperiences,
  fallbackSkills,
  fallbackStats,
  getFallbackData
}
