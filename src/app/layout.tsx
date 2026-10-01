import HeaderWrapper from '@/components/shared/HeaderWrapper';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Footer from '@/components/shared/footer/Footer';
import Clarity from '@/components/shared/Clarity';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import MetaPixel from '@/components/shared/MetaPixel';
import { AppContextProvider } from '@/context/AppContext';
import { interTight } from '@/utils/font';
import { generateMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BayX',
    alternateName: 'BayX Garage Management',
    url: 'https://getbayx.com',
    logo: 'https://getbayx.com/favicon.png',
    sameAs: [
      'https://www.linkedin.com/company/bayx',
      'https://www.facebook.com/share/17hDjThhxc/',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AppContextProvider>
          {/* No Suspense wrapper here: a useSearchParams() call anywhere inside it would
              silently drop every page's content from the server HTML. Without it,
              Next fails the build instead, so the problem can't ship unnoticed. */}
          <SmoothScrollProvider>
            <HeaderWrapper />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </AppContextProvider>
        <Clarity />
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  );
}
