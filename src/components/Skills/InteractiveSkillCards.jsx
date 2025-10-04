import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Code, Database, Cloud, Wrench, Layers, Zap, Star, Calendar, TrendingUp, ChevronDown, Eye, EyeOff } from 'lucide-react'
import './SkillCards.css'

const InteractiveSkillCards = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const dropdownRef = useRef(null)
  const sortDropdownRef = useRef(null)
  const skillsGridRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Category configuration
  const categoryConfig = {
    'Frontend': { icon: Code, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    'Backend': { icon: Database, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    'Database': { icon: Database, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    'DevOps/Cloud': { icon: Cloud, color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
    'Tools': { icon: Wrench, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    'Languages': { icon: Layers, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    'Other': { icon: Zap, color: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-50 dark:bg-gray-900/20' }
  }

  // Sort options configuration
  const sortOptions = [
    { value: 'name', label: 'Name', icon: Layers },
    { value: 'level', label: 'Level', icon: TrendingUp },
    { value: 'experience', label: 'Experience', icon: Calendar }
  ]

  // Get all categories with skill counts
  const categories = useMemo(() => {
    const cats = [{ name: 'All', count: Object.values(skills).flat().length }]
    Object.entries(skills).forEach(([category, categorySkills]) => {
      if (categorySkills && categorySkills.length > 0) {
        cats.push({ name: category, count: categorySkills.length })
      }
    })
    return cats
  }, [skills])

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let allSkills = []
    
    // Flatten skills with category info
    Object.entries(skills).forEach(([category, categorySkills]) => {
      if (categorySkills && categorySkills.length > 0) {
        categorySkills.forEach(skill => {
          allSkills.push({ ...skill, category })
        })
      }
    })

    // Filter by category
    if (selectedCategory !== 'All') {
      allSkills = allSkills.filter(skill => skill.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      allSkills = allSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort skills
    allSkills.sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return allSkills
  }, [skills, selectedCategory, searchTerm, sortBy])

  // Calculate skills to display (2 rows: 8 on desktop, 6 on mobile)
  const skillsPerRow = {
    mobile: 3, // 1 column on mobile becomes 3 per "row" for calculation
    tablet: 4, // 2 columns on tablet  
    desktop: 4 // 4 columns on desktop
  }
  
  const maxSkillsToShow = skillsPerRow.desktop * 2 // 8 skills for 2 rows on desktop
  const displayedSkills = useMemo(() => {
    if (showAllSkills || searchTerm || selectedCategory !== 'All') {
      return filteredSkills
    }
    return filteredSkills.slice(0, maxSkillsToShow)
  }, [filteredSkills, showAllSkills, searchTerm, selectedCategory, maxSkillsToShow])

  // Proficiency colors
  const getProficiencyColor = (proficiency) => {
    const colors = {
      'Basic': 'from-yellow-400 to-orange-400',
      'Intermediate': 'from-blue-400 to-indigo-400',
      'Advanced': 'from-green-400 to-emerald-400',
      'Expert': 'from-purple-400 to-pink-400'
    }
    return colors[proficiency] || 'from-gray-400 to-slate-400'
  }

  const getProficiencyBadgeColor = (proficiency) => {
    const colors = {
      'Basic': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      'Intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'Advanced': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    }
    return colors[proficiency] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }

  // Handle toggle with smooth scrolling
  const handleToggleSkills = () => {
    setShowAllSkills(!showAllSkills)
    
    // Scroll to skills grid after a short delay to allow state update
    setTimeout(() => {
      if (skillsGridRef.current) {
        skillsGridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }, 100)
  }

  return (
    <div className="space-y-4 md:space-y-8 px-2 md:px-0">
      {/* Header with Search and Filters */}
      <div className="space-y-3 md:space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mobile-search-container md:max-w-md">
          <Search className="mobile-search-icon absolute left-3 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mobile-search-input w-full pl-9 md:pl-10 pr-4 py-3 md:py-3 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="mobile-filters-container">
          {/* Mobile Dropdown */}
          <div className="mobile-filter-dropdown md:hidden" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="mobile-filter-trigger"
            >
              <div className="flex items-center gap-2">
                {selectedCategory !== 'All' && categoryConfig[selectedCategory] && (() => {
                  const IconComponent = categoryConfig[selectedCategory].icon
                  return <IconComponent className="w-4 h-4 text-blue-500" />
                })()}
                <span>{selectedCategory}</span>
                <span className="mobile-filter-dropdown-item-count">
                  {categories.find(cat => cat.name === selectedCategory)?.count || 0}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform text-blue-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mobile-filter-dropdown-content"
                >
                  {categories.map((category) => {
                    const CategoryIcon = category.name !== 'All' && categoryConfig[category.name] ? categoryConfig[category.name].icon : null
                    return (
                      <div
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name)
                          setIsDropdownOpen(false)
                        }}
                        className={`mobile-filter-dropdown-item ${selectedCategory === category.name ? 'active' : ''}`}
                      >
                        <div className="mobile-filter-dropdown-item-left">
                          {CategoryIcon && <CategoryIcon className="w-4 h-4 text-blue-500" />}
                          <span>{category.name}</span>
                        </div>
                        <span className="mobile-filter-dropdown-item-count">
                          {category.count}
                        </span>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex mobile-filter-buttons flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const CategoryIcon = category.name !== 'All' && categoryConfig[category.name] ? categoryConfig[category.name].icon : null
            return (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                {category.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            )
          })}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mobile-sort-container">
          {/* Mobile Sort Dropdown */}
          <div className="mobile-sort-dropdown md:hidden" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="mobile-sort-trigger"
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const selectedOption = sortOptions.find(option => option.value === sortBy)
                  const IconComponent = selectedOption?.icon
                  return (
                    <>
                      {IconComponent && <IconComponent className="w-4 h-4 text-blue-500" />}
                      <span>Sort by: {selectedOption?.label}</span>
                    </>
                  )
                })()}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform text-blue-500 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mobile-sort-dropdown-content"
                >
                  {sortOptions.map((option) => {
                    const OptionIcon = option.icon
                    return (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setIsSortDropdownOpen(false)
                        }}
                        className={`mobile-sort-dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                      >
                        <OptionIcon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Sort Buttons */}
          <div className="hidden md:flex flex-row justify-center items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Sort by:
            </span>
            <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  sortBy === option.value
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <option.icon className="w-3.5 h-3.5" />
                {option.label}
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Count */}
      <div className="mobile-results-text text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-primary-600 dark:text-primary-400">{displayedSkills.length}</span> 
          {!showAllSkills && !searchTerm && selectedCategory === 'All' && filteredSkills.length > maxSkillsToShow && (
            <span> of {filteredSkills.length}</span>
          )} skills
          {selectedCategory !== 'All' && (
            <span> in <span className="font-semibold">{selectedCategory}</span></span>
          )}
        </p>
      </div>

      {/* Skills Grid */}
      <div ref={skillsGridRef} className="min-h-[400px] skills-grid-container">
        <AnimatePresence mode="wait">
          {filteredSkills.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No skills found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="skills-grid"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0"
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill, index) => (
                <SkillCard
                  key={skill._id || skill.name}
                  skill={skill}
                  index={index}
                  categoryConfig={categoryConfig}
                  getProficiencyColor={getProficiencyColor}
                  getProficiencyBadgeColor={getProficiencyBadgeColor}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* View More/Less Button */}
      {!searchTerm && selectedCategory === 'All' && filteredSkills.length > maxSkillsToShow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={handleToggleSkills}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 dark:from-primary-500 dark:to-blue-500 dark:hover:from-primary-600 dark:hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl dark:shadow-primary-500/25 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {showAllSkills ? (
              <>
                <EyeOff className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>View Less Skills</span>
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>View More Skills ({filteredSkills.length - maxSkillsToShow} more)</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

// Circular Progress Component
const CircularProgress = ({ percentage, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-blue-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
          {percentage}%
        </span>
      </div>
    </div>
  )
}

// Individual Skill Card Component
const SkillCard = ({ skill, index, categoryConfig, getProficiencyColor, getProficiencyBadgeColor }) => {
  const categoryInfo = categoryConfig[skill.category] || categoryConfig['Other']
  const CategoryIcon = categoryInfo.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        layout: { duration: 0.3, ease: "easeInOut" }
      }}
      whileHover={{ 
        y: -8, 
        rotateX: 5,
        rotateY: 2,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="skill-card-enhanced mobile-skill-card relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-6 transition-all duration-500 border border-blue-400/30 hover:border-blue-500/60 h-64 overflow-hidden backdrop-blur-sm">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2
            }}
            style={{ top: '20%', left: '80%' }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, -15, 0],
              y: [0, 20, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3
            }}
            style={{ top: '70%', left: '10%' }}
          />
        </div>

        {/* Header with Icon and Badge */}
        <div className="relative flex items-center justify-between mb-6">
          <motion.div 
            className="p-3 rounded-xl bg-blue-500 shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <CategoryIcon className="w-6 h-6 text-white" />
          </motion.div>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {skill.proficiency}
          </span>
        </div>

        {/* Skill Name */}
        <div className="relative mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 leading-tight">
            {skill.name}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* Progress Section */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Proficiency
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {skill.yearsOfExperience} years exp.
              </span>
            </div>
          </div>
          
          {/* Circular Progress */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1 + 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <CircularProgress percentage={skill.level} size={70} strokeWidth={5} />
          </motion.div>
        </div>

        {/* Category Tag */}
        <div className="relative">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
            <Layers className="w-3 h-3 mr-1.5" />
            {skill.category}
          </span>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Bright blue border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="border-glow absolute inset-0 rounded-2xl border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
        </div>
      </div>
    </motion.div>
  )
}

export default InteractiveSkillCards
