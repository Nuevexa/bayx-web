import { MobileMenuGroup } from '@/components/shared/mobile-menu/MobileMenu';
import { FooterOneData } from '@/interface';

export const mobileMenuData: MobileMenuGroup[] = [
  {
    id: 'features',
    title: 'Features',
    submenu: [
      { id: 'job-board', label: 'Job Board', href: '/features/job-board' },
      { id: 'profitability', label: 'Profitability Analytics', href: '/features/profitability-analytics' },
      { id: 'customer-portal', label: 'Customer Portal', href: '/features/customer-portal' },
      { id: 'technician-portal', label: 'Technician Portal', href: '/features/technician-portal' },
      { id: 'estimates', label: 'Estimates & Approvals', href: '/features/estimates-approvals' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    submenu: [
      { id: 'calculator', label: 'Insurance Material Shortfall Calculator', href: '/insurance-material-shortfall-calculator' },
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
      { id: 'early-access', label: 'Join Early Access', href: '/early-access' },
      // { id: 'login', label: 'Login', href: '/early-access' },
    ],
  },
];

export const footerData: FooterOneData[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Customer Portal', href: '/features/customer-portal' },
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
      { label: 'Terms of Service', href: '/terms-conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  },
];
