import HeroSection from './sections/HeroSection';
import WhyMattersSection from './sections/WhyMattersSection';
import CostBreakdownSection from './sections/CostBreakdownSection';
import TestimonialsSection from './sections/TestimonialsSection';
import TakeActionSection from './sections/TakeActionSection';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
    ...defaultMetadata,
    title: 'Free Insurance Material Shortfall Calculator for Auto Body Shops',
    description:
        'Calculate your exact losses from insurance DRP underpayments on paint and materials. Discover how much you\'re subsidizing out-of-pocket with our free tool.',
    keywords: [
        'insurance material shortfall',
        'auto body shop calculator',
        'DRP underpayment',
        'paint material costs',
        'insurance reimbursement',
        'body shop profit margins',
    ],
    openGraph: {
        title: 'Free Insurance Material Shortfall Calculator',
        description:
            'Are you subsidizing insurance company profits? Calculate your exact loss on paint & materials with our free calculator.',
        type: 'website',
        url: 'https://getbayx.com/insurance-material-shortfall-calculator',
    },
};

const InsuranceCalculatorPage = () => {
    return (
        <main className="bg-white dark:bg-background-7">
            <HeroSection />
            <WhyMattersSection />
            <CostBreakdownSection />
            <TestimonialsSection />
            <TakeActionSection />
        </main>
    );
};

export default InsuranceCalculatorPage;
