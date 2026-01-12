'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface MobileMenuItemProps {
  id: string;
  title: string;
  children?: ReactNode;
  hasSubmenu?: boolean;
}

const MobileMenuItem = ({ id, title, children, hasSubmenu = false }: MobileMenuItemProps) => {
  const { activeSubmenu, toggleSubmenu } = useMobileMenuContext();

  const isActive = activeSubmenu === id;

  const handleToggle = () => {
    if (hasSubmenu) {
      toggleSubmenu(id);
    }
  };

  return (
    <li className="space-y-2">
      <button
        onClick={handleToggle}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between py-2.5 px-0 transition-all duration-200 hover:translate-x-0.5',
          isActive && 'translate-x-0.5'
        )}
        aria-expanded={hasSubmenu ? isActive : undefined}
        aria-controls={hasSubmenu ? `submenu-${id}` : undefined}>
        <span
          className={cn(
            'text-body-1 ease block font-medium transition-colors duration-300',
            isActive ? 'text-secondary dark:text-accent' : 'text-secondary dark:text-accent',
          )}>
          {title}
        </span>
        {hasSubmenu && (
          <span
            className={cn(
              'stroke-secondary dark:stroke-accent size-5 transition-transform duration-300 ease-in-out',
              isActive && 'rotate-90',
            )}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L12 8L8 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>

      {/* show submenu parent  */}
      {hasSubmenu && children && (
        <div
          id={`submenu-${id}`}
          className={cn(
            'ml-0 w-full overflow-y-hidden transition-[height,opacity] duration-300 ease-in-out',
            isActive ? 'pointer-events-auto h-fit opacity-100' : 'pointer-events-none h-0 opacity-0',
          )}>
          {/* render submenu  */}
          {children}
        </div>
      )}
    </li>
  );
};

MobileMenuItem.displayName = 'MobileMenuItem';
export default MobileMenuItem;
