// Image utility functions
import config from '../config'

/**
 * Get the full URL for an image
 * @param {string} imagePath - The image path from the API
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imagePath) => {
  // Default to your existing profile image
  if (!imagePath) return '/images/default-profile.jpg'
  
  // If it's already a full URL (starts with http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // For relative paths, use as static files from public directory
  // This ensures images are served from the frontend's public directory
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`
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
