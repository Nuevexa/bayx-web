'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';

type FeatureLink = {
    label: string;
    description: string;
    href: string;
};

const featureLinks: FeatureLink[] = [
    {
        label: 'Job Board',
        description: 'Visual drag-and-drop job tracking',
        href: '/features/job-board',
    },
    {
        label: 'Profitability Analytics',
        description: 'Real-time revenue and margin insights',
        href: '/features/profitability-analytics',
    },
    {
        label: 'Customer Portal',
        description: 'Let customers track their vehicle',
        href: '/features/customer-portal',
    },
    {
        label: 'Technician Portal',
        description: 'Mobile app for your techs',
        href: '/features/technician-portal',
    },
    {
        label: 'Estimates & Approvals',
        description: 'Professional quotes and instant approvals',
        href: '/features/estimates-approvals',
    },
];

const FeaturesMenu = ({
    menuDropdownId,
    setMenuDropdownId,
}: {
    menuDropdownId: string | null;
    setMenuDropdownId: (id: string | null) => void;
}) => {
    const handleClose = () => setMenuDropdownId(null);

    return (
        <div>
            <div
                className={cn(
                    '0.3 ease ease absolute top-full left-1/2 z-40 h-3 w-[320px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
                    menuDropdownId === 'features-dropdown-menu'
                        ? '!pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0',
                )}
            />
            <div
                id="features-dropdown-menu"
                className={cn(
                    'dark:bg-background-6 border-stroke-1 ease absolute top-full left-1/2 z-50 mt-2 hidden w-[320px] -translate-x-1/2 rounded-[20px] border bg-white p-3 transition-all duration-300 xl:block dark:border-white/10',
                    menuDropdownId === 'features-dropdown-menu'
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-2.5 opacity-0',
                )}>
                <ul className="space-y-1">
                    {featureLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                onClick={handleClose}
                                className="hover:bg-background-3 dark:hover:bg-background-5 flex flex-col rounded-xl px-4 py-3 transition-colors duration-200">
                                <span className="text-tagline-1 text-secondary dark:text-accent font-medium">
                                    {link.label}
                                </span>
                                <span className="text-tagline-2 text-secondary/60 dark:text-accent/60">
                                    {link.description}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

FeaturesMenu.displayName = 'FeaturesMenu';
export default FeaturesMenu;
