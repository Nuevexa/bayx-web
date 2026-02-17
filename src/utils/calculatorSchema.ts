/**
 * Schema.org structured data generators for Insurance Material Shortfall Calculator
 * Improves SEO by providing rich snippets for search engines
 */

const BASE_URL = 'https://getbayx.com';

/**
 * WebApplication schema for the calculator tool
 */
export const generateCalculatorSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Insurance Material Shortfall Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    description:
        'Free calculator to help auto body shops determine their exact losses from insurance DRP underpayments on paint and materials.',
    url: `${BASE_URL}/insurance-material-shortfall-calculator`,
    author: {
        '@type': 'Organization',
        name: 'BayX',
        url: BASE_URL,
    },
    featureList: [
        'Calculate material shortfall',
        'DRP underpayment analysis',
        'Cost breakdown by material type',
        'Annual loss projection',
    ],
});

/**
 * BreadcrumbList schema for navigation
 */
export const generateBreadcrumbSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Insurance Material Shortfall Calculator',
            item: `${BASE_URL}/insurance-material-shortfall-calculator`,
        },
    ],
});

/**
 * FAQPage schema for frequently asked questions
 */
export const generateFAQSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is insurance material shortfall in auto body repair?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Insurance material shortfall is the gap between what insurance companies reimburse for paint and materials versus the actual cost auto body shops pay. DRP agreements often pay 30-50% less than real market costs, forcing shops to subsidize repairs out-of-pocket.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do DRP agreements affect my shop\'s profitability?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Direct Repair Program (DRP) agreements typically result in $200-$400 loss per paint job on materials alone. For shops doing 10-20 paint jobs per week, this translates to $50,000-$100,000+ in annual out-of-pocket subsidies that directly impact profitability.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why do insurance companies underpay for paint and materials?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Insurance reimbursement rates haven\'t kept pace with material cost increases, which have risen over 40% in the past five years. Modern three-stage paint systems require premium materials, but insurance payouts remain based on outdated pricing models, maximizing insurance company profits at the expense of repair shops.',
            },
        },
        {
            '@type': 'Question',
            name: 'How accurate is this calculator for my shop?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The calculator uses industry-standard material costs and typical DRP reimbursement rates validated by thousands of body shops across the US, UK, and Canada. Results provide a realistic estimate of your shortfall, though actual costs may vary based on your specific suppliers and insurance agreements.',
            },
        },
        {
            '@type': 'Question',
            name: 'What regions does this calculator cover?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'This calculator is designed for auto body shops in the United States, United Kingdom, and Canada. It accounts for regional variations in insurance practices and material costs across these markets.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I negotiate better rates with insurance companies?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, armed with accurate data about your actual material costs and losses, you can negotiate more effectively with insurance companies. Many shops have successfully renegotiated DRP rates by documenting their material shortfall and presenting concrete evidence of losses.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I track material costs accurately?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Modern garage management software like BayX automatically tracks material costs per job, providing real-time profitability analysis. This eliminates manual tracking and gives you accurate data for insurance negotiations and business decisions.',
            },
        },
        {
            '@type': 'Question',
            name: 'What\'s the average material shortfall for body shops?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Industry research shows the average auto body shop loses $200-$400 per paint job on materials alone when working under DRP agreements. High-volume shops can experience total annual shortfalls exceeding $100,000, significantly impacting overall profitability.',
            },
        },
    ],
});

/**
 * Organization schema with enhanced details
 */
export const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BayX',
    url: BASE_URL,
    logo: `${BASE_URL}/bayx-logo.png`,
    description:
        'Modern garage management software for independent auto repair shops and body shops',
    sameAs: [
        // Add social media URLs when available
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        availableLanguage: ['English'],
    },
});

/**
 * WebPage schema for the calculator page
 */
export const generateWebPageSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Insurance Material Shortfall Calculator for Auto Body Shops',
    description:
        'Calculate your exact losses from insurance DRP underpayments on paint and materials. Free tool for auto body shops in the US, UK, and Canada.',
    url: `${BASE_URL}/insurance-material-shortfall-calculator`,
    inLanguage: 'en-US',
    isPartOf: {
        '@type': 'WebSite',
        name: 'BayX',
        url: BASE_URL,
    },
    about: {
        '@type': 'Thing',
        name: 'Auto Body Shop Insurance Reimbursement',
        description: 'Insurance material shortfall and DRP underpayment analysis',
    },
    audience: {
        '@type': 'Audience',
        audienceType: 'Auto Body Shop Owners and Managers',
        geographicArea: [
            {
                '@type': 'Country',
                name: 'United States',
            },
            {
                '@type': 'Country',
                name: 'United Kingdom',
            },
            {
                '@type': 'Country',
                name: 'Canada',
            },
        ],
    },
});

/**
 * HowTo schema for calculator usage
 */
export const generateHowToSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Your Insurance Material Shortfall',
    description:
        'Step-by-step guide to using the insurance material shortfall calculator to determine your losses from DRP agreements',
    totalTime: 'PT2M',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
    },
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Material Costs',
            text: 'Input your actual costs for base coat, clear coat, and consumables per job',
            url: `${BASE_URL}/insurance-material-shortfall-calculator#step1`,
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Insurance Reimbursement',
            text: 'Enter the amount your insurance DRP agreement pays for materials',
            url: `${BASE_URL}/insurance-material-shortfall-calculator#step2`,
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Job Volume',
            text: 'Specify your average number of paint jobs per week',
            url: `${BASE_URL}/insurance-material-shortfall-calculator#step3`,
        },
        {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review Results',
            text: 'Analyze your per-job loss, weekly loss, and projected annual shortfall',
            url: `${BASE_URL}/insurance-material-shortfall-calculator#results`,
        },
    ],
});
