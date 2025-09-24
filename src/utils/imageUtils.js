// Image utility functions
import config from '../config'

/**
 * Get the full URL for an image
 * @param {string} imagePath - The image path from the API
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/default-profile.jpg'
  
  // If it's already a full URL (starts with http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it's a relative path starting with /, it's likely already handled by the backend
  // In production, the backend should return full URLs
  if (imagePath.startsWith('/')) {
    // In development, prepend the API base URL
    if (config.app.environment === 'development') {
      const baseUrl = config.api.baseURL.replace('/api', '')
      return `${baseUrl}${imagePath}`
    }
    // In production, if we get a relative path, it means backend isn't configured properly
    // But we'll try to construct it anyway
    return imagePath
  }
  
  // If it doesn't start with /, add it
  const cleanPath = `/${imagePath}`
  if (config.app.environment === 'development') {
    const baseUrl = config.api.baseURL.replace('/api', '')
    return `${baseUrl}${cleanPath}`
  }
  
  return cleanPath
}

/**
 * Handle image loading errors
 * @param {Event} event - The error event
 * @param {string} fallbackUrl - Fallback image URL
 */
export const handleImageError = (event, fallbackUrl = '/images/default-profile.jpg') => {
  event.target.src = fallbackUrl
  event.target.onerror = null // Prevent infinite loop
}

/**
 * Preload an image
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}
