import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search, Filter, Github, ExternalLink, MessageCircle, User, Rocket, ChevronDown, ChevronLeft, ChevronRight, Play, Expand, X } from 'lucide-react'
import { projectsData } from '../data/projectsData'
import { useInView } from 'react-intersection-observer'

// Function to get tech stack colors for dark/light mode
const getTechColor = (tech) => {
  // All tech stacks use the same orange color scheme
  return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
}

// Advanced ProjectCard Component with Unique Design
const ProjectCard = ({ project, index, projectsInView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  // Use project images from data
  const projectImages = project.images || []

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, projectImages.length, index])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    // Temporarily pause auto-play, then resume after 3 seconds
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    // Temporarily pause auto-play, then resume after 3 seconds
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const goToImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex)
    // Temporarily pause auto-play, then resume after 3 seconds
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  // Transform value for image carousel
  const transformValue = `translateX(-${currentImageIndex * 100}%)`

  // Lightbox functions
  const openLightbox = (imageIndex) => {
    setLightboxImageIndex(imageIndex)
    setIsLightboxOpen(true)
    setIsAutoPlaying(false) // Pause slideshow when lightbox opens
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setTimeout(() => setIsAutoPlaying(true), 1000) // Resume slideshow after 1 second
  }

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox()
      }
    }
    
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={projectsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1
      }}
      className="card hover:shadow-large transition-all duration-300 group overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        
        {/* Image Slideshow with Advanced Effects */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          
          {/* Featured Badge - Shows on hover */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                ⭐ FEATURED
              </div>
            </div>
          )}
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 transform group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-orange-200/20 to-amber-200/20 dark:from-orange-800/20 dark:to-amber-800/20" />
            </div>
          </div>

          {/* Image Carousel */}
          <div 
            className="flex h-full"
            style={{ 
              transform: transformValue,
              transition: 'transform 0.7s ease-out'
            }}
          >
            {projectImages.map((image, imgIndex) => (
              <div 
                key={imgIndex} 
                className={`w-full h-full flex-shrink-0 relative ${
                  imgIndex === currentImageIndex ? 'cursor-pointer group/image' : ''
                }`}
                onClick={(e) => {
                  if (imgIndex === currentImageIndex) {
                    e.stopPropagation()
                    openLightbox(currentImageIndex)
                  }
                }}
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${imgIndex + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    imgIndex === currentImageIndex ? 'hover:scale-105' : ''
                  }`}
                  onError={(e) => {
                    e.target.src = '/images/default-project.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Expand icon - only show on currently visible image */}
                {imgIndex === currentImageIndex && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full">
                      <Expand className="w-6 h-6 drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Advanced Navigation */}
          <motion.button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white drop-shadow-lg" />
          </motion.button>
          
          <motion.button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-white drop-shadow-lg" />
          </motion.button>

          {/* Stylish Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
            {projectImages.map((_, imgIndex) => (
              <motion.button
                key={imgIndex}
                onClick={() => goToImage(imgIndex)}
                className={`relative transition-all duration-300 ${
                  imgIndex === currentImageIndex ? 'scale-125' : 'hover:scale-110'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  imgIndex === currentImageIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/80'
                }`} />
                {imgIndex === currentImageIndex && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-white animate-ping" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auto-play Status */}
          <div className="absolute top-4 right-4">
            <motion.div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isAutoPlaying && !isHovered ? 'bg-green-400 shadow-lg' : 'bg-gray-400'
              }`}
              animate={isAutoPlaying && !isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-5 space-y-4 flex-1 flex flex-col">

          {/* Title with Gradient Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={projectsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-500">
              {project.title}
            </h3>
          </motion.div>

          {/* Role Badge */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={projectsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          >
            <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl">
              <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              {project.category || 'Full Stack Developer'}
            </span>
          </motion.div>

          {/* Description with Consistent Height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            className="relative flex-1"
          >
            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-500 rounded-full opacity-30" />
            <div className="pl-4 h-full flex flex-col">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 uppercase tracking-wide">Description</h4>
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Animated Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
          >
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 uppercase tracking-wide">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.7 + techIndex * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className={`px-3 py-1.5 ${getTechColor(tech)} text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons with Advanced Animations */}
          <motion.div 
            className="flex space-x-3 pt-3 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <Github className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Code</span>
              </motion.a>
            )}
            
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="relative z-10">Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 dark:bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 z-10 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={projectImages[lightboxImageIndex]}
                  alt={`${project.title} - Image ${lightboxImageIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onError={(e) => {
                    e.target.src = '/images/default-project.jpg'
                  }}
                />

                {/* Navigation arrows */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={prevLightboxImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={nextLightboxImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                  {lightboxImageIndex + 1} / {projectImages.length}
                </div>

                {/* Project title */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-2 rounded-lg shadow-lg">
                  <h3 className="font-semibold">{project.title}</h3>
                </div>
              </motion.div>

              {/* Thumbnail navigation */}
              {projectImages.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {projectImages.map((image, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setLightboxImageIndex(imgIndex)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        imgIndex === lightboxImageIndex
                          ? 'border-white dark:border-gray-300 scale-110'
                          : 'border-white/30 dark:border-gray-600/50 hover:border-white/60 dark:hover:border-gray-400/70'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/default-project.jpg'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
    </motion.div>
  )
}

const Projects = () => {
  // Use frontend data instead of backend
  const projects = projectsData
  const loading = false // No loading needed for frontend data
  const dataLoaded = true // Data is always loaded from frontend
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const filterRef = useRef(null)


  // Available tech stacks for filtering
  const availableTechStacks = [
    'All Technologies',
    'HTML5',
    'CSS3', 
    'JavaScript',
    'Git',
    'React',
    'Tailwind CSS',
    'WebSocket',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Amazon DynamoDB',
    'Amazon S3',
    'AWS',
    'Render',
    'Vercel'
  ]

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Remove loading state since we're using frontend data

  // Get all unique technologies from projects
  const allTechnologies = [...new Set(projects.flatMap(project => project.techStack))].sort()

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (selectedTech === '' || selectedTech === 'All Technologies') {
      return matchesSearch
    }
    
    // Check if selected tech stack is in project's tech stack
    const matchesTech = project.techStack.includes(selectedTech)
    
    return matchesSearch && matchesTech
  })

  return (
    <>
      <Helmet>
        <title>Projects - Naman Kumar Singh</title>
        <meta name="description" content="Explore my portfolio of web development projects showcasing modern technologies and innovative solutions." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-max section-padding">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              A showcase of my work in web development, featuring modern technologies and innovative solutions
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="relative md:min-w-[220px]" ref={filterRef}>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 cursor-pointer text-left flex items-center justify-between"
                >
                  <span className="truncate mr-3">
                    {selectedTech || 'All Technologies'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Custom Dropdown */}
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    <div 
                      className="max-h-64 overflow-y-auto scrollbar-hide" 
                      style={{ 
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none',
                        cursor: 'grab'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.cursor = 'grab'
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.cursor = 'grabbing'
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.cursor = 'grab'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.cursor = 'default'
                      }}
                    >
                      {availableTechStacks.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => {
                            setSelectedTech(tech === 'All Technologies' ? '' : tech)
                            setIsFilterOpen(false)
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                            (selectedTech === tech || (selectedTech === '' && tech === 'All Technologies'))
                              ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <span className="font-medium">{tech}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          {filteredProjects.length === 0 ? (
            dataLoaded ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-16"
              >
              <div className="text-6xl mb-4">
                {dataLoaded && projects.length === 0 ? '📁' : '🔍'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {dataLoaded && projects.length === 0 ? 'No projects yet' : 'No projects found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {dataLoaded && projects.length === 0 
                  ? 'Projects will appear here once they are added to the database'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {dataLoaded && projects.length === 0 && (
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>Debug info: Total projects in database: {projects.length}</p>
                </div>
              )}
            </motion.div>
            ) : (
              // Show nothing while data is loading to prevent "No projects" flash
              <div className="text-center py-16">
                <div className="animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <motion.div
              ref={projectsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  projectsInView={projectsInView}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 dark:bg-orange-700">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and bring innovative ideas to life. 
              Let's discuss your project and see how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Start a Project
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Learn More About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Projects
