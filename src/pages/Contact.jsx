import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'

const Contact = () => {
  const { home, submitContact } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await submitContact(data)
      if (result.success) {
        toast.success(result.message)
        reset()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@namanportfolio.com',
      href: 'mailto:contact@namanportfolio.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXXXX XXXXX',
      href: 'tel:+91XXXXXXXXX'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: null
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: home?.socialLinks?.github || 'https://github.com/singhnaman320',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: home?.socialLinks?.linkedin || 'https://linkedin.com/in/naman-kumar-singh',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: home?.socialLinks?.instagram || 'https://instagram.com/namansingh',
      color: 'hover:text-pink-500'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact - Naman Kumar Singh</title>
        <meta name="description" content="Get in touch with Naman Kumar Singh for web development projects, collaborations, or any inquiries." />
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
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                I'm always interested in new opportunities, interesting projects, 
                and meeting new people. Whether you have a question or just want to say hi, 
                I'll try my best to get back to you!
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">Follow me on</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-110 hover:shadow-lg ${social.color}`}
                        aria-label={social.name}
                        title={`Follow me on ${social.name}`}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    )
                  })}
                </div>
                {/* <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  Connect with me on social media for updates and insights!
                </p> */}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Send me a message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    className={`input ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`input ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: {
                        value: 5,
                        message: 'Subject must be at least 5 characters'
                      }
                    })}
                    className={`input ${errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={`textarea ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some common questions I get asked
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's your typical response time?",
                answer: "I usually respond to emails within 24-48 hours. For urgent matters, feel free to mention it in your message."
              },
              {
                question: "What types of projects do you work on?",
                answer: "I specialize in full-stack web development, including React applications, Node.js APIs, and modern web technologies. I'm open to both short-term and long-term projects."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes! I work with clients from around the world. I'm comfortable with remote collaboration and different time zones."
              },
              {
                question: "What's your development process like?",
                answer: "I follow an agile approach with regular communication, code reviews, and iterative development. I believe in transparency and keeping clients involved throughout the process."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
