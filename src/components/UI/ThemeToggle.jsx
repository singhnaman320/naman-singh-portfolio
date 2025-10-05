import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{ perspective: '1000px' }}
    >
      {/* Circular Container with 3D Flip */}
      <motion.div
        className="relative w-full h-full rounded-full shadow-lg"
        animate={{
          rotateY: isDark ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Light Mode Side (Sun) */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <Sun className="w-5 h-5 text-white drop-shadow-sm" />
          
          {/* Sun Rays Animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              rotate: isDark ? 0 : 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-2 bg-orange-300/60 rounded-full"
                style={{
                  top: '-8px',
                  left: '50%',
                  transformOrigin: '50% 28px',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Dark Mode Side (Moon) */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Moon className="w-5 h-5 text-slate-200 drop-shadow-sm" />
          
          {/* Stars Animation */}
          <motion.div className="absolute inset-0 rounded-full overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-slate-300 rounded-full"
                style={{
                  top: `${20 + Math.sin(i * 1.2) * 15}%`,
                  left: `${25 + Math.cos(i * 1.5) * 25}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ambient Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: isDark 
            ? '0 0 30px rgba(148, 163, 184, 0.4), 0 0 60px rgba(148, 163, 184, 0.2)' 
            : '0 0 30px rgba(251, 146, 60, 0.5), 0 0 60px rgba(251, 146, 60, 0.3)',
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
