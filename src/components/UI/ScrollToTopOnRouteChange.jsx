import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top instantly when route changes for better UX
    window.scrollTo(0, 0)
  }, [pathname])

  // Also scroll to top on component mount (page refresh/initial load)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

export default ScrollToTopOnRouteChange
