'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import { useState, FormEvent } from 'react';
import { Loader2, Check } from 'lucide-react';
import Link from 'next/link';

interface CtaInputFormProps {
  ctaBtnText?: string;
  inputFieldClass?: string;
}

const CtaInputForm = ({ ctaBtnText = 'Get Started', inputFieldClass }: CtaInputFormProps) => {
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email sanitization
  const sanitizeEmail = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/['";\\]/g, '')
      .replace(/script/gi, '')
      .slice(0, 100);
  };

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setTermsError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!agreedToTerms) {
      setTermsError('You must agree to the Terms and Privacy Policy');
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setError(null);

    // Validate
    if (!validateForm()) {
      return;
    }

    // Show loading
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Success
      setIsSuccess(true);
      setEmail('');
      setAgreedToTerms(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <RevealAnimation delay={0.4}>
        <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
          <div className="bg-primary-500/10 flex size-16 items-center justify-center rounded-full">
            <Check className="text-primary-500 size-8" strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold">
              You're subscribed!
            </h3>
            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
              Thank you for subscribing. We'll be in touch soon.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-primary-500 hover:text-primary-600 text-tagline-2 font-medium underline"
          >
            Subscribe another email
          </button>
        </div>
      </RevealAnimation>
    );
  }

  return (
    <RevealAnimation delay={0.4}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-start gap-3"
        aria-label="cta-form"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial">
            <input
              type="email"
              name="email"
              id="userEmail"
              value={email}
              onChange={(e) => {
                const sanitized = sanitizeEmail(e.target.value);
                setEmail(sanitized);
                if (emailError) setEmailError('');
              }}
              disabled={isSubmitting}
              placeholder="Enter your email"
              className={cn(
                'placeholder:text-secondary/50 border-stroke-1 dark:border-stroke-7 dark:placeholder:text-accent/60 text-secondary dark:text-accent focus-visible:outline-stroke-7 focus:border-primary-600 dark:focus:border-primary-400 h-12.5 w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none focus-visible:outline-1 md:w-[430px] lg:w-[440px] disabled:opacity-60 disabled:cursor-not-allowed',
                inputFieldClass,
                emailError ? 'border-red-500 dark:border-red-400' : ''
              )}
              aria-label="cta-input"
            />
            {emailError && (
              <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1 px-[18px]">{emailError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="group/btn-v2 inline-block h-12 w-full md:w-auto rounded-full transition-transform duration-500 ease-in-out">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'btn-lg-v2 btn-primary-v2 group-hover/btn-v2:btn-secondary-v2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full text-center font-medium text-nowrap lowercase transition-all duration-500 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed md:h-auto md:w-auto'
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span className="first-letter:uppercase">Submitting...</span>
                </span>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="w-full md:w-auto">
          <div className="flex items-start gap-2 justify-center md:justify-start">
            <label htmlFor="newsletter-terms" className="flex items-center gap-x-2 mt-0.5">
              <input
                id="newsletter-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (termsError) setTermsError('');
                }}
                disabled={isSubmitting}
                className="peer sr-only"
              />
              <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-4 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
            </label>
            <label htmlFor="newsletter-terms" className="text-tagline-3 text-secondary/70 dark:text-accent/70 cursor-pointer text-left">
              I agree to the{' '}
              <Link
                href="/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 underline"
              >
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {termsError && (
            <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1 text-center md:text-left">{termsError}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full md:w-auto bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg border p-2">
            <p className="text-tagline-3 text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        )}
      </form>
    </RevealAnimation>
  );
};

CtaInputForm.displayName = 'CtaInputForm';

export default CtaInputForm;
