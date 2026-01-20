import LoginHero from '@/components/authentication/LoginHero';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Login - BayX Garage Management',
  description: 'Log in to your BayX garage management dashboard.',
};

const LoginPage = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <LoginHero />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Not a member yet?"
        description="Start your 14-day free trial and see how BayX can help your garage."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default LoginPage;
