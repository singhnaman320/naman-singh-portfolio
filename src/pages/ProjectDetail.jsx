import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, User, Zap, Target, Award } from 'lucide-react'
import { getProjectById } from '../data/projectsData'
import { useInView } from 'react-intersection-observer'

const ProjectDetail = () => {
  const { id } = useParams()
  // Use frontend data instead of backend
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false) // No loading needed for frontend data
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [contentRef, contentInView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    // Get project from frontend data
    const projectData = getProjectById(id)
    setProject(projectData)
  }, [id])

  // Remove loading state since we're using frontend data

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found - Naman Kumar Singh</title>
          <meta name="description" content="The requested project could not be found." />
        </Helmet>
        
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10 max-w-2xl mx-auto px-6"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-8xl mb-8"
            >
              🔍
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Project Not Found
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Oops! The project you're looking for seems to have wandered off into the digital void. 
              It might have been moved, renamed, or is taking a coffee break.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/projects" 
                className="btn-primary group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Projects
              </Link>
              
              <Link 
                to="/" 
                className="btn-secondary group"
              >
                <Target className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Go Home
              </Link>
            </motion.div>

            {/* Helpful Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                What you can do:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span>Check the URL for typos</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                    <Target className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span>Browse all projects</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                    <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span>Explore featured work</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Naman Kumar Singh</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="container-max section-padding">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link
              to="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div>
                {project.featured && (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
                    Featured Project
                  </span>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary group"
                    >
                      View Live Demo
                      <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline group"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Project Images */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-large">
                    <img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {project.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'border-primary-500'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Problem Statement */}
                <div>
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
                  </div>
                  <div className="prose max-w-none text-gray-700">
                    <p>{project.problemStatement}</p>
                  </div>
                </div>

                {/* My Role */}
                <div>
                  <div className="flex items-center mb-4">
                    <User className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">My Role</h2>
                  </div>
                  <div className="prose max-w-none text-gray-700">
                    <p>{project.role}</p>
                  </div>
                </div>

                {/* Challenges & Solutions */}
                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Zap className="w-6 h-6 text-primary-600 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">Challenges & Solutions</h2>
                    </div>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p className="text-gray-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact & Results */}
                {project.impact && (
                  <div>
                    <div className="flex items-center mb-4">
                      <Award className="w-6 h-6 text-primary-600 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">Impact & Results</h2>
                    </div>
                    
                    {project.impact.description && (
                      <p className="text-gray-700 mb-6">{project.impact.description}</p>
                    )}
                    
                    {project.impact.metrics && project.impact.metrics.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.impact.metrics.map((metric, index) => (
                          <div key={index} className="card p-4 text-center">
                            <div className="text-2xl font-bold text-primary-600 mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span>{new Date(project.createdAt).getFullYear()}</span>
                    </div>
                    
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 mr-3" />
                        <span>View Source Code</span>
                      </a>
                    )}
                    
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h3>
                  <div className="space-y-2">
                    {project.techStack.map((tech) => (
                      <div key={tech} className="flex items-center">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
                        <span className="text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and create innovative solutions. 
              Let's discuss your project and see how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-3"
              >
                Start a Project
              </Link>
              <Link
                to="/projects"
                className="btn-outline text-lg px-8 py-3"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ProjectDetail
