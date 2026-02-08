import HeaderWrapper from '@/components/shared/HeaderWrapper';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Footer from '@/components/shared/footer/Footer';
import Clarity from '@/components/shared/Clarity';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import MetaPixel from '@/components/shared/MetaPixel';
import { AppContextProvider } from '@/context/AppContext';
import { interTight } from '@/utils/font';
import { generateMetadata } from '@/utils/generateMetaData';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <AppContextProvider>
          <Suspense>
            <SmoothScrollProvider>
              <HeaderWrapper />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </Suspense>
        </AppContextProvider>
        <Analytics />
        <Clarity />
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  );
}
