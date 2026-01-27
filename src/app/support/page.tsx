import ContactInfo from '@/components/contact-page/ContactInfo';
import CTAV1 from '@/components/shared/cta/CTAV1';
import NeedHelp from '@/components/support/NeedHelp';
import Services from '@/components/support/Services';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Support - Help Center & Documentation | BayX',
  description:
    'Find answers, tutorials, and support for using BayX in your auto repair shop. Access our knowledge base and community.',
};

const Support = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <NeedHelp />
      <Services />
      <ContactInfo />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Join our early access program today."
        ctaBtnText="Get Early Access"
      />
    </main>
  );
};

export default Support;
