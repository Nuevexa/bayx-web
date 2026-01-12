'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import Logo from '@/components/shared/Logo';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { mobileMenuData } from '@/data/navbar-data';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import FeaturesMenu from './FeaturesMenu';
import MobileMenuButton from './MobileMenuButton';
import ResourcesMenu from './ResourcesMenu';

const Navbar = ({ showTopNav }: { showTopNav: boolean }) => {
  const { isScrolled } = useNavbarScroll(150);

  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };
  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 ease-in-out max-[400px]:max-w-[350px] min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          showTopNav ? 'top-13.5' : 'top-5',
          isScrolled && 'top-2',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div className="dark:bg-background-7 flex items-center justify-between rounded-full bg-white/60 px-2.5 py-2.5 backdrop-blur-[25px] xl:py-0">
            <Logo responsive size="md" />
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center">
                {/* Features Dropdown */}
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="features-dropdown-menu"
                  onMouseEnter={() => handleMenuHover('features-dropdown-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <Link
                    href="/features"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Features</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </Link>
                  <FeaturesMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                {/* Pricing - Direct Link */}
                <li className="nav-item relative cursor-pointer py-2.5">
                  <Link
                    href="/pricing"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Pricing</span>
                  </Link>
                </li>
                {/* Resources Dropdown */}
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="resources-dropdown-menu"
                  onMouseEnter={() => handleMenuHover('resources-dropdown-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <Link
                    href="/blog"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Resources</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </Link>
                  <ResourcesMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
              </ul>
            </nav>
            {/* Right side: Login + Start Free Trial */}
            <div className="hidden items-center justify-center gap-2 xl:flex">
              <Link
                href="https://bayx.app/auth/login"
                className="text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent px-4 py-2 font-normal transition-all duration-200">
                Login
              </Link>
              <LinkButton href="https://bayx.app/auth/signup" btnClass="btn-md-v2 btn-secondary-v2 border group-hover/btn-v2:btn-v2-white">
                Start Free Trial
              </LinkButton>
            </div>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
