'use client'

import Script from 'next/script'

/**
 * Google Analytics Component
 * Only loads in production environment for privacy and performance
 */
export default function GoogleAnalytics() {
  // Only load GA in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="beforeInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-73B5H1N1W1"
      />
      <Script
        id="google-analytics"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-73B5H1N1W1');
          `,
        }}
      />
    </>
  )
}
