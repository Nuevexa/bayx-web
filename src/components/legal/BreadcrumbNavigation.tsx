import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbNavigationProps {
    items: BreadcrumbItem[]
    className?: string
}

/**
 * SEO-friendly breadcrumb navigation for legal pages
 */
export default function BreadcrumbNavigation({ items, className = '' }: BreadcrumbNavigationProps) {
    return (
        <nav aria-label="Breadcrumb" className={`mb-8 ${className}`}>
            <ol className="flex flex-wrap items-center gap-2 text-sm" role="list">
                {/* Home */}
                <li className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="text-secondary/60 dark:text-accent/60 hover:text-primary-500 flex items-center gap-1.5 transition-colors"
                        aria-label="Home">
                        <Home className="size-4" aria-hidden="true" />
                        <span>Home</span>
                    </Link>
                    <ChevronRight className="text-secondary/30 dark:text-accent/30 size-4" aria-hidden="true" />
                </li>

                {/* Breadcrumb items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <>
                                    <Link
                                        href={item.href}
                                        className="text-secondary/60 dark:text-accent/60 hover:text-primary-500 transition-colors">
                                        {item.label}
                                    </Link>
                                    <ChevronRight className="text-secondary/30 dark:text-accent/30 size-4" aria-hidden="true" />
                                </>
                            ) : (
                                <span className="text-secondary dark:text-accent font-medium" aria-current={isLast ? 'page' : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
