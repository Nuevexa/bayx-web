import { cn } from '@/utils/cn';
import bayxLogo from '@public/bayx-logo.svg';
import bayxLogoWhite from '@public/bayx-logo-white.svg';
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
  /**
   * Use white logo variant (for dark backgrounds like footer)
   * @default false
   */
  useWhiteLogo?: boolean;
}

const sizeClasses: Record<LogoSize, { full: string; icon: string }> = {
  sm: {
    full: 'max-w-[120px]',
    icon: 'max-w-[32px]',
  },
  md: {
    full: 'max-w-[150px]',
    icon: 'max-w-[40px]',
  },
  lg: {
    full: 'max-w-[180px]',
    icon: 'max-w-[48px]',
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
 *
 * // White logo for dark backgrounds (footer)
 * <Logo useWhiteLogo />
 * ```
 */
export const Logo = ({ variant = 'full', size = 'md', linkToHome = true, className, responsive = false, useWhiteLogo = false }: LogoProps) => {
  const logoSrc = useWhiteLogo ? bayxLogoWhite : bayxLogo;
  const logoClasses = useWhiteLogo ? 'w-full h-auto' : 'w-full h-auto dark:invert';

  const LogoContent = () => {
    if (responsive) {
      return (
        <>
          {/* Desktop: Full Logo */}
          <figure className={cn('hidden lg:block', sizeClasses[size].full, className)}>
            <Image src={logoSrc} alt="BayX" className={logoClasses} priority />
          </figure>
          {/* Mobile: Icon Only */}
          <figure className={cn('block lg:hidden', sizeClasses[size].icon)}>
            <Image src="/icon.svg" alt="BayX" width={44} height={44} className="w-full h-auto" priority />
          </figure>
        </>
      );
    }

    if (variant === 'icon') {
      return (
        <figure className={cn(sizeClasses[size].icon, className)}>
          <Image src="/icon.svg" alt="BayX" width={44} height={44} className="w-full h-auto" priority />
        </figure>
      );
    }

    return (
      <figure className={cn(sizeClasses[size].full, className)}>
        <Image src={logoSrc} alt="BayX" className={logoClasses} priority />
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
