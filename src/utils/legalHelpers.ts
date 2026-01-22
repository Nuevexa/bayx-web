import { LegalDocumentType, TOCItem, LegalSection } from '@/interface/legalTypes'

/**
 * Get display title for legal document type
 */
export function getLegalDocumentTitle(type: LegalDocumentType): string {
    const titles: Record<LegalDocumentType, string> = {
        'terms-of-service': 'Terms of Service',
        'privacy-policy': 'Privacy Policy',
        'refund-policy': 'Refund Policy',
        'data-processing-agreement': 'Data Processing Agreement',
    }
    return titles[type] || 'Legal Document'
}

/**
 * Format date for legal context
 * @param dateString ISO date string
 * @returns Formatted date (e.g., "January 19, 2026")
 */
export function formatLegalDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Create URL-safe anchor ID from text
 * @param text Section title or heading text
 * @returns URL-safe anchor ID
 */
export function createAnchorId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Generate hierarchical Table of Contents from sections and subsections
 * Creates structure like: 1. Main Section -> 1.1 Subsection, 1.2 Subsection
 * @param sections Array of legal sections with optional subsections
 * @returns Array of hierarchical TOC items
 */
export function generateTOCFromSections(sections: LegalSection[]): TOCItem[] {
    if (!sections || sections.length === 0) return []

    const tocItems: TOCItem[] = []

    sections
        .sort((a, b) => a.order - b.order)
        .forEach((section) => {
            // Add main section
            const subsectionItems: TOCItem[] = []

            // Add subsections if they exist
            if (section.subsections && section.subsections.length > 0) {
                section.subsections
                    .sort((a, b) => a.order - b.order)
                    .forEach((subsection) => {
                        subsectionItems.push({
                            id: subsection.subsectionId?.current || createAnchorId(subsection.subsectionTitle),
                            title: subsection.subsectionTitle,
                            order: subsection.order,
                            level: 2,
                            parentOrder: section.order,
                        })
                    })
            }

            tocItems.push({
                id: section.sectionId?.current || createAnchorId(section.sectionTitle),
                title: section.sectionTitle,
                order: section.order,
                level: 1,
                subsections: subsectionItems.length > 0 ? subsectionItems : undefined,
            })
        })

    return tocItems
}

/**
 * Get route path for legal document type
 */
export function getLegalDocumentRoute(type: LegalDocumentType): string {
    const routes: Record<LegalDocumentType, string> = {
        'terms-of-service': '/terms-conditions',
        'privacy-policy': '/privacy-policy',
        'refund-policy': '/refund-policy',
        'data-processing-agreement': '/data-processing-agreement',
    }
    return routes[type] || '/'
}

/**
 * Compare semantic versions
 * @param v1 Version string (e.g., "1.0.0")
 * @param v2 Version string (e.g., "1.1.0")
 * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal
 */
export function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number)
    const parts2 = v2.split('.').map(Number)

    for (let i = 0; i < 3; i++) {
        if (parts1[i] > parts2[i]) return 1
        if (parts1[i] < parts2[i]) return -1
    }
    return 0
}

/**
 * Check if a version is newer than another
 */
export function isNewerVersion(newVersion: string, oldVersion: string): boolean {
    return compareVersions(newVersion, oldVersion) > 0
}
