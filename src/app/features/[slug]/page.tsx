import Contents from '@/components/service-details/Contents';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import getMarkDownData from '@/utils/getMarkDownData';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const services = getMarkDownData('src/data/services');
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Features - BayX Garage Management',
};

const OurServicesDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <main className="bg-background-3 dark:bg-background-7">
      <Contents slug={slug} />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Join our early access program today."
        ctaBtnText="Get Early Access"
      />
    </main>
  );
};

export default OurServicesDetails;
