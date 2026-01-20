import CTAV1 from '@/components/shared/cta/CTAV1';
import Contact from '@/components/team-details/Contact';
import Details from '@/components/team-details/Details';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Team Details - AI Application || NextSaaS',
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <main className="bg-background-3 dark:bg-background-7">
      <Details slug={slug} />
      <Contact />
      <CTAV1
        className="bg-secondary dark:bg-background-5 py-28"
        ctaHeading="Join the future of cloud software"
        headingClass="text-accent"
        description="Start your free trial today and experience the power of NexSaaS—where efficiency meets innovation."
        descriptionClass="max-w-[530px] text-accent/60"
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
