import Contact from '@/components/faq/Contact';
import FaqTab from '@/components/faq/FaqTab';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'FAQ - BayX Garage Management',
  description: 'Frequently asked questions about BayX garage management software. Find answers about pricing, features, getting started, and more.',
};

// Revalidate every 60 seconds
export const revalidate = 60;

const FAQ = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <FaqTab />
      <Contact />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Join our early access program today."
        ctaBtnText="Get Early Access"
        useInstantAnimations={true}
      />
    </main>
  );
};

export default FAQ;
