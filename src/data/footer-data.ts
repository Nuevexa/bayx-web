import { FooterData } from '@/interface';

export const footerLinks: FooterData[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Early Access', href: '/early-access' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Help Center', href: '/support' },
      { label: 'Material Shortfall Calculator', href: '/insurance-material-shortfall-calculator' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  },
];
