'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { LeadFormData } from './types';

interface LeadCaptureModalProps {
    isOpen: boolean;
    isProcessing: boolean;
    onSubmit: (data: LeadFormData) => Promise<void>;
    onClose: () => void;
}

interface FormErrors {
    name?: string;
    email?: string;
    agreedToTerms?: string;
}

const LeadCaptureModal = ({ isOpen, isProcessing, onSubmit, onClose }: LeadCaptureModalProps) => {
    const [formData, setFormData] = useState<LeadFormData>({
        name: '',
        email: '',
        agreedToTerms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    if (!isOpen) return null;

    const sanitizeInput = (input: string): string => {
        return input
            .trim()
            .replace(/[<>]/g, '')
            .replace(/['";\\]/g, '')
            .replace(/script/gi, '')
            .slice(0, 200);
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.agreedToTerms) {
            newErrors.agreedToTerms = 'You must agree to continue';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);

        setFormData((prev) => ({
            ...prev,
            [name]: sanitizedValue,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        await onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[20px] bg-white dark:bg-background-8 p-6 shadow-6 lg:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className="absolute top-4 right-4 text-secondary/40 hover:text-secondary dark:text-accent/40 dark:hover:text-accent transition-colors disabled:opacity-50"
                    aria-label="Close modal"
                >
                    <X className="size-5" />
                </button>

                {/* Header */}
                <div className="mb-6 space-y-2 text-center">
                    <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold">
                        One Last Step
                    </h3>
                    <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                        Enter your details to see your personalized results
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <fieldset className="space-y-2">
                        <label htmlFor="lead-name" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                            Your name <span className="text-primary-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="lead-name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isProcessing}
                            placeholder="John Doe"
                            className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1 block h-12 w-full rounded-lg border px-[18px] py-3 font-normal focus:ring-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {errors.name && (
                            <p className="text-tagline-3 text-primary-500">{errors.name}</p>
                        )}
                    </fieldset>

                    {/* Email */}
                    <fieldset className="space-y-2">
                        <label htmlFor="lead-email" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                            Email address <span className="text-primary-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="lead-email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isProcessing}
                            placeholder="john@example.com"
                            className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 dark:text-accent placeholder:text-secondary/60 dark:placeholder:text-accent/60 shadow-1 block h-12 w-full rounded-lg border px-[18px] py-3 font-normal focus:ring-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {errors.email && (
                            <p className="text-tagline-3 text-primary-500">{errors.email}</p>
                        )}
                    </fieldset>

                    {/* Terms Agreement */}
                    <fieldset className="space-y-2">
                        <div className="flex items-start gap-3">
                            <label htmlFor="lead-agree-terms" className="flex items-center gap-x-3">
                                <input
                                    id="lead-agree-terms"
                                    type="checkbox"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))}
                                    disabled={isProcessing}
                                    className="peer sr-only"
                                />
                                <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-4 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
                            </label>
                            <label htmlFor="lead-agree-terms" className="text-tagline-3 text-secondary/70 dark:text-accent/70 cursor-pointer">
                                I agree to the{' '}
                                <Link href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                                    Terms
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.agreedToTerms && (
                            <p className="text-tagline-3 text-primary-500">{errors.agreedToTerms}</p>
                        )}
                    </fieldset>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn btn-md btn-secondary-v2 w-full first-letter:uppercase before:content-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="size-5 animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            'View My Results'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LeadCaptureModal;
