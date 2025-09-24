import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, MessageCircle, MapPin, Rocket, FolderOpen, Github, ExternalLink } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useData } from '../contexts/DataContext'
import { getImageUrl, handleImageError } from '../utils/imageUtils'
import Loading from '../components/UI/Loading'

const Home = () => {
  const { about, projects, stats, loading } = useData()
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [highlightsRef, highlightsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)


  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>{about?.name || 'Naman Kumar Singh'} - {about?.title || 'Full Stack Developer'}</title>
        <meta name="description" content={about?.tagline || "Full-Stack Developer specializing in scalable web applications and innovative solutions"} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 pb-8 sm:pb-0 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-4 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-4 sm:right-20 w-32 h-32 sm:w-72 sm:h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-8 sm:left-40 w-32 h-32 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-max section-padding w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-4 sm:space-y-10 lg:space-y-8"
            >
              {/* Greeting Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center"
              >
                <span className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                  Hello, I'm
                </span>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed pb-2">
                  <motion.span 
                    className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                      lineHeight: "1.2"
                    }}
                  >
                    {about?.name || 'Naman Kumar Singh'}
                  </motion.span>
                </h1>
                <motion.div 
                  className="h-1 w-24 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={heroInView ? { width: "6rem" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                ></motion.div>
              </motion.div>

              {/* Title & Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {about?.title || 'Full-Stack Developer'}
                </motion.h2>
                <motion.p 
                  className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {about?.tagline || 'Specializing in scalable web applications and modern technologies. Passionate about creating innovative solutions that make a difference.'}
                </motion.p>
              </motion.div>

              {/* Location & Status Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                {/* Location Card */}
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 sm:px-6 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{about?.location || 'India'}</p>
                  </div>
                </div>

                {/* Availability Card */}
                <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-4 sm:px-6 py-3 rounded-xl shadow-lg border border-green-200 dark:border-green-800 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Status</p>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">{about?.availability || 'Available for work'}</p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/projects"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center sm:text-left"
                >
                  <span className="flex items-center justify-center sm:justify-start">
                    <span className="text-sm sm:text-base">View My Work</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
                
                <Link
                  to="/contact"
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center sm:text-left"
                >
                  <span className="flex items-center justify-center sm:justify-start">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base">Get In Touch</span>
                  </span>
                </Link>
              </motion.div>

            </motion.div>

            {/* Profile Image Section */}
            {about?.profileImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative flex justify-center lg:justify-end p-8 lg:p-12"
              >
                <div className="relative w-full max-w-md lg:max-w-lg">
                  {/* Floating Background Elements */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-4 left-4 w-4 h-4 bg-primary-500 rounded-full animate-float-1"></div>
                    <div className="absolute top-12 right-8 w-3 h-3 bg-blue-500 rounded-full animate-float-2"></div>
                    <div className="absolute bottom-16 left-12 w-2 h-2 bg-purple-500 rounded-full animate-float-3"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-pink-500 rounded-full animate-float-1"></div>
                  </div>
                  
                  {/* Main Image Container - Round */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0, 10, 0],
                      x: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20"
                  >
                    <img
                      src={getImageUrl(about?.profileImage)}
                      alt={about?.name || 'Profile'}
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: '50% 20%' }}
                      onError={handleImageError}
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* About/Bio Section */}
      {about?.bio && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800">
          <div className="container-max section-padding">
            <motion.div
              ref={aboutRef}
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  My <span className="text-gradient">Story</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                  Get to know more about my journey, passion, and what drives me as a developer
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Bio Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center space-y-8"
                >
                  <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto px-4">
                    {about.bio.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Social Links */}
                  {about?.socialLinks && (
                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                      {about.socialLinks.github && (
                        <motion.a
                          href={about.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5 mr-2" />
                          GitHub
                        </motion.a>
                      )}
                      {about.socialLinks.linkedin && (
                        <motion.a
                          href={about.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          LinkedIn
                        </motion.a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-max section-padding">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { label: 'Projects', value: stats.projects || 0 },
              { label: 'Experience', value: `${stats.experiences || 0}+` },
              { label: 'Technologies', value: stats.skills || 0 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      {about?.highlights && about.highlights.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container-max section-padding">
            <motion.div
              ref={highlightsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Key <span className="text-gradient">Highlights</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Some of my key achievements and milestones in my development journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container-max section-padding">
            <motion.div
              ref={projectsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                Featured Projects
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:shadow-large transition-all duration-300 group"
                >
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center group"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                      
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="btn-primary text-lg px-8 py-3 group"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's create something amazing together!
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
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <FolderOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
