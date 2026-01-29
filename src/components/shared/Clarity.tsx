'use client'

import Script from 'next/script'

/**
 * Microsoft Clarity Analytics Component
 * Only loads in production environment for privacy and performance
 */
export default function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  // Only load Clarity in production and if project ID is available
  if (process.env.NODE_ENV !== 'production' || !projectId) {
    return null
  }

  return (
    <>
      {/* Microsoft Clarity Script */}
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${projectId}");
          `,
        }}
      />

      {/* Clarity Privacy Control (optional, for GDPR compliance) */}
      <Script
        id="clarity-privacy"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.clarity = window.clarity || function() {(window.clarity.q = window.clarity.q || []).push(arguments)};
          `,
        }}
      />
    </>
  )
}
