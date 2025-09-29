// Simple direct mapping - just add exact company names as they appear in database
export const getCompanyLogo = (companyName) => {
  if (!companyName) return '/images/company-placeholder.jpg'
  
  // Debug: Show exact company name (remove this later)
  console.log(`Looking for logo for: "${companyName}"`)
  
  // Direct mapping - no processing, exact match only
  const logoMap = {
    // Exact company names from your database
    'Acme In Tech Pvt. Ltd.': '/images/acmeInTech-logo.png',
    'Wizcure Pharma Pvt. Ltd.': '/images/wizcure-logo.png',
    'Masai School': '/images/masai-logo.png'
  }

  const result = logoMap[companyName] || '/images/company-placeholder.jpg'
  console.log(`Result: ${result}`)
  
  // Return logo if exact match found, otherwise placeholder
  return result
}

// List of available company logos for reference
export const availableLogos = [
  'Acme In Tech Pvt. Ltd.',
  'Wizcure Pharma Pvt. Ltd.', 
  'Masai School'
]
