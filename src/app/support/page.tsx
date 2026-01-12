import CTAV1 from '@/components/shared/cta/CTAV1';
import Contact from '@/components/support/Contact';
import NeedHelp from '@/components/support/NeedHelp';
import Services from '@/components/support/Services';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Support - BayX Garage Management',
  description: 'Get help with BayX. Browse our knowledge base, email our support team, or submit a support request.',
};

const Support = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <NeedHelp />
      <Services />
      <Contact />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Start your 14-day free trial."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default Support;
