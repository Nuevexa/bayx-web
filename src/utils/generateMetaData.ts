import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://getbayx.com';
export const DEFAULT_TITLE = 'BayX - Garage Management Software';
export const DEFAULT_DESCRIPTION =
  'BayX is the all-in-one garage management software for independent auto repair shops. Streamline operations, boost profits, and manage jobs, estimates, and invoices with ease.';
export const DEFAULT_IMAGE_URL = '/bayx-logo.png';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'garage management software',
    'auto repair software',
    'mechanic shop software',
    'automotive POS',
    'shop management system',
  ],
  openGraph: {
    type: 'website',
    siteName: 'BayX',
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE_URL],
  },
  other: {
    'theme-color': '#0f766e',
  },
};

const generateMetadata = (title?: string, description?: string, canonicaUrl?: string, imageUrl?: string): Metadata => {
  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ?? defaultMetadata.openGraph?.title,
      description: description ?? defaultMetadata.openGraph?.description,
      url: canonicaUrl ?? defaultMetadata.openGraph?.url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { defaultMetadata, generateMetadata };
