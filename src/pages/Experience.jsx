import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, MessageCircle, FolderOpen } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import { formatDateRange } from '../utils'
import { LoadingPage } from '../components/UI/Loading'

const Experience = () => {
  const { experiences, loading } = useData()
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true })

  if (loading) {
    return <LoadingPage message="Loading experience..." />
  }

  return (
    <>
      <Helmet>
        <title>Experience - Naman Kumar Singh</title>
        <meta name="description" content="Explore my professional experience and career journey in web development and software engineering." />
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
              My <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A journey through my professional career, showcasing the roles and projects that have shaped my expertise in web development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Experience Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-300">I'm currently building my professional experience. Check back soon!</p>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div
                ref={timelineRef}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

                {/* Experience Items */}
                <div className="space-y-12">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience._id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-medium hidden md:block" />

                      {/* Content */}
                      <div className="md:ml-20">
                        <div className="card p-8 hover:shadow-large transition-all duration-300">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                {experience.companyLogo && (
                                  <img
                                    src={experience.companyLogo}
                                    alt={experience.company}
                                    className="w-12 h-12 rounded-lg object-cover mr-4"
                                  />
                                )}
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {experience.position}
                                  </h3>
                                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                                    {experience.company}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-300 mb-4 space-y-2 sm:space-y-0 sm:space-x-6">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <span>{experience.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="prose max-w-none text-gray-700 dark:text-gray-300 mb-6">
                            <p>{experience.description}</p>
                          </div>

                          {/* Achievements */}
                          {experience.achievements && experience.achievements.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {experience.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">{achievement}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Technologies */}
                          {experience.technologies && experience.technologies.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Core Competencies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Skills and expertise developed through professional experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Full-Stack Development',
                description: 'End-to-end web application development using modern technologies',
                icon: '🚀'
              },
              {
                title: 'System Architecture',
                description: 'Designing scalable and maintainable software architectures',
                icon: '🏗️'
              },
              {
                title: 'Performance Optimization',
                description: 'Improving application performance and user experience',
                icon: '⚡'
              },
              {
                title: 'Team Collaboration',
                description: 'Working effectively in cross-functional development teams',
                icon: '🤝'
              },
              {
                title: 'Problem Solving',
                description: 'Analyzing complex problems and implementing effective solutions',
                icon: '🧩'
              },
              {
                title: 'Continuous Learning',
                description: 'Staying updated with latest technologies and best practices',
                icon: '📚'
              }
            ].map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-large transition-all duration-300"
              >
                <div className="text-4xl mb-4">{competency.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {competency.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {competency.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting projects. 
              Let's connect and see how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Get In Touch
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <FolderOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Experience
