import CaseStudy from '@/components/home/CaseStudy';
import ClientsMarquee from '@/components/home/ClientsMarquee';
import CTA from '@/components/home/CTA';
import Faq from '@/components/home/Faq';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import HowItsWork from '@/components/home/HowItsWork';
import Services from '@/components/home/Services';
import Testimonial from '@/components/home/Testimonial';
import WhatWeDo from '@/components/home/WhatWeDo';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'BayX - #1 Garage Management Software for Independent Shops',
  description:
    'Transform your auto repair business with BayX. The modern, easy-to-use garage management system designed to increase efficiency and profitability.',
  keywords: [
    'garage management software',
    'auto repair software',
    'mechanic shop software',
    'shop management system',
    'repair shop POS',
    'automotive workshop software',
  ],
};

const page = () => {
  return (
    <main className="space-y-10 bg-white">
      <Hero />
      <ClientsMarquee />
      <WhatWeDo />
      <Features />
      <HowItsWork />
      <Services />
      <CaseStudy />
      <Testimonial />
      <Faq />
      <CTA />
    </main>
  );
};

export default page;
