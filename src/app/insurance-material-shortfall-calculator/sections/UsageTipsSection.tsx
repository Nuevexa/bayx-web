import RevealAnimation from '@/components/animation/RevealAnimation';

const UsageTipsSection = () => {
    const tips = [
        {
            title: 'Use Your Actual Supplier Costs',
            description: 'For the most accurate results, use the exact per-ounce costs from your paint supplier invoices rather than estimates.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#money-gradient)" />
                    <circle cx="32" cy="32" r="20" fill="#4f8480" fillOpacity="0.2" />
                    <text x="32" y="40" fontSize="24" fontWeight="bold" fill="#4f8480" textAnchor="middle">£</text>
                    <defs>
                        <linearGradient id="money-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Calculate Multiple Scenarios',
            description: 'Run the calculator for different job sizes (small repair vs full respray) to understand how shortfall varies.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#refresh-gradient)" />
                    <path d="M32 16C23.2 16 16 23.2 16 32C16 40.8 23.2 48 32 48C40.8 48 48 40.8 48 32" stroke="#4f8480" strokeWidth="4" strokeLinecap="round" />
                    <path d="M44 24L48 32L40 36" fill="#4f8480" />
                    <defs>
                        <linearGradient id="refresh-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Track Payment Patterns',
            description: 'Note which insurance companies consistently underpay the most. Use this data in DRP negotiations.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#chart-gradient)" />
                    <rect x="20" y="36" width="6" height="12" rx="2" fill="#4f8480" />
                    <rect x="29" y="28" width="6" height="20" rx="2" fill="#4f8480" />
                    <rect x="38" y="20" width="6" height="28" rx="2" fill="#4f8480" />
                    <defs>
                        <linearGradient id="chart-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Save Your Results',
            description: 'Take screenshots or download results to build a case for renegotiating DRP agreements with insurers.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#save-gradient)" />
                    <path d="M32 20V40M32 40L24 32M32 40L40 32" stroke="#4f8480" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 44H44" stroke="#4f8480" strokeWidth="4" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="save-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Include All Consumables',
            description: 'Don\'t forget masking materials, sandpaper, tack cloths, mixing cups, and PPE - they add up quickly.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#tools-gradient)" />
                    <rect x="24" y="20" width="16" height="24" rx="4" fill="#4f8480" fillOpacity="0.3" />
                    <circle cx="28" cy="32" r="3" fill="#4f8480" />
                    <circle cx="36" cy="32" r="3" fill="#4f8480" />
                    <defs>
                        <linearGradient id="tools-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: 'Update Quarterly',
            description: 'Paint prices change frequently. Re-run calculations every quarter to reflect current material costs.',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="url(#calendar-gradient)" />
                    <rect x="20" y="24" width="24" height="20" rx="3" fill="#4f8480" fillOpacity="0.2" stroke="#4f8480" strokeWidth="2" />
                    <line x1="26" y1="20" x2="26" y2="28" stroke="#4f8480" strokeWidth="2" strokeLinecap="round" />
                    <line x1="38" y1="20" x2="38" y2="28" stroke="#4f8480" strokeWidth="2" strokeLinecap="round" />
                    <line x1="22" y1="30" x2="42" y2="30" stroke="#4f8480" strokeWidth="2" />
                    <defs>
                        <linearGradient id="calendar-gradient" x1="0" y1="0" x2="64" y2="64">
                            <stop offset="0%" stopColor="#EBFDF5" />
                            <stop offset="100%" stopColor="#b4dfdc" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
    ];

    return (
        <section className="max-[1920px]:px-5">
            <RevealAnimation delay={0.1}>
                <div className="bg-background-12 mx-auto max-w-[1880px] rounded-2xl py-18 md:rounded-4xl md:py-20 lg:py-25 xl:py-28">
                    <div className="main-container">
                        <div className="max-w-4xl mx-auto mb-12">
                            <RevealAnimation delay={0.2}>
                                <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium text-center mb-4">
                                    Pro Tips for Accurate Calculations
                                </h2>
                            </RevealAnimation>
                            <RevealAnimation delay={0.3}>
                                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 text-center">
                                    Maximise the value of this calculator with these expert recommendations
                                </p>
                            </RevealAnimation>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {tips.map((tip, index) => (
                                <RevealAnimation key={index} delay={0.2 + index * 0.1}>
                                    <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                                        <div className="mb-4">{tip.icon}</div>
                                        <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-3">
                                            {tip.title}
                                        </h3>
                                        <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                            {tip.description}
                                        </p>
                                    </div>
                                </RevealAnimation>
                            ))}
                        </div>

                        <RevealAnimation delay={0.8}>
                            <div className="mt-12 max-w-3xl mx-auto bg-primary-500/10 rounded-[20px] p-6 md:p-8 border border-primary-500/20">
                                <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-3 text-center">
                                    💡 Need Help Tracking Material Costs?
                                </h3>
                                <p className="text-tagline-1 text-secondary/80 dark:text-accent/80 text-center mb-4">
                                    BayX automatically tracks material costs per job, eliminating manual calculations and giving you real-time profitability insights.
                                </p>
                                <div className="text-center">
                                    <a
                                        href="/early-access"
                                        className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                                        Learn More About BayX
                                    </a>
                                </div>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </RevealAnimation>
        </section>
    );
};

export default UsageTipsSection;
