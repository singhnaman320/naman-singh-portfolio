import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Smartphone } from 'lucide-react'

const LandscapeRestriction = () => {
  const [showRestriction, setShowRestriction] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 768 // Mobile breakpoint
      const isLandscape = window.innerWidth > window.innerHeight
      
      // Show restriction only on mobile devices in landscape mode
      setShowRestriction(isMobile && isLandscape)
    }

    // Check on mount
    checkOrientation()

    // Listen for orientation and resize changes
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure orientation change is complete
      setTimeout(checkOrientation, 100)
    })

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  if (!showRestriction) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[10000] p-6"
      >
        <div className="text-center max-w-sm mx-auto">
          {/* Animated Phone Icon */}
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{ 
              scale: 1, 
              rotate: [90, 0, 90, 0],
            }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <Smartphone className="w-16 h-16 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -top-2 -right-2"
              >
                <RotateCcw className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Please Rotate Your Device
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg mb-6 leading-relaxed"
          >
            This portfolio is optimized for portrait mode on mobile devices for the best viewing experience.
          </motion.p>

          {/* Instruction */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <p className="text-blue-400 font-medium">
              🔄 Rotate to portrait mode to continue
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LandscapeRestriction
