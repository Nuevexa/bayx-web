'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import bayxLogo from '@public/bayx-logo.svg';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
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
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['";\\]/g, '') // Remove SQL injection attempts
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
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
      // Simulate API call (replace with actual implementation later)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/early-access', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!response.ok) throw new Error('Submission failed');

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
      });

      // TODO: Log submission to analytics/tracking service
      // console.log('Early Access Submission:', formData);
    } catch {
      // Error state
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section className="pt-[120px] pb-[70px] lg:pt-[180px] lg:pb-[100px]">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="mx-auto w-full max-w-[866px] overflow-hidden rounded-4xl bg-cover bg-center bg-no-repeat sm:bg-[url('/images/ns-img-375.jpg')] sm:p-[70px]">
            <RevealAnimation delay={0.1}>
              <div className="bg-background-1 dark:bg-background-6 max-w-[480px] rounded-[20px] px-8 py-14">
                {/* Success Message */}
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
                    <button
                      type="button"
                      onClick={() =>
                        setFormState({
                          isSubmitting: false,
                          isSuccess: false,
                          error: null,
                        })
                      }
                      className="text-primary-500 hover:text-primary-600 text-tagline-1 font-medium underline transition-colors">
                      Submit another request
                    </button>
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
                          className="btn btn-md btn-primary disabled:opacity-60 disabled:cursor-not-allowed w-full capitalize before:content-none">
                          {formState.isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="size-5 animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            'Request Early Access'
                          )}
                        </button>
                      </div>

                      {/* Privacy Note */}
                      <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 text-center">
                        By submitting, you agree to our{' '}
                        <a href="/privacy-policy" className="text-primary-500 hover:text-primary-600 underline">
                          Privacy Policy
                        </a>
                      </p>
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
