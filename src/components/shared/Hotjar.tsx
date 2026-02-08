'use client'

import Script from 'next/script'

/**
 * Hotjar Analytics Component
 * Only loads in production environment for privacy and performance
 */
export default function Hotjar() {
  // Only load Hotjar in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      src="https://t.contentsquare.net/uxa/c3e513c954fc6.js"
      strategy="beforeInteractive"
    />
  )
}
