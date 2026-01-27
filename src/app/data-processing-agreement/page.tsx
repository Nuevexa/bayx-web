import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalDocumentByTypeQuery } from '@/sanity/lib/queries'
import { LegalDocument } from '@/interface/legalTypes'
import LegalContent from '@/components/legal/LegalContent'
import { generateLegalStructuredData, generateLegalMetaTags } from '@/utils/legalStructuredData'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
    try {
        const document = await client.fetch<LegalDocument>(
            legalDocumentByTypeQuery,
            { documentType: 'data-processing-agreement' },
            { next: { revalidate: 3600 } }
        )

        if (!document) {
            return {
                title: 'Data Processing Agreement | BayX',
                description: 'GDPR-compliant Data Processing Agreement for BayX Platform',
            }
        }

        return generateLegalMetaTags(document, 'data-processing-agreement')
    } catch (error) {
        console.error('Error fetching DPA for metadata:', error)
        return {
            title: 'Data Processing Agreement | BayX',
            description: 'GDPR-compliant Data Processing Agreement for BayX Platform',
        }
    }
}

export default async function DataProcessingAgreementPage() {
    let document: LegalDocument | null = null
    let error: string | null = null

    try {
        document = await client.fetch<LegalDocument>(
            legalDocumentByTypeQuery,
            { documentType: 'data-processing-agreement' },
            { next: { revalidate: 3600 } }
        )

        if (!document) {
            error = 'Document not found'
        }
    } catch (err) {
        console.error('Error fetching DPA:', err)
        error = 'Failed to load document'
    }

    // Related documents
    const relatedDocuments = [
        {
            type: 'terms-of-service',
            title: 'Terms of Service',
            href: '/terms-conditions',
        },
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
    ]

    // Generate structured data for SEO
    const structuredData = document ? generateLegalStructuredData(document, 'data-processing-agreement') : null

    return (
        <>
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            <main className="bg-background-3 dark:bg-background-7">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {error ? (
                        <div className="rounded-lg bg-red-50 p-8 text-center">
                            <h1 className="mb-4 text-2xl font-bold text-red-900">
                                Data Processing Agreement Unavailable
                            </h1>
                            <p className="text-red-700">
                                {error}. Please contact us at{' '}
                                <a href="mailto:support@bayx.app" className="underline">
                                    support@bayx.app
                                </a>
                                {' '}for assistance.
                            </p>
                        </div>
                    ) : document ? (
                        <LegalContent document={document} relatedDocuments={relatedDocuments} />
                    ) : (
                        <div className="animate-pulse">
                            <div className="mb-8 h-12 w-3/4 rounded bg-gray-200"></div>
                            <div className="space-y-4">
                                <div className="h-4 w-full rounded bg-gray-200"></div>
                                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                                <div className="h-4 w-4/6 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
