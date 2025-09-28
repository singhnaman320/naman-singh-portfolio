import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search, Filter, Github, ExternalLink, MessageCircle, User, Rocket, ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import { LoadingPage } from '../components/UI/Loading'

// Advanced ProjectCard Component with Unique Design
const ProjectCard = ({ project, index, projectsInView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Sample images for slideshow
  const projectImages = [
    `/images/project-${(index % 3) + 1}-1.jpg`,
    `/images/project-${(index % 3) + 1}-2.jpg`,
    `/images/project-${(index % 3) + 1}-3.jpg`
  ]

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, projectImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    setIsAutoPlaying(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
    setIsAutoPlaying(false)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={projectsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10, 
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse" />
      
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        
        {/* Floating Featured Badge */}
        {project.featured && (
          <motion.div 
            className="absolute -top-2 -right-2 z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12">
              ⭐ FEATURED
            </div>
          </motion.div>
        )}

        {/* Image Slideshow with Advanced Effects */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 transform group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-primary-200/20 to-blue-200/20 dark:from-primary-800/20 dark:to-blue-800/20" />
            </div>
          </div>

          {/* Image Carousel */}
          <motion.div 
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {projectImages.map((image, imgIndex) => (
              <div key={imgIndex} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={image}
                  alt={`${project.title} - Image ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/default-project.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ))}
          </motion.div>

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

        {/* Content Section with Floating Elements */}
        <div className="relative p-6 space-y-5">
          
          {/* Floating Decorative Elements */}
          <div className="absolute -top-3 left-6 w-6 h-6 bg-gradient-to-r from-primary-400 to-blue-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          <div className="absolute -top-1 right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Title with Gradient Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={projectsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-blue-600 transition-all duration-500">
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
            <div className="p-2 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-lg">
              <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
              {project.role}
            </span>
          </motion.div>

          {/* Description with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            className="relative"
          >
            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary-500 to-blue-500 rounded-full opacity-30" />
            <div className="pl-4">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 uppercase tracking-wide">Description</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
          </motion.div>

          {/* Animated Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
          >
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={projectsInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.7 + techIndex * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="relative px-3 py-1.5 bg-gradient-to-r from-primary-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">{tech}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons with Advanced Animations */}
          <motion.div 
            className="flex space-x-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
            
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="relative z-10">Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const { projects, loading } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const filterRef = useRef(null)

  // Debug: Log projects data
  useEffect(() => {
    console.log('Projects data:', projects)
    console.log('Projects length:', projects.length)
  }, [projects])

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

  if (loading) {
    return <LoadingPage message="Loading projects..." />
  }

  // Get all unique technologies from projects
  const allTechnologies = [...new Set(projects.flatMap(project => project.techStack))].sort()

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.shortDescription && project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()))
    
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
                  className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="relative md:min-w-[220px]" ref={filterRef}>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 cursor-pointer text-left flex items-center justify-between"
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
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">
                {projects.length === 0 ? '📁' : '🔍'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {projects.length === 0 ? 'No projects yet' : 'No projects found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {projects.length === 0 
                  ? 'Projects will appear here once they are added to the database'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {projects.length === 0 && (
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>Debug info: Total projects in database: {projects.length}</p>
                </div>
              )}
            </motion.div>
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
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
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
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and bring innovative ideas to life. 
              Let's discuss your project and see how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Start a Project
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
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
