'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import bayxLogo from '@public/bayx-logo.svg';
import '@/styles/rotated-background.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  agreedToTerms?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const EarlyAccessHero = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Input sanitization - prevent XSS and SQL injection attempts
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"`;\\]/g, '') // Remove SQL injection attempts
      .replace(/script/gi, '') // Remove script tags
      .slice(0, 200); // Limit length
  };

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Phone validation (optional field, but validate if provided)
  const isValidPhone = (phone: string): boolean => {
    if (!phone) {
      return true;
    } // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Garage Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Garage name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Garage name must be at least 2 characters';
    }

    // Terms and Privacy Policy validation
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change - no sanitization for smooth typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous state
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Optimistic UI - show loading state immediately
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      // Sanitize data once before submission (not on every keystroke)
      const sanitizedData = {
        fullName: sanitizeInput(formData.fullName),
        email: sanitizeInput(formData.email),
        phone: formData.phone ? sanitizeInput(formData.phone) : '',
        companyName: sanitizeInput(formData.companyName),
        agreedToTerms: formData.agreedToTerms,
      };

      // Call Make.com webhook route
      const response = await fetch('/api/make/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      // Success state
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      // Reset form after success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        agreedToTerms: false,
      });

      // Track form submission in GA
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'early_access_form'
        });
      }
    } catch (error: any) {
      // Error state
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section className="pt-[120px] pb-[70px] lg:pt-[180px] lg:pb-[100px]">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div
            className="rotated-background mx-auto w-full max-w-[866px] overflow-hidden rounded-4xl sm:p-[70px]"
          >
            <RevealAnimation delay={0.1}>
              <div className="bg-background-1 dark:bg-background-6 max-w-[480px] rounded-[20px] px-8 py-14 min-h-[600px] flex flex-col justify-center">
                {formState.isSuccess ? (
                  <div className="space-y-6 text-center">
                    <div className="bg-primary-500/10 mx-auto flex size-20 items-center justify-center rounded-full">
                      <Check className="text-primary-500 size-10" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold">
                        You're on the list!
                      </h3>
                      <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                        Thank you for your interest in BayX. We'll reach out soon with exclusive early access details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-8 space-y-4 text-center">
                      <div className="flex justify-center">
                        <Image src={bayxLogo} alt="BayX Logo" className="h-auto w-auto max-w-[220px]" priority />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-heading-5 text-secondary dark:text-accent font-semibold">
                          Join Early Access
                        </h2>
                        <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                          Be among the first to experience BayX garage management software.
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Full Name */}
                      <fieldset className="space-y-2">
                        <label
                          htmlFor="fullName"
                          className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                          Full Name <span className="text-primary-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          className="auth-form-input disabled:opacity-60 disabled:cursor-not-allowed"
                          placeholder="John Doe"
                          autoComplete="name"
                        />
                        {errors.fullName && (
                          <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1">{errors.fullName}</p>
                        )}
                      </fieldset>

                      {/* Email */}
                      <fieldset className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                          Email Address <span className="text-primary-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          className="auth-form-input disabled:opacity-60 disabled:cursor-not-allowed"
                          placeholder="john@garage.com"
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1">{errors.email}</p>
                        )}
                      </fieldset>

                      {/* Phone (Optional) */}
                      <fieldset className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                          Phone Number{' '}
                          <span className="text-secondary/50 dark:text-accent/50 text-tagline-3 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          className="auth-form-input disabled:opacity-60 disabled:cursor-not-allowed"
                          placeholder="+1 (555) 123-4567"
                          autoComplete="tel"
                        />
                        {errors.phone && (
                          <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>
                        )}
                      </fieldset>

                      {/* Garage Name */}
                      <fieldset className="space-y-2">
                        <label
                          htmlFor="companyName"
                          className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                          Garage Name <span className="text-primary-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          className="auth-form-input disabled:opacity-60 disabled:cursor-not-allowed"
                          placeholder="Your Garage Name"
                          autoComplete="organization"
                        />
                        {errors.companyName && (
                          <p className="text-tagline-3 text-red-500 dark:text-red-400 mt-1">{errors.companyName}</p>
                        )}
                      </fieldset>

                      {/* Terms and Privacy Policy Agreement */}
                      <fieldset className="space-y-2">
                        <div className="flex items-start gap-3">
                          <label htmlFor="agreedToTerms" className="flex items-center gap-x-3">
                            <input
                              id="agreedToTerms"
                              type="checkbox"
                              checked={formData.agreedToTerms}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))
                              }
                              disabled={formState.isSubmitting}
                              className="peer sr-only"
                            />
                            <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-4 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
                          </label>
                          <label
                            htmlFor="agreedToTerms"
                            className="text-tagline-3 text-secondary/70 dark:text-accent/70 cursor-pointer"
                          >
                            I agree to the{' '}
                            <a
                              href="/terms-conditions"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-500 hover:text-primary-600 underline"
                            >
                              Terms of Service
                            </a>
                            {' '}and{' '}
                            <a
                              href="/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-500 hover:text-primary-600 underline"
                            >
                              Privacy Policy
                            </a>
                            <span className="text-primary-500"> *</span>
                          </label>
                        </div>
                        {errors.agreedToTerms && (
                          <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.agreedToTerms}</p>
                        )}
                      </fieldset>

                      {/* Error Message */}
                      {formState.error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg border p-3">
                          <p className="text-tagline-2 text-red-600 dark:text-red-400 text-center">{formState.error}</p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-3">
                        <button
                          type="submit"
                          disabled={formState.isSubmitting}
                          className="btn btn-md btn-primary disabled:opacity-60 disabled:cursor-not-allowed w-full capitalize before:content-none !inline-flex !flex-row items-center justify-center min-w-[200px] whitespace-nowrap">
                          {formState.isSubmitting ? (
                            <>
                              <Loader2 className="size-5 animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            'Request Early Access'
                          )}
                        </button>
                      </div>


                    </form>
                  </>
                )}
              </div>
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

EarlyAccessHero.displayName = 'EarlyAccessHero';
export default EarlyAccessHero;
