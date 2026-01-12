import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface CTAV1Props {
  className?: string;
  badgeClass?: string;
  ctaHeading?: string;
  spanText?: string;
  description?: string;
  ctaBtnText?: string;
  badgeText?: string;
  descriptionClass?: string;
  headingClass?: string;
  ctaLink?: string;
}

const CTAV1 = ({
  className,
  badgeClass,
  ctaHeading,
  spanText,
  description,
  ctaBtnText = 'Start Free Trial',
  badgeText,
  descriptionClass,
  headingClass,
  ctaLink = 'https://bayx.app/auth/signup',
}: CTAV1Props) => {
  return (
    <section className={cn('py-[50px] md:py-20 lg:py-28', className)} aria-label="cta section">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="mx-3 max-w-[649px] space-y-3 sm:mx-0 md:w-full">
            {badgeText && (
              <RevealAnimation delay={0.3}>
                <span className={cn('badge badge-green', badgeClass)}>{badgeText}</span>
              </RevealAnimation>
            )}

            <div className="space-y-3">
              <RevealAnimation delay={badgeText ? 0.4 : 0.3}>
                <h2 className={cn('md:text-heading-2 text-heading-5', headingClass)} aria-label="cta-heading">
                  {ctaHeading}
                  {spanText && <span className="text-primary-500"> {spanText}</span>}
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={badgeText ? 0.5 : 0.4}>
                <p aria-label="cta-description" className={cn(descriptionClass)}>
                  {description}
                </p>
              </RevealAnimation>
            </div>
          </div>

          {/* CTA Button */}
          <RevealAnimation delay={0.5}>
            <div className="group/btn-v2 inline-block rounded-full transition-transform duration-500 ease-in-out">
              <Link
                href={ctaLink}
                className="btn-xl-v2 btn-primary-v2 group-hover/btn-v2:btn-secondary-v2 inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full px-8 text-center font-medium text-nowrap transition-all duration-500 ease-in-out">
                <span className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase">
                  {ctaBtnText}
                </span>
                <div className="relative size-6 overflow-hidden">
                  <span className="btn-v2-icon absolute inset-0 size-6 -translate-x-6 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M11 5H13V7H11V5Z" />
                      <path d="M5 5H7V7H5V5Z" />
                      <path d="M14 8H16V10H14V8Z" />
                      <path d="M8 8H10V10H8V8Z" />
                      <path d="M17 11H19V13H17V11Z" />
                      <path d="M11 11H13V13H11V11Z" />
                      <path d="M14 14H16V16H14V14Z" />
                      <path d="M8 14H10V16H8V14Z" />
                      <path d="M11 17H13V19H11V17Z" />
                      <path d="M5 17H7V19H5V17Z" />
                    </svg>
                  </span>
                  <span className="btn-v2-icon absolute size-6 -translate-x-2 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M11 5H13V7H11V5Z" />
                      <path d="M5 5H7V7H5V5Z" />
                      <path d="M14 8H16V10H14V8Z" />
                      <path d="M8 8H10V10H8V8Z" />
                      <path d="M17 11H19V13H17V11Z" />
                      <path d="M11 11H13V13H11V11Z" />
                      <path d="M14 14H16V16H14V14Z" />
                      <path d="M8 14H10V16H8V14Z" />
                      <path d="M11 17H13V19H11V17Z" />
                      <path d="M5 17H7V19H5V17Z" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default CTAV1;
