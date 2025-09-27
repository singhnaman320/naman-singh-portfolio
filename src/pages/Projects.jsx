import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search, Filter, Github, ExternalLink, MessageCircle, User, Rocket, ChevronDown } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import { LoadingPage } from '../components/UI/Loading'

const Projects = () => {
  const { projects, loading } = useData()
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

  if (loading) {
    return <LoadingPage message="Loading projects..." />
  }

  // Get all unique technologies from projects
  const allTechnologies = [...new Set(projects.flatMap(project => project.techStack))].sort()

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div
              ref={projectsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:shadow-large transition-all duration-300 group"
                >
                  {/* Project Image */}
                  {project.images?.[0] && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Featured Badge */}
                    {project.featured && (
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-3">
                        Featured
                      </span>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    {/* Links */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center group"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                      
                      <div className="flex space-x-2">
                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                            aria-label="View on GitHub"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        
                        {project.links?.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                            aria-label="View Live Demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
