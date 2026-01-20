import { formatLegalDate } from '@/utils/legalHelpers'
import { Calendar, FileText } from 'lucide-react'

interface LegalVersionBannerProps {
    version: string
    effectiveDate: string
    lastUpdated?: string
    className?: string
}

/**
 * Displays version and date information prominently at the top of legal documents
 */
export default function LegalVersionBanner({
    version,
    effectiveDate,
    lastUpdated,
    className = '',
}: LegalVersionBannerProps) {
    const effectiveDateFormatted = formatLegalDate(effectiveDate)
    const lastUpdatedFormatted = lastUpdated ? formatLegalDate(lastUpdated) : null

    return (
        <div
            className={`bg-background-1 dark:bg-background-6 border-stroke-3 dark:border-stroke-7 rounded-xl border p-6 ${className}`}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Version Badge */}
                <div className="flex items-center gap-2">
                    <FileText className="text-primary-500 size-5" aria-hidden="true" />
                    <div>
                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 text-xs uppercase tracking-wide">
                            Version
                        </p>
                        <p className="text-tagline-1 text-secondary dark:text-accent font-semibold">{version}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="bg-stroke-3 dark:bg-stroke-7 hidden h-10 w-px sm:block" aria-hidden="true" />

                {/* Effective Date */}
                <div className="flex items-center gap-2">
                    <Calendar className="text-primary-500 size-5" aria-hidden="true" />
                    <div>
                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 text-xs uppercase tracking-wide">
                            Effective Date
                        </p>
                        <p className="text-tagline-1 text-secondary dark:text-accent font-semibold">{effectiveDateFormatted}</p>
                    </div>
                </div>

                {/* Last Updated (if different from effective date) */}
                {lastUpdatedFormatted && lastUpdatedFormatted !== effectiveDateFormatted && (
                    <>
                        <div className="bg-stroke-3 dark:bg-stroke-7 hidden h-10 w-px sm:block" aria-hidden="true" />
                        <div className="flex items-center gap-2">
                            <Calendar className="text-secondary/50 dark:text-accent/50 size-5" aria-hidden="true" />
                            <div>
                                <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 text-xs uppercase tracking-wide">
                                    Last Updated
                                </p>
                                <p className="text-tagline-1 text-secondary dark:text-accent font-semibold">{lastUpdatedFormatted}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
