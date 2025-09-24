import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Code, Database, Cloud, Wrench, Layers, Zap, Rocket, FolderOpen } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import { LoadingPage } from '../components/UI/Loading'

const Skills = () => {
  const { skills, loading } = useData()
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  if (loading) {
    return <LoadingPage message="Loading skills..." />
  }

  const categoryIcons = {
    'Frontend': Code,
    'Backend': Database,
    'Database': Database,
    'DevOps/Cloud': Cloud,
    'Tools': Wrench,
    'Languages': Layers,
    'Other': Zap
  }

  const proficiencyColors = {
    'Beginner': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
    'Advanced': 'bg-green-100 text-green-800 border-green-200',
    'Expert': 'bg-purple-100 text-purple-800 border-purple-200'
  }

  const proficiencyLevels = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 100
  }

  return (
    <>
      <Helmet>
        <title>Skills - Naman Kumar Singh</title>
        <meta name="description" content="Explore my technical skills and expertise in web development, including frontend, backend, and modern technologies." />
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
              My <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and the technologies I work with to build modern web applications
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          {Object.keys(skills).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🛠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Skills Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-300">I'm currently updating my skills section. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              {Object.entries(skills).map(([category, categorySkills], categoryIndex) => {
                const Icon = categoryIcons[category] || Code
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{category}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{categorySkills.length} skills</p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                          className="card p-6 hover:shadow-large transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors duration-200">
                              {skill.name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${proficiencyColors[skill.proficiency]}`}>
                              {skill.proficiency}
                            </span>
                          </div>

                          {/* Proficiency Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                              <span>Proficiency</span>
                              <span>{proficiencyLevels[skill.proficiency]}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={skillsInView ? { width: `${proficiencyLevels[skill.proficiency]}%` } : {}}
                                transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.5 }}
                                className="bg-primary-600 h-2 rounded-full"
                              />
                            </div>
                          </div>

                          {/* Skill Icon */}
                          {skill.icon && (
                            <div className="text-center">
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-8 h-8 mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Overview */}
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
              What I Bring to the Table
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My approach to development and the value I provide to projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Technologies',
                description: 'I stay current with the latest frameworks and tools to build cutting-edge applications',
                icon: '🚀',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                title: 'Best Practices',
                description: 'I follow industry standards and best practices for clean, maintainable code',
                icon: '✨',
                color: 'bg-green-100 text-green-600'
              },
              {
                title: 'Performance Focus',
                description: 'I optimize applications for speed, scalability, and excellent user experience',
                icon: '⚡',
                color: 'bg-yellow-100 text-yellow-600'
              },
              {
                title: 'Problem Solving',
                description: 'I approach challenges analytically and find efficient solutions to complex problems',
                icon: '🧩',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                title: 'Continuous Learning',
                description: 'I constantly expand my skillset and adapt to new technologies and methodologies',
                icon: '📚',
                color: 'bg-indigo-100 text-indigo-600'
              },
              {
                title: 'Quality Assurance',
                description: 'I write tests and ensure code quality through thorough testing and code reviews',
                icon: '🔍',
                color: 'bg-red-100 text-red-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-large transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Learning Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              How I've developed my skills and continue to grow as a developer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  phase: 'Foundation',
                  description: 'Started with HTML, CSS, and JavaScript fundamentals',
                  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
                  color: 'bg-blue-500'
                },
                {
                  phase: 'Frontend Mastery',
                  description: 'Mastered modern frontend frameworks and tools',
                  technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Webpack'],
                  color: 'bg-green-500'
                },
                {
                  phase: 'Backend Development',
                  description: 'Expanded into server-side development and databases',
                  technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
                  color: 'bg-purple-500'
                },
                {
                  phase: 'Full-Stack & DevOps',
                  description: 'Integrated full-stack development with deployment and DevOps',
                  technologies: ['Docker', 'AWS', 'CI/CD', 'Microservices'],
                  color: 'bg-orange-500'
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-4 h-4 rounded-full ${phase.color} mr-3`} />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {phase.phase}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {phase.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {phase.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Let's Build Something Great
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Ready to leverage my skills for your next project? I'm excited to bring my expertise to your team and help create amazing solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Start a Project
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <FolderOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                See My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Skills
