import EarlyAccessHero from '@/components/early-access/EarlyAccessHero';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Early Access - Join the BayX Revolution',
  description:
    'Be the first to experience the future of garage management. Sign up for early access to BayX and shape the tools you need.',
};

const EarlyAccessPage = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <EarlyAccessHero />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Want to learn more first?"
        description="Check out our features and see how BayX can transform your garage operations."
        ctaBtnText="Explore Features"
        ctaLink="/features"
      />
    </main>
  );
};

export default EarlyAccessPage;
