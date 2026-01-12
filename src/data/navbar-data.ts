import { MobileMenuGroup } from '@/components/shared/mobile-menu/MobileMenu';
import { FooterOneData } from '@/interface';

export const mobileMenuData: MobileMenuGroup[] = [
  {
    id: 'features',
    title: 'Features',
    submenu: [
      { id: 'job-board', label: 'Job Board', href: '/services/job-board' },
      { id: 'profitability', label: 'Profitability Analytics', href: '/services/profitability-analytics' },
      { id: 'customer-portal', label: 'Customer Portal', href: '/services/customer-portal' },
      { id: 'technician-portal', label: 'Technician Portal', href: '/services/technician-portal' },
      { id: 'estimates', label: 'Estimates & Invoices', href: '/services/estimates-invoices' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing',
    href: '/pricing',
  },
  {
    id: 'resources',
    title: 'Resources',
    submenu: [
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'help-center', label: 'Help Center', href: '/support' },
      { id: 'faq', label: 'FAQ', href: '/faq' },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    submenu: [
      { id: 'login', label: 'Login', href: 'https://bayx.app/auth/login' },
      { id: 'signup', label: 'Start Free Trial', href: 'https://bayx.app/auth/signup' },
    ],
  },
];

export const footerData: FooterOneData[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Customer Portal', href: '/services/customer-portal' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/support' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  },
];
