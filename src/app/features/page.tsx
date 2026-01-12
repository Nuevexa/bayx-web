import Feature from '@/components/features/Feature';
import Features from '@/components/features/Features';
import WhyChooseUs from '@/components/features/WhyChooseUs';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Features - BayX Garage Management Software',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <Features />
      <Feature />
      <WhyChooseUs className="dark:bg-background-7" />
      {/* Reviews section hidden until real testimonials are available */}
      {/* <ReviewsV2 badgeColor="!badge-cyan" sectionSpacingClass="pt-[100px] pb-[200px] space-y-[70px]" /> */}
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Start your 14-day free trial."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default page;
