import { LegalDocument } from '@/interface/legalTypes'

/**
 * Generate JSON-LD structured data for legal documents
 * Helps with SEO and rich snippets
 */
export function generateLegalStructuredData(
    document: LegalDocument,
    url: string,
    organizationName = 'BayX'
) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            // WebPage schema
            {
                '@type': 'WebPage',
                '@id': url,
                url: url,
                name: document.title,
                description: document.summary || `${document.title} for ${organizationName}`,
                datePublished: document.effectiveDate,
                dateModified: document.lastUpdated || document.effectiveDate,
                inLanguage: 'en-US',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': typeof window !== 'undefined' ? window.location.origin : 'https://bayx.com',
                    name: organizationName,
                },
                about: {
                    '@type': 'Thing',
                    name: document.title,
                },
                publisher: {
                    '@type': 'Organization',
                    name: organizationName,
                },
            },
            // BreadcrumbList schema
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: typeof window !== 'undefined' ? window.location.origin : 'https://bayx.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Legal',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: document.title,
                        item: url,
                    },
                ],
            },
        ],
    }

    return structuredData
}

/**
 * Generate meta tags for legal documents
 */
export function generateLegalMetaTags(document: LegalDocument, url: string) {
    const title = `${document.title} | BayX`
    const description =
        document.summary || `Read our ${document.title}. Last updated ${new Date(document.effectiveDate).toLocaleDateString()}.`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            siteName: 'BayX',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
        other: {
            'document:version': document.version,
            'document:effective_date': document.effectiveDate,
        },
    }
}
