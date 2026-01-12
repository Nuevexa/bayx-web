import { cn } from '@/utils/cn';
import bayxLogo from '@public/images/shared/bayx-logo.svg';
import logoIcon from '@public/images/shared/logo.svg';
import logoIconDark from '@public/images/shared/logo-dark.svg';
import Image from 'next/image';
import Link from 'next/link';

export type LogoVariant = 'full' | 'icon';
export type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  /**
   * Logo variant - 'full' shows the complete logo with text, 'icon' shows only the icon
   * @default 'full'
   */
  variant?: LogoVariant;
  /**
   * Logo size
   * @default 'md'
   */
  size?: LogoSize;
  /**
   * Whether to link to homepage
   * @default true
   */
  linkToHome?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show the responsive version (full on desktop, icon on mobile)
   * @default false
   */
  responsive?: boolean;
}

const sizeClasses: Record<LogoSize, { full: string; icon: string }> = {
  sm: {
    full: 'max-w-[160px]',
    icon: 'max-w-[36px]',
  },
  md: {
    full: 'max-w-[198px]',
    icon: 'max-w-[44px]',
  },
  lg: {
    full: 'max-w-[240px]',
    icon: 'max-w-[52px]',
  },
};

/**
 * Logo Component
 *
 * A reusable logo component that supports multiple variants and sizes.
 * Automatically handles dark mode with appropriate styling.
 *
 * @example
 * ```tsx
 * // Full logo (default)
 * <Logo />
 *
 * // Icon only
 * <Logo variant="icon" />
 *
 * // Large size
 * <Logo size="lg" />
 *
 * // Responsive (full on desktop, icon on mobile)
 * <Logo responsive />
 *
 * // Custom styling
 * <Logo className="my-custom-class" />
 *
 * // Without home link
 * <Logo linkToHome={false} />
 * ```
 */
export const Logo = ({ variant = 'full', size = 'md', linkToHome = true, className, responsive = false }: LogoProps) => {
  const LogoContent = () => {
    if (responsive) {
      return (
        <>
          {/* Desktop: Full Logo */}
          <figure className={cn('hidden lg:block', sizeClasses[size].full, className)}>
            <Image src={bayxLogo} alt="BayX" className="w-full h-auto dark:invert" priority />
          </figure>
          {/* Mobile: Icon Only */}
          <figure className={cn('block lg:hidden', sizeClasses[size].icon)}>
            <Image src={logoIcon} alt="BayX" className="block w-full dark:hidden" priority />
            <Image src={logoIconDark} alt="BayX" className="hidden w-full dark:block" priority />
          </figure>
        </>
      );
    }

    if (variant === 'icon') {
      return (
        <figure className={cn(sizeClasses[size].icon, className)}>
          <Image src={logoIcon} alt="BayX" className="block w-full dark:hidden" priority />
          <Image src={logoIconDark} alt="BayX" className="hidden w-full dark:block" priority />
        </figure>
      );
    }

    return (
      <figure className={cn(sizeClasses[size].full, className)}>
        <Image src={bayxLogo} alt="BayX" className="w-full h-auto dark:invert" priority />
      </figure>
    );
  };

  if (linkToHome) {
    return (
      <Link href="/" aria-label="BayX Home">
        <span className="sr-only">BayX Home</span>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

Logo.displayName = 'Logo';
export default Logo;
