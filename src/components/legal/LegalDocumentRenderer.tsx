'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'
import Link from 'next/link'

interface LegalDocumentRendererProps {
    content: PortableTextBlock[]
    className?: string
}

/**
 * Custom portable text components for legal document rendering
 */
const legalPortableTextComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
        h2: ({ children }) => (
            <h2 className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent mt-12 mb-6 font-semibold first:mt-0">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-heading-6 sm:text-heading-5 text-secondary dark:text-accent mt-10 mb-5 font-semibold">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-tagline-1 sm:text-heading-6 text-secondary dark:text-accent mt-8 mb-4 font-semibold">
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 className="text-tagline-1 text-secondary dark:text-accent mt-6 mb-3 font-semibold">{children}</h5>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-primary-500 bg-background-1 dark:bg-background-6 my-6 border-l-4 py-4 pl-6 pr-4 italic">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="text-tagline-1 text-secondary/80 dark:text-accent/80 mb-6 ml-6 list-disc space-y-3">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="text-tagline-1 text-secondary/80 dark:text-accent/80 mb-6 ml-6 list-decimal space-y-3">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="pl-2">{children}</li>,
        number: ({ children }) => <li className="pl-2">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="text-secondary dark:text-accent font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => (
            <code className="bg-background-1 dark:bg-background-6 text-primary-500 rounded px-1.5 py-0.5 text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ value, children }) => {
            const href = value?.href || '#'
            const openInNewTab = value?.openInNewTab || false
            const isExternal = href.startsWith('http')

            // Internal links
            if (!isExternal) {
                return (
                    <Link href={href} className="text-primary-500 hover:text-primary-600 underline transition-colors">
                        {children}
                    </Link>
                )
            }

            // External links
            return (
                <a
                    href={href}
                    target={openInNewTab ? '_blank' : '_self'}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-primary-500 hover:text-primary-600 underline transition-colors">
                    {children}
                </a>
            )
        },
    },
}

/**
 * Renders Sanity portable text content for legal documents
 * with custom styling and components
 */
export default function LegalDocumentRenderer({ content, className = '' }: LegalDocumentRendererProps) {
    if (!content || content.length === 0) {
        return null
    }

    return (
        <div className={`legal-content prose prose-lg max-w-none ${className}`}>
            <PortableText value={content} components={legalPortableTextComponents} />
        </div>
    )
}
