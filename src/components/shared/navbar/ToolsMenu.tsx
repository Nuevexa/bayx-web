'use client';
import { CalculatorIcon } from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import Link from 'next/link';

type ToolLink = {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const toolLinks: ToolLink[] = [
  {
    label: 'Insurance Material Shortfall Calculator',
    description: 'Calculate your losses from DRP underpayments',
    href: '/insurance-material-shortfall-calculator',
    icon: CalculatorIcon,
  },
];

const ToolsMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);

  return (
    <div>
      <div
        className={cn(
          '0.3 ease ease absolute top-full left-1/2 z-40 h-3 w-[320px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'tools-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="tools-dropdown-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease absolute top-full left-1/2 z-50 mt-2 hidden w-[320px] -translate-x-1/2 rounded-[20px] border bg-white p-3 transition-all duration-300 xl:block dark:border-white/10',
          menuDropdownId === 'tools-dropdown-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <ul className="space-y-1">
          {toolLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={handleClose}
                className="hover:bg-background-3 dark:hover:bg-background-5 flex flex-col rounded-xl px-4 py-3 transition-colors duration-200">
                <span className="text-tagline-1 text-secondary dark:text-accent font-medium">
                  {link.label}
                </span>
                <span className="text-tagline-2 text-secondary/60 dark:text-accent/60">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ToolsMenu.displayName = 'ToolsMenu';
export default ToolsMenu;
