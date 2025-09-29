// Simple direct mapping - just add exact company names as they appear in database
export const getCompanyLogo = (companyName) => {
  if (!companyName) return '/images/company-placeholder.jpg'
  
  // Direct mapping - no processing, exact match only
  const logoMap = {
    // Exact company names from your database
    'Acme In Tech Pvt. Ltd.': '/images/acmeInTech-logo.png',
    'Wizcure Pharmaa Pvt. Ltd.': '/images/wizcure-logo.png',
    'Masai School': '/images/masai-logo.png'
  }

  // Return logo if exact match found, otherwise placeholder
  return logoMap[companyName] || '/images/company-placeholder.jpg'
}

// List of available company logos for reference
export const availableLogos = [
  'Acme In Tech Pvt. Ltd.',
  'Wizcure Pharmaa Pvt. Ltd.', 
  'Masai School'
]
