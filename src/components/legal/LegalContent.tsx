import { LegalDocument } from '@/interface/legalTypes'
import { generateTOCFromSections, getLegalDocumentRoute } from '@/utils/legalHelpers'
import LegalDocumentRenderer from './LegalDocumentRenderer'
import LegalTableOfContents from './LegalTableOfContents'
import LegalVersionBanner from './LegalVersionBanner'
import BreadcrumbNavigation from './BreadcrumbNavigation'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import RevealAnimation from '../animation/RevealAnimation'

interface LegalContentProps {
    document: LegalDocument
    relatedDocuments?: Array<{
        type: string
        title: string
        href: string
    }>
    className?: string
}

/**
 * Main wrapper component for legal document pages
 * Orchestrates all legal document display components
 */
export default function LegalContent({ document, relatedDocuments, className = '' }: LegalContentProps) {
    const tocItems = generateTOCFromSections(document.sections || [])

    return (
        <section className={`legal-document-wrapper pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] ${className}`}>
            <div className="main-container">
                {/* Breadcrumb */}
                <BreadcrumbNavigation items={[{ label: 'Legal' }, { label: document.title }]} />

                {/* Header */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent">{document.title}</h1>
                    {document.summary && (
                        <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 max-w-3xl">{document.summary}</p>
                    )}
                </div>

                {/* Version Banner */}
                <LegalVersionBanner
                    version={document.version}
                    effectiveDate={document.effectiveDate}
                    lastUpdated={document.lastUpdated}
                    className="mb-12"
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* Table of Contents - Sidebar on desktop */}
                    {tocItems.length > 0 && (
                        <aside className="col-span-12 lg:col-span-4">
                            <LegalTableOfContents items={tocItems} />
                        </aside>
                    )}

                    {/* Main Content */}
                    <article className={`col-span-12 ${tocItems.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
                        {/* Introduction */}
                        {document.introduction && document.introduction.length > 0 && (
                            <div className="mb-12">
                                <LegalDocumentRenderer content={document.introduction} />
                            </div>
                        )}

                        {/* Sections */}
                        {document.sections && document.sections.length > 0 && (
                            <div className="space-y-12">
                                {document.sections
                                    .sort((a, b) => a.order - b.order)
                                    .map((section, index) => (
                                        <section key={section.sectionId.current} id={section.sectionId.current} className="scroll-mt-24">
                                            {/* Main Section Title */}
                                            <h2 className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent mb-6 font-semibold">
                                                {section.order}. {section.sectionTitle}
                                            </h2>

                                            {/* Section Content (if any, before subsections) */}
                                            {section.sectionContent && section.sectionContent.length > 0 && (
                                                <div className="mb-8">
                                                    <LegalDocumentRenderer content={section.sectionContent} />
                                                </div>
                                            )}

                                            {/* Subsections */}
                                            {section.subsections && section.subsections.length > 0 && (
                                                <div className="space-y-8">
                                                    {section.subsections
                                                        .sort((a, b) => a.order - b.order)
                                                        .map((subsection) => (
                                                            <div key={subsection.subsectionId.current} id={subsection.subsectionId.current} className="scroll-mt-24">
                                                                <h3 className="text-heading-6 sm:text-heading-5 text-secondary dark:text-accent mb-4 font-semibold">
                                                                    {section.order}.{subsection.order} {subsection.subsectionTitle}
                                                                </h3>
                                                                <LegalDocumentRenderer content={subsection.subsectionContent} />
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </section>
                                    ))}
                            </div>
                        )}

                        {/* Contact Information */}
                        {(document.contactEmail || document.governingLaw) && (
                            <div className="bg-background-1 dark:bg-background-6 border-stroke-3 dark:border-stroke-7 mt-16 rounded-xl border p-6">
                                <h3 className="text-heading-6 text-secondary dark:text-accent mb-4 font-semibold">
                                    Contact Information
                                </h3>
                                <div className="text-tagline-1 text-secondary/70 dark:text-accent/70 space-y-2">
                                    {document.contactEmail && (
                                        <p>
                                            <strong className="text-secondary dark:text-accent">Legal Inquiries:</strong>{' '}
                                            <a
                                                href={`mailto:${document.contactEmail}`}
                                                className="text-primary-500 hover:text-primary-600 underline">
                                                {document.contactEmail}
                                            </a>
                                        </p>
                                    )}
                                    {document.governingLaw && (
                                        <p>
                                            <strong className="text-secondary dark:text-accent">Governing Law:</strong>{' '}
                                            {document.governingLaw}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                </div>

                {/* Related Legal Documents */}
                {relatedDocuments && relatedDocuments.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-stroke-3 dark:border-stroke-7">
                        <h3 className="text-heading-6 text-secondary dark:text-accent mb-6 font-semibold">
                            Related Legal Documents
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedDocuments.map((doc) => (
                                <Link
                                    key={doc.type}
                                    href={doc.href}
                                    className="bg-background-1 dark:bg-background-6 border-stroke-3 dark:border-stroke-7 hover:border-primary-500 group flex items-center gap-3 rounded-lg border p-4 transition-all">
                                    <FileText className="text-primary-500 size-5 shrink-0" aria-hidden="true" />
                                    <span className="text-tagline-1 text-secondary dark:text-accent group-hover:text-primary-500 font-medium transition-colors">
                                        {doc.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
