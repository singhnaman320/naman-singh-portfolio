/**
 * Fast loading utility with quick fallbacks
 * Optimized for speed while maintaining reliability
 */

/**
 * Load data with a race between API call and timeout
 * Falls back to default data if API takes too long
 * @param {Function} apiCall - API function to call
 * @param {*} fallbackData - Data to use if API fails or is slow
 * @param {number} timeoutMs - Timeout in milliseconds (default: 5000)
 * @returns {Promise} - Result or fallback data
 */
export const loadWithFastFallback = async (apiCall, fallbackData, timeoutMs = 5000) => {
  try {
    // Race between API call and timeout
    const result = await Promise.race([
      apiCall(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Fast timeout')), timeoutMs)
      )
    ])
    
    return { data: result.data, source: 'api' }
  } catch (error) {
    // Use fallback data for any error (network, timeout, etc.)
    console.warn('Using fallback data due to:', error.message)
    return { data: fallbackData, source: 'fallback' }
  }
}

/**
 * Load multiple data sources in parallel with fast fallbacks
 * @param {Array} loadConfigs - Array of {apiCall, fallbackData, timeout} objects
 * @returns {Promise<Array>} - Array of results
 */
export const loadMultipleWithFastFallback = async (loadConfigs) => {
  const promises = loadConfigs.map(({ apiCall, fallbackData, timeout = 5000 }) =>
    loadWithFastFallback(apiCall, fallbackData, timeout)
  )
  
  return Promise.all(promises)
}

/**
 * Progressive loading - show fallback immediately, then update with real data
 * @param {Function} apiCall - API function to call
 * @param {*} fallbackData - Immediate fallback data
 * @param {Function} onUpdate - Callback when real data arrives
 * @param {number} maxWaitMs - Maximum time to wait for real data
 */
export const loadProgressively = async (apiCall, fallbackData, onUpdate, maxWaitMs = 8000) => {
  // Immediately return fallback
  onUpdate({ data: fallbackData, source: 'fallback' })
  
  try {
    // Try to get real data in background
    const result = await Promise.race([
      apiCall(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Progressive timeout')), maxWaitMs)
      )
    ])
    
    // Update with real data if successful
    onUpdate({ data: result.data, source: 'api' })
  } catch (error) {
    // Keep using fallback data
    console.warn('Keeping fallback data due to:', error.message)
  }
}

export default {
  loadWithFastFallback,
  loadMultipleWithFastFallback,
  loadProgressively
}
