// crypto marketing mobile menu
'use client';
import Logo from '@/components/shared/Logo';
import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import MenuCloseButton from './MenuCloseButton';
import MobileMenuItem from './MobileMenuItem';

export interface MobileMenuItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileMenuGroup {
  id: string;
  title: string;
  href?: string; // Optional: for direct links without submenu
  submenu?: MobileMenuItem[]; // Made optional
}

const MobileMenu = ({ menuData }: { menuData: MobileMenuGroup[] }) => {
  const { isOpen, closeMenu } = useMobileMenuContext();

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <aside
      className={cn(
        'dark:bg-background-8 scroll-bar fixed top-0 right-0 z-[9999] h-screen w-full translate-x-full bg-white transition-all duration-300 sm:w-1/2 sm:rounded-t-2xl sm:rounded-l-3xl xl:hidden',
        isOpen ? 'translate-x-0 opacity-100 md:translate-x-[8%]' : 'translate-x-full opacity-0',
      )}>
      <div className="p-6 sm:p-8 lg:p-9">
        <div className="flex items-start justify-between mb-8">
          <div onClick={handleLinkClick} className="cursor-pointer">
            <Logo variant="full" size="sm" />
          </div>
          {/* close btn  */}
          <MenuCloseButton />
        </div>

        {/* menu items list  */}
        <div className="scroll-bar h-[calc(100vh-120px)] w-full overflow-x-hidden pb-10">
          <p className="text-secondary/60 dark:text-accent/60 text-caption-1 before:bg-stroke-4 dark:before:bg-stroke-6 relative mb-4 block font-medium uppercase tracking-wider before:absolute before:top-1/2 before:-right-16 before:h-px before:w-full before:-translate-y-1/2 before:content-['']">
            Menu
          </p>
          <ul className="space-y-2">
            {menuData.map((item) => (
              // If item has no submenu, render as direct link
              item.submenu && item.submenu.length > 0 ? (
                <MobileMenuItem key={item.id} id={item.id} title={item.title} hasSubmenu={true}>
                  {/* submenu items list  */}
                  <ul className="space-y-1.5">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.href}
                          onClick={handleLinkClick}
                          className="text-body-2 text-secondary/70 dark:text-accent/70 hover:text-primary-500 dark:hover:text-primary-500 ml-6 block py-2 text-left transition-all duration-200 hover:translate-x-0.5">
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileMenuItem>
              ) : (
                <li key={item.id}>
                  <Link
                    href={item.href || '/'}
                    onClick={handleLinkClick}
                    className="text-secondary dark:text-accent hover:text-primary-500 dark:hover:text-primary-500 text-body-1 block py-2.5 text-left font-medium transition-all duration-200 hover:translate-x-0.5">
                    {item.title}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;
