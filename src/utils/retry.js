/**
 * Retry utility with exponential backoff for handling network errors
 * Specifically designed for Render backend that may go to sleep
 */

/**
 * Sleep utility for delays
 * @param {number} ms - Milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Check if error is retryable (network errors, timeouts, 5xx errors)
 * @param {Error} error - The error to check
 * @returns {boolean} - Whether the error is retryable
 */
const isRetryableError = (error) => {
  // Network errors (no response received)
  if (error.code === 'ERR_NETWORK' || error.code === 'NETWORK_ERROR') {
    return true
  }
  
  // Timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return true
  }
  
  // Server errors (5xx)
  if (error.response?.status >= 500) {
    return true
  }
  
  // Connection refused (backend sleeping)
  if (error.code === 'ECONNREFUSED') {
    return true
  }
  
  return false
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retries (default: 3)
 * @param {number} options.baseDelay - Base delay in ms (default: 1000)
 * @param {number} options.maxDelay - Maximum delay in ms (default: 10000)
 * @param {Function} options.shouldRetry - Custom function to determine if error should be retried
 * @param {boolean} options.silent - Whether to suppress console logs (default: false)
 * @returns {Promise} - Result of the function or throws the last error
 */
export const retryWithBackoff = async (fn, options = {}) => {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = isRetryableError,
    silent = false
  } = options

  let lastError
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn()
      
      // If we had previous failures but this succeeded, log recovery
      if (attempt > 0 && !silent) {
        console.log(`✅ Request succeeded after ${attempt} retries`)
      }
      
      return result
    } catch (error) {
      lastError = error
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break
      }
      
      // Check if error should be retried
      if (!shouldRetry(error)) {
        if (!silent) {
          console.log('❌ Error is not retryable:', error.message)
        }
        throw error
      }
      
      // Calculate delay with exponential backoff and jitter
      const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
      const jitter = Math.random() * 0.1 * exponentialDelay // Add 10% jitter
      const delay = exponentialDelay + jitter
      
      if (!silent) {
        console.log(`🔄 Attempt ${attempt + 1}/${maxRetries + 1} failed. Retrying in ${Math.round(delay)}ms...`, error.message)
      }
      
      await sleep(delay)
    }
  }
  
  // All retries exhausted
  if (!silent) {
    console.error(`❌ All ${maxRetries + 1} attempts failed. Last error:`, lastError.message)
  }
  
  throw lastError
}

/**
 * Fast retry for API calls - optimized for speed
 * @param {Function} apiCall - API function to retry
 * @param {Object} options - Additional options
 * @returns {Promise} - Result of the API call
 */
export const retryApiCall = async (apiCall, options = {}) => {
  return retryWithBackoff(apiCall, {
    maxRetries: 2, // Reduced retries for faster loading
    baseDelay: 500, // Much shorter initial delay
    maxDelay: 3000, // Shorter max delay
    silent: true, // Don't show retry logs to users
    ...options
  })
}

/**
 * Fast retry for critical operations (auth, initial data load)
 * @param {Function} criticalCall - Critical function to retry
 * @param {Object} options - Additional options
 * @returns {Promise} - Result of the critical call
 */
export const retryCriticalCall = async (criticalCall, options = {}) => {
  return retryWithBackoff(criticalCall, {
    maxRetries: 3, // Reduced retries for faster loading
    baseDelay: 800, // Shorter delays for critical operations
    maxDelay: 5000, // Much shorter max delay
    silent: true, // Don't show retry logs to users
    ...options
  })
}

export default {
  retryWithBackoff,
  retryApiCall,
  retryCriticalCall,
  isRetryableError
}
