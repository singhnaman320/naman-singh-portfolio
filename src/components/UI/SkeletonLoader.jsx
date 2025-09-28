import { motion } from 'framer-motion'

const SkeletonLoader = ({ className = "", children }) => {
  return (
    <motion.div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// Pre-built skeleton components for common use cases
export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <SkeletonLoader 
        key={i} 
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
      />
    ))}
  </div>
)

export const SkeletonCard = ({ className = "" }) => (
  <div className={`p-6 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
    <SkeletonLoader className="h-6 w-3/4 mb-4" />
    <SkeletonText lines={3} />
    <SkeletonLoader className="h-10 w-32 mt-4" />
  </div>
)

export const SkeletonProject = ({ className = "" }) => (
  <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
    <SkeletonLoader className="h-48 w-full" />
    <div className="p-6">
      <SkeletonLoader className="h-6 w-3/4 mb-3" />
      <SkeletonText lines={2} className="mb-4" />
      <div className="flex gap-2 mb-4">
        <SkeletonLoader className="h-6 w-16" />
        <SkeletonLoader className="h-6 w-20" />
        <SkeletonLoader className="h-6 w-18" />
      </div>
      <SkeletonLoader className="h-10 w-full" />
    </div>
  </div>
)

export const SkeletonHero = ({ className = "" }) => (
  <div className={`text-center ${className}`}>
    <SkeletonLoader className="h-12 w-3/4 mx-auto mb-4" />
    <SkeletonLoader className="h-6 w-1/2 mx-auto mb-6" />
    <SkeletonText lines={3} className="max-w-2xl mx-auto mb-8" />
    <div className="flex gap-4 justify-center">
      <SkeletonLoader className="h-12 w-32" />
      <SkeletonLoader className="h-12 w-32" />
    </div>
  </div>
)

export default SkeletonLoader
