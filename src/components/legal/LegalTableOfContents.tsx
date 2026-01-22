'use client'

import { TOCItem } from '@/interface/legalTypes'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface LegalTableOfContentsProps {
    items: TOCItem[]
    className?: string
}

/**
 * Auto-generated sticky Table of Contents for legal documents
 * with hierarchical sections (e.g., 1. Section -> 1.1, 1.2 Subsections)
 * Includes smooth scrolling and active section highlighting
 */
export default function LegalTableOfContents({ items, className = '' }: LegalTableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Intersection Observer to track active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-20% 0px -35% 0px',
                threshold: 0,
            }
        )

        // Observe all sections and subsections
        items.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) {
                observer.observe(element)
            }

            // Observe subsections
            item.subsections?.forEach((subsection) => {
                const subsectionElement = document.getElementById(subsection.id)
                if (subsectionElement) {
                    observer.observe(subsectionElement)
                }
            })
        })

        return () => {
            observer.disconnect()
        }
    }, [items])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            })
            setIsOpen(false) // Close on mobile after selection
        }
    }

    if (!items || items.length === 0) {
        return null
    }

    return (
        <nav className={`legal-toc ${className}`} aria-label="Table of Contents">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-background-1 dark:bg-background-6 border-stroke-3 dark:border-stroke-7 flex w-full items-center justify-between rounded-xl border p-4 lg:hidden"
                aria-expanded={isOpen}>
                <span className="text-heading-6 text-secondary dark:text-accent font-semibold">Table of Contents</span>
                {isOpen ? (
                    <ChevronUp className="text-secondary dark:text-accent size-5" />
                ) : (
                    <ChevronDown className="text-secondary dark:text-accent size-5" />
                )}
            </button>

            {/* TOC List */}
            <div
                className={`bg-background-1 dark:bg-background-6 border-stroke-3 dark:border-stroke-7 mt-4 rounded-xl border lg:sticky lg:top-24 lg:mt-0 lg:block ${isOpen ? 'block' : 'hidden'
                    }`}>
                <div className="p-6">
                    <h3 className="text-heading-6 text-secondary dark:text-accent mb-4 font-semibold">Table of Contents</h3>
                    <ul className="space-y-2" role="list">
                        {items.map((item) => {
                            const isActive = activeId === item.id
                            const hasSubsections = item.subsections && item.subsections.length > 0

                            return (
                                <li key={item.id}>
                                    {/* Main Section */}
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-tagline-1 hover:text-primary-500 block w-full text-left transition-colors ${isActive
                                                ? 'text-primary-500 font-semibold'
                                                : 'text-secondary/70 dark:text-accent/70 font-normal'
                                            }`}
                                        aria-current={isActive ? 'location' : undefined}>
                                        <span className="border-stroke-3 dark:border-stroke-7 flex items-start gap-3 border-l-2 py-1.5 pl-4">
                                            <span
                                                className={`mt-1.5 size-1.5 shrink-0 rounded-full ${isActive ? 'bg-primary-500' : 'bg-secondary/30 dark:bg-accent/30'
                                                    }`}
                                            />
                                            <span className="flex-1">
                                                {item.order}. {item.title}
                                            </span>
                                        </span>
                                    </button>

                                    {/* Subsections */}
                                    {hasSubsections && (
                                        <ul className="ml-6 mt-1 space-y-1" role="list">
                                            {item.subsections!.map((subsection) => {
                                                const isSubActive = activeId === subsection.id
                                                return (
                                                    <li key={subsection.id}>
                                                        <button
                                                            onClick={() => scrollToSection(subsection.id)}
                                                            className={`text-tagline-2 hover:text-primary-500 block w-full text-left transition-colors ${isSubActive
                                                                    ? 'text-primary-500 font-medium'
                                                                    : 'text-secondary/60 dark:text-accent/60 font-normal'
                                                                }`}
                                                            aria-current={isSubActive ? 'location' : undefined}>
                                                            <span className="flex items-start gap-2 py-1 pl-4">
                                                                <span
                                                                    className={`mt-1.5 size-1 shrink-0 rounded-full ${isSubActive ? 'bg-primary-500' : 'bg-secondary/20 dark:bg-accent/20'
                                                                        }`}
                                                                />
                                                                <span className="flex-1">
                                                                    {item.order}.{subsection.order} {subsection.title}
                                                                </span>
                                                            </span>
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            {/* Print-friendly version (hidden on screen, visible in print) */}
            <div className="hidden print:block">
                <h3 className="mb-4 text-xl font-semibold">Table of Contents</h3>
                <ol className="space-y-2 pl-6">
                    {items.map((item) => (
                        <li key={item.id} className="text-sm">
                            {item.order}. {item.title}
                            {item.subsections && item.subsections.length > 0 && (
                                <ol className="mt-1 ml-4 space-y-1">
                                    {item.subsections.map((subsection) => (
                                        <li key={subsection.id} className="text-sm">
                                            {item.order}.{subsection.order} {subsection.title}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}
