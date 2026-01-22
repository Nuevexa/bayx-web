'use client';

import supportContact from '@public/support-form.jpg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Loader2, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  agreedToTerms?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Input sanitization - prevent XSS and SQL injection
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/['";\\]/g, '') // Remove SQL injection chars
      .replace(/script/gi, '') // Remove script tags
      .slice(0, 500); // Limit length (higher for message field)
  };

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Terms agreement validation
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear error for this field
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

    // Reset state
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });

    // Validate
    if (!validateForm()) {
      return;
    }

    // Show loading
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      // Call Make.com webhook route
      const response = await fetch('/api/make/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      // Success
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        agreedToTerms: false,
      });
    } catch {
      // Error
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section id="contact-form" className="pt-[100px] pb-[100px] md:pb-[200px]">
      <div className="main-container">
        <div className="grid grid-cols-12 max-lg:gap-y-[100px] lg:gap-[100px]">
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-[70px] space-y-5 text-left">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-green">Get in touch</span>
              </RevealAnimation>
              <div className="space-y-3">
                <RevealAnimation delay={0.2}>
                  <h2>Submit a support request</h2>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <p className="max-w-[550px]">
                    Have a question about BayX, need help with setup, or want to request a feature?
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </RevealAnimation>
              </div>
            </div>
            <RevealAnimation delay={0.4}>
              <figure className="w-full overflow-hidden rounded-[20px] lg:max-w-[595px]">
                <Image src={supportContact} className="size-full object-cover" alt="BayX Support" />
              </figure>
            </RevealAnimation>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.5}>
              {formState.isSuccess ? (
                <div className="dark:bg-background-8 rounded-[20px] bg-white p-6 lg:p-[42px]">
                  <div className="space-y-6 text-center">
                    <div className="bg-primary-500/10 mx-auto flex size-20 items-center justify-center rounded-full">
                      <Check className="text-primary-500 size-10" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold">
                        Request Submitted!
                      </h3>
                      <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                        Thank you for contacting us. We'll get back to you within 24 hours.
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
                      className="text-primary-500 hover:text-primary-600 text-tagline-1 font-medium underline transition-colors"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="dark:bg-background-8 rounded-[20px] bg-white p-6 lg:p-[42px]">
                  {/* Name */}
                  <fieldset className="mb-8 space-y-2">
                    <label htmlFor="name" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                      Your name <span className="text-primary-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={formState.isSubmitting}
                      placeholder="Enter your name"
                      className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    {errors.name && (
                      <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.name}</p>
                    )}
                  </fieldset>

                  {/* Email */}
                  <fieldset className="mb-8 space-y-2">
                    <label htmlFor="email" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                      Email address <span className="text-primary-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={formState.isSubmitting}
                      placeholder="Enter your email address"
                      className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 dark:text-accent placeholder:text-secondary/60 dark:placeholder:text-accent/60 shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    {errors.email && (
                      <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.email}</p>
                    )}
                  </fieldset>

                  {/* Subject */}
                  <fieldset className="mb-8 space-y-2">
                    <label htmlFor="subject" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                      Subject <span className="text-primary-500">*</span>
                    </label>
                    <select
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={formState.isSubmitting}
                      className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 text-secondary dark:text-accent shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a topic</option>
                      <option value="setup">Account & Setup</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Report a Bug</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.subject}</p>
                    )}
                  </fieldset>

                  {/* Message */}
                  <fieldset className="mb-4 space-y-2">
                    <label htmlFor="message" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                      Message <span className="text-primary-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={formState.isSubmitting}
                      placeholder="Describe your question or issue..."
                      className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1 block min-h-[115px] w-full rounded-xl border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    {errors.message && (
                      <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.message}</p>
                    )}
                  </fieldset>

                  {/* Terms Agreement */}
                  <fieldset className="mt-4 mb-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <label htmlFor="agree-terms" className="flex items-center gap-x-3">
                        <input
                          id="agree-terms"
                          type="checkbox"
                          checked={formData.agreedToTerms}
                          onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                          disabled={formState.isSubmitting}
                          className="peer sr-only"
                        />
                        <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-4 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
                      </label>
                      <label htmlFor="agree-terms" className="text-tagline-3 text-secondary/70 dark:text-accent/70 cursor-pointer">
                        I agree to the{' '}
                        <Link href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-primary-500 text-tagline-3 underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-500 text-tagline-3 underline">
                          Privacy Policy
                        </Link>
                        <span className="text-primary-500"> *</span>
                      </label>
                    </div>
                    {errors.agreedToTerms && (
                      <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.agreedToTerms}</p>
                    )}
                  </fieldset>

                  {/* Error Message */}
                  {formState.error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg border p-3">
                      <p className="text-tagline-2 text-red-600 dark:text-red-400 text-center">{formState.error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="btn btn-md btn-secondary hover:btn-primary dark:btn-accent w-full first-letter:uppercase before:content-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState.isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
