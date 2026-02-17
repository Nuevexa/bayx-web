import HeroSection from './sections/HeroSection';
import WhyMattersSection from './sections/WhyMattersSection';
import CostBreakdownSection from './sections/CostBreakdownSection';
import TestimonialsSection from './sections/TestimonialsSection';
import TakeActionSection from './sections/TakeActionSection';
import FAQSection from './sections/FAQSection';
import ComparisonTableSection from './sections/ComparisonTableSection';
import UsageTipsSection from './sections/UsageTipsSection';
import SocialShareSection from './sections/SocialShareSection';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import {
    generateCalculatorSchema,
    generateBreadcrumbSchema,
    generateFAQSchema,
    generateOrganizationSchema,
    generateWebPageSchema,
    generateHowToSchema,
} from '@/utils/calculatorSchema';

export const metadata: Metadata = {
    ...defaultMetadata,
    title: 'Free Insurance Material Shortfall Calculator for Auto Body Shops | US, UK, Canada',
    description:
        'Calculate your exact losses from insurance DRP underpayments on paint and materials. Free tool for body shops - discover how much you\'re subsidising out-of-pocket. Get instant results.',
    keywords: [
        'insurance material shortfall calculator',
        'auto body shop calculator',
        'bodyshop calculator',
        'DRP underpayment calculator',
        'paint material costs',
        'insurance reimbursement calculator',
        'body shop profit margins',
        'collision repair calculator',
        'DRP agreement analyser',
        'auto repair insurance calculator',
        'material cost calculator body shop',
        'insurance shortfall UK',
        'insurance shortfall Canada',
        'paint and materials reimbursement',
    ],
    alternates: {
        canonical: 'https://getbayx.com/insurance-material-shortfall-calculator',
    },
    openGraph: {
        title: 'Free Insurance Material Shortfall Calculator | Auto Body Shops',
        description:
            'Are you subsidising insurance company profits? Calculate your exact loss on paint & materials with our free calculator. Trusted by 5,000+ shops.',
        type: 'website',
        url: 'https://getbayx.com/insurance-material-shortfall-calculator',
        images: [
            {
                url: 'https://getbayx.com/bayx-logo.png',
                width: 1200,
                height: 630,
                alt: 'BayX Insurance Material Shortfall Calculator',
            },
        ],
    },
};


const InsuranceCalculatorPage = () => {
    // Generate all schemas for SEO
    const calculatorSchema = generateCalculatorSchema();
    const breadcrumbSchema = generateBreadcrumbSchema();
    const faqSchema = generateFAQSchema();
    const organizationSchema = generateOrganizationSchema();
    const webPageSchema = generateWebPageSchema();
    const howToSchema = generateHowToSchema();

    return (
        <>
            {/* Structured Data for SEO - Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <main className="space-y-10 bg-white dark:bg-background-7">
                <HeroSection />
                <WhyMattersSection />
                <CostBreakdownSection />
                {/* Comparison Table */}
                <ComparisonTableSection />

                {/* Usage Tips */}
                <UsageTipsSection />

                {/* FAQ Section */}
                <FAQSection />

                {/* Social Sharing */}
                <SocialShareSection />

                {/* Final CTA */}
                <TakeActionSection />
            </main>
        </>
    );
};

export default InsuranceCalculatorPage;
