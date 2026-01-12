import Client from '@/components/pricing/Client';
import Faq from '@/components/pricing/Faq';
import Pricing from '@/components/pricing/Pricing';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Pricing - BayX',
};

const page = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Pricing />

      <Faq />
      <CTAV1
        className="dark:bg-background-5 bg-background-1"
        badgeText="Get started"
        badgeClass="badge-green-v2"
        ctaHeading="Ready to streamline your shop?"
        description="Start your 14-day free trial."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default page;
