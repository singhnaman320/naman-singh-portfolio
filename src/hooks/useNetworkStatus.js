import { useState, useEffect } from 'react'

/**
 * Hook to monitor network connectivity status
 * Can be used to show subtle indicators when offline
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      if (wasOffline) {
        // User came back online after being offline
        console.log('🌐 Connection restored')
        setWasOffline(false)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
      console.log('📡 Connection lost')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [wasOffline])

  return {
    isOnline,
    wasOffline,
    connectionStatus: isOnline ? 'online' : 'offline'
  }
}

export default useNetworkStatus
