import LegalContent from '@/components/legal/LegalContent'
import CTAV1 from '@/components/shared/cta/CTAV1'
import { defaultMetadata } from '@/utils/generateMetaData'
import { generateLegalMetaTags, generateLegalStructuredData } from '@/utils/legalStructuredData'
import { getLegalDocumentRoute } from '@/utils/legalHelpers'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalDocumentByTypeQuery } from '@/sanity/lib/queries'
import { LegalDocument } from '@/interface/legalTypes'

// Revalidate every hour
export const revalidate = 3600

/**
 * Generate metadata for Terms of Service page
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const document = await client.fetch<LegalDocument>(legalDocumentByTypeQuery, {
      documentType: 'terms-of-service',
    })

    if (document) {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bayx.com'}${getLegalDocumentRoute('terms-of-service')}`
      return generateLegalMetaTags(document, url)
    }
  } catch (error) {
    console.error('Error fetching legal document metadata:', error)
  }

  return {
    ...defaultMetadata,
    title: 'Terms and Conditions | BayX',
    description: 'Read our Terms of Service to understand the rules and regulations for using BayX services.',
  }
}

/**
 * Terms of Service Page
 */
export default async function TermsConditionsPage() {
  let document: LegalDocument | null = null
  let error = false

  try {
    document = await client.fetch<LegalDocument>(legalDocumentByTypeQuery, {
      documentType: 'terms-of-service',
    })
  } catch (err) {
    console.error('Error fetching Terms of Service:', err)
    error = true
  }

  // Related documents
  const relatedDocuments = [
    {
      type: 'privacy-policy',
      title: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      type: 'refund-policy',
      title: 'Refund Policy',
      href: '/refund-policy',
    },
    {
      type: 'data-processing-agreement',
      title: 'Data Processing Agreement',
      href: '/data-processing-agreement',
    },
  ]

  return (
    <main className="bg-background-3 dark:bg-background-7">
      {/* Structured Data for SEO */}
      {document && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateLegalStructuredData(
                document,
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bayx.com'}${getLegalDocumentRoute('terms-of-service')}`
              )
            ),
          }}
        />
      )}

      {/* Legal Document Content */}
      {document ? (
        <LegalContent document={document} relatedDocuments={relatedDocuments} />
      ) : (
        <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px]">
          <div className="main-container text-center">
            <h1 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent mb-6">
              Terms of Service
            </h1>
            {error ? (
              <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 mb-8">
                Unable to load the Terms of Service at this time. Please try again later.
              </p>
            ) : (
              <div className="text-tagline-1 text-secondary/70 dark:text-accent/70 mb-8 space-y-4">
                <p>The Terms of Service content is currently being prepared by our legal team.</p>
                <p className="text-sm">
                  Please check back soon or contact us at{' '}
                  <a href="mailto:legal@bayx.com" className="text-primary-500 underline">
                    legal@bayx.com
                  </a>{' '}
                  for more information.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="badge-primary"
        badgeText="Get Started"
        ctaHeading="Ready to transform your garage operations?"
        description="Join BayX today and start tracking profitability in real-time."
        ctaBtnText="Start Free Trial"
      />
    </main>
  )
}
