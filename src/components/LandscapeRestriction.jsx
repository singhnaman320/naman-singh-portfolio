import { useEffect } from 'react'

const ForcePortraitMode = () => {
  useEffect(() => {
    // Force portrait orientation on mobile devices
    const handleOrientation = () => {
      const isMobile = window.innerWidth <= 768 || window.innerHeight <= 768
      const isLandscape = window.innerWidth > window.innerHeight
      
      if (isMobile) {
        // Add CSS class to html and body for better control
        document.documentElement.classList.add('mobile-device')
        document.body.classList.add('mobile-device')
        
        if (isLandscape) {
          document.documentElement.classList.add('force-portrait-rotation')
          document.body.classList.add('force-portrait-rotation')
        } else {
          document.documentElement.classList.remove('force-portrait-rotation')
          document.body.classList.remove('force-portrait-rotation')
        }

        // Try to lock orientation to portrait if supported
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('portrait-primary').catch(() => {
            // Fallback to any portrait orientation
            screen.orientation.lock('portrait').catch(() => {
              console.log('Orientation lock not supported')
            })
          })
        }

        // Set viewport meta tag for better mobile control
        let viewport = document.querySelector('meta[name="viewport"]')
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, orientation=portrait')
        }
      } else {
        // Remove mobile classes on desktop
        document.documentElement.classList.remove('mobile-device', 'force-portrait-rotation')
        document.body.classList.remove('mobile-device', 'force-portrait-rotation')
        
        // Reset viewport for desktop
        let viewport = document.querySelector('meta[name="viewport"]')
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
        }
      }
    }

    // Apply immediately
    handleOrientation()

    // Listen for orientation and resize changes
    window.addEventListener('resize', handleOrientation)
    window.addEventListener('orientationchange', () => {
      setTimeout(handleOrientation, 100) // Small delay for orientation change
    })

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleOrientation)
      window.removeEventListener('orientationchange', handleOrientation)
      document.documentElement.classList.remove('mobile-device', 'force-portrait-rotation')
      document.body.classList.remove('mobile-device', 'force-portrait-rotation')
    }
  }, [])

  return null
}

export default ForcePortraitMode
