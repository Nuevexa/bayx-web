import SignupHero from '@/components/authentication/SignupHero';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Sign Up - BayX Garage Management',
  description: 'Create your BayX account and start your 14-day free trial.',
};

const SignupPage = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <SignupHero />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to take control of your shop?"
        description="Join hundreds of garage owners who've improved their margins with BayX."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default SignupPage;
