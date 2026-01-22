'use client';

import homeIcon from '@public/images/icons/home.svg';
import mailIcon from '@public/images/icons/mail-open.svg';
import phoneIcon from '@public/images/icons/phone-right.svg';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const contactInfoItems = [
  {
    id: 1,
    icon: homeIcon,
    title: 'Our Address',
    content: 'Remote-First Company',
  },
  {
    id: 2,
    icon: mailIcon,
    title: 'Email Us',
    content: 'support@bayx.app',
    link: 'mailto:support@bayx.app',
  },
  {
    id: 3,
    icon: phoneIcon,
    title: 'Response Time',
    content: 'Within 24 hours',
  },
];

interface FormData {
  fullname: string;
  number: string;
  email: string;
  subject: string;
  message: string;
  agreedToTerms: boolean;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface FormErrors {
  [key: string]: string;
}

const ContactInfo = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    number: '',
    email: '',
    subject: '',
    message: '',
    agreedToTerms: false,
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change - no sanitization for smooth typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await fetch('/api/make/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      setFormData({
        fullname: '',
        number: '',
        email: '',
        subject: '',
        message: '',
        agreedToTerms: false,
      });
    } catch (error: any) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section
      className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-20 xl:pt-[180px] xl:pb-[100px]"
      aria-label="Contact Information and Form">
      <div className="main-container">
        <div className="space-y-[70px]">
          {/* heading */}
          <div className="mx-auto max-w-[680px] space-y-3 text-center">
            <RevealAnimation delay={0.2}>
              <h2>Get in touch with BayX</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p>
                Have a question about BayX? Need help getting started? Our support team is here to help you get the most out of your garage management software.
              </p>
            </RevealAnimation>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-start lg:gap-8 xl:gap-[70px]">
            {/* contact info cards */}
            <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
              {contactInfoItems.map((item) => (
                <RevealAnimation key={item.id} delay={0.4}>
                  <div className="bg-primary-500 dark:bg-primary-600 relative w-full space-y-6 overflow-hidden rounded-[20px] p-11 text-center md:max-w-[371px]">
                    <figure className="mx-auto size-10 overflow-hidden">
                      <Image src={item.icon} alt={`${item.title} icon`} className="size-full object-cover" />
                    </figure>
                    <div className="space-y-2.5">
                      <p className="text-heading-6 text-accent">{item.title}</p>
                      {item.link ? (
                        <p className="text-accent/60">
                          <Link href={item.link}>{item.content}</Link>
                        </p>
                      ) : (
                        <p className="text-accent/60">{item.content}</p>
                      )}
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
            {/* contact form */}
            <RevealAnimation delay={0.3} className="dark:bg-background-6 mx-auto w-full max-w-[847px] rounded-4xl bg-white p-6 md:p-8 lg:p-11">
              <div className="min-h-[600px] flex flex-col justify-center">
                {formState.isSuccess ? (
                  <div className="space-y-6 text-center">
                    <div className="bg-primary-500/10 mx-auto flex size-20 items-center justify-center rounded-full">
                      <Check className="text-primary-500 size-10" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold">Message Sent!</h3>
                      <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* name and phone */}
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                      <div className="w-full space-y-2 lg:max-w-[364px]">
                        <label htmlFor="fullname" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                          Your name <span className="text-primary-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          placeholder="Enter your name"
                          autoComplete="name"
                          className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none xl:h-[41px] disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {errors.fullname && <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.fullname}</p>}
                      </div>
                      <div className="w-full max-w-[364px] space-y-2">
                        <label htmlFor="number" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                          Your number <span className="text-secondary/50 dark:text-accent/50 text-tagline-3 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="number"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          placeholder="Enter your number"
                          autoComplete="tel"
                          className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none xl:h-[41px] disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    {/* email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                        Email address <span className="text-primary-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none xl:h-[41px] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      {errors.email && <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.email}</p>}
                    </div>
                    {/* subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                        Subject <span className="text-primary-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        placeholder="Enter your subject"
                        className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none xl:h-[41px] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      {errors.subject && <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.subject}</p>}
                    </div>
                    {/* message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                        Write message <span className="text-primary-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        placeholder="Enter your messages"
                        className="dark:bg-background-6 dark:border-stroke-7 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary dark:focus-visible:border-stroke-4/20 placeholder:text-tagline-2 dark:placeholder:text-accent/60 dark:text-accent w-full rounded-xl border px-[18px] py-3 font-normal placeholder:font-normal focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      {errors.message && <p className="text-tagline-3 text-red-500 dark:text-red-400">{errors.message}</p>}
                    </div>
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

                    {/* Error message */}
                    {formState.error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 rounded-lg border p-3">
                        <p className="text-tagline-2 text-red-600 dark:text-red-400 text-center">{formState.error}</p>
                      </div>
                    )}

                    {/* submit button */}
                    <button
                      type="submit"
                      disabled={formState.isSubmitting}
                      className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none disabled:opacity-60 disabled:cursor-not-allowed !inline-flex !flex-row items-center justify-center whitespace-nowrap">
                      {formState.isSubmitting ? (
                        <>
                          <Loader2 className="size-5 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
