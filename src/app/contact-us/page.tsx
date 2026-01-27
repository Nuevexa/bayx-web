import ContactInfo from '@/components/contact-page/ContactInfo';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Contact Us - BayX Support & Sales',
  description:
    'Get in touch with the BayX team. We are here to help you modernize your auto repair shop. Reach out for sales, support, or partnerships.',
};

const ContactUs = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <ContactInfo />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="hidden"
        ctaBtnText="Get Early Access"
        ctaHeading="Ready to try BayX?"
        description="Join our early access program and be among the first to experience BayX."
      />
    </main>
  );
};

export default ContactUs;
