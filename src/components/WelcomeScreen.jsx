import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Terminal, Cpu, Zap, Coffee, Rocket } from 'lucide-react'

const WelcomeScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { icon: Terminal, text: "Initializing Portfolio...", color: "text-slate-400" },
    { icon: Code, text: "Loading Projects...", color: "text-slate-300" },
    { icon: Cpu, text: "Compiling Skills...", color: "text-gray-400" },
    { icon: Coffee, text: "Brewing Experience...", color: "text-slate-400" },
    { icon: Zap, text: "Optimizing Performance...", color: "text-gray-300" },
    { icon: Code, text: "Configuring Components...", color: "text-slate-300" },
    { icon: Terminal, text: "Running Final Checks...", color: "text-gray-400" },
    { icon: Rocket, text: "Preparing Launch...", color: "text-slate-300" },
    { icon: Rocket, text: "Ready to Launch!", color: "text-white" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + (100 / 50)
      })
    }, 100) // 5 seconds total (50 steps * 100ms = 5000ms, 100% / 50 steps = 2% per step)

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
    }, 550) // Change step every 550ms (9 steps in ~5 seconds)

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
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-[9999] overflow-hidden"
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
                className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-slate-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-600"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(148, 163, 184, 0.3)",
                    "0 0 30px rgba(203, 213, 225, 0.4)",
                    "0 0 20px rgba(148, 163, 184, 0.3)"
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
                className="block bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent"
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
              Full-Stack Developer
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
            <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-slate-600/30">
              <motion.div
                className="h-full bg-gradient-to-r from-slate-400 to-slate-200 rounded-full"
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
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-slate-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-400/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomeScreen
