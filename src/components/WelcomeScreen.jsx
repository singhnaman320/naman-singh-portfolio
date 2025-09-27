import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Terminal, Cpu, Zap, Coffee, Rocket } from 'lucide-react'

const WelcomeScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { icon: Terminal, text: "Initializing Portfolio...", color: "text-blue-500" },
    { icon: Code, text: "Loading Projects...", color: "text-green-500" },
    { icon: Cpu, text: "Compiling Skills...", color: "text-purple-500" },
    { icon: Coffee, text: "Brewing Experience...", color: "text-amber-500" },
    { icon: Zap, text: "Optimizing Performance...", color: "text-yellow-500" },
    { icon: Code, text: "Configuring Components...", color: "text-cyan-500" },
    { icon: Terminal, text: "Running Final Checks...", color: "text-pink-500" },
    { icon: Rocket, text: "Preparing Launch...", color: "text-orange-500" },
    { icon: Rocket, text: "Ready to Launch!", color: "text-red-500" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 0.83
      })
    }, 100) // 12 seconds total (100 / 0.83 = 120 steps, 120 * 100ms = 12000ms)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 1300) // Change step every 1300ms (9 steps in ~11.7 seconds)

    return () => clearInterval(stepTimer)
  }, [steps.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const CurrentIcon = steps[currentStep]?.icon || Terminal

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [null, -100],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          {/* Logo/Icon */}
          <motion.div
            variants={iconVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <CurrentIcon className={`w-12 h-12 sm:w-16 sm:h-16 text-white ${steps[currentStep]?.color || 'text-blue-500'}`} />
                </motion.div>
              </motion.div>
              
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-white/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                Welcome to
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Naman's Portfolio
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 max-w-lg mx-auto"
            >
              Full-Stack Developer & Software Engineer
            </motion.p>
          </motion.div>

          {/* Loading Status */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-center space-x-3 text-white/80"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Coffee className="w-5 h-5" />
              </motion.div>
              <span className="text-lg font-medium">
                {steps[currentStep]?.text || "Loading..."}
              </span>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-md mx-auto">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/60 text-sm mt-3 font-mono"
            >
              {Math.round(progress)}% Complete
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Bottom Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-white/40 text-sm font-mono">
            Crafted with ❤️ using React & Tailwind CSS
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomeScreen
