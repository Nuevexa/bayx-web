import { PortableTextBlock } from 'sanity'

// Legal document types enum
export type LegalDocumentType = 'terms-of-service' | 'privacy-policy' | 'refund-policy' | 'data-processing-agreement'

export type PublishStatus = 'draft' | 'published'

// Legal Subsection interface
export interface LegalSubsection {
    subsectionTitle: string
    subsectionId: {
        current: string
    }
    subsectionContent: PortableTextBlock[]
    order: number
}

// Legal Section interface
export interface LegalSection {
    sectionTitle: string
    sectionId: {
        current: string
    }
    sectionContent?: PortableTextBlock[]
    subsections?: LegalSubsection[]
    order: number
}

// Legal Document interface
export interface LegalDocument {
    _id: string
    documentType: LegalDocumentType
    title: string
    slug: {
        current: string
    }
    version: string
    effectiveDate: string
    lastUpdated?: string
    summary?: string
    publishStatus: PublishStatus
    notifyUsers: boolean
    introduction?: PortableTextBlock[]
    sections: LegalSection[]
    contactEmail?: string
    governingLaw?: string
}

// Legal metadata for SEO
export interface LegalMetadata {
    title: string
    description?: string
    version: string
    lastUpdated: string
    effectiveDate: string
}

// Version Info for history
export interface VersionInfo {
    _id: string
    version: string
    effectiveDate: string
    publishStatus: PublishStatus
    summary?: string
}

// Table of Contents item (supports nested structure)
export interface TOCItem {
    id: string
    title: string
    order: number
    level: number // 1 for section, 2 for subsection
    parentOrder?: number // For subsections, the parent section order
    subsections?: TOCItem[]
}
