'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const SocialShareSection = () => {
    const shareUrl = 'https://getbayx.com/insurance-material-shortfall-calculator';
    const shareTitle = 'Calculate Your Insurance Material Shortfall';
    const shareText = 'Are you subsidising insurance company profits? Use this free calculator to discover how much you\'re losing on paint \u0026 materials.';

    const shareToLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToX = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        // Could add a toast notification here
    };

    return (
        <section className="py-[60px] md:py-[100px] bg-background-1 dark:bg-background-6">
            <div className="main-container">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium mb-4">
                        Help Other Shops Expose Insurance Underpayments
                    </h2>

                    <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 mb-8">
                        Share this calculator with colleagues to help them understand how much they're losing
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={shareToLinkedIn}
                            className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                            <Linkedin className="size-5" />
                            <span>Share on LinkedIn</span>
                        </button>

                        <button
                            onClick={shareToX}
                            className="flex items-center gap-2 bg-[#000000] hover:bg-[#333333] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                            <span>Share on 𝕏</span>
                        </button>

                        <button
                            onClick={shareToFacebook}
                            className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#0c63d4] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                            <Facebook className="size-5" />
                            <span>Share on Facebook</span>
                        </button>

                        <button
                            onClick={copyLink}
                            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white dark:bg-accent dark:hover:bg-accent/90 dark:text-secondary px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy Link</span>
                        </button>
                    </div>

                    <div className="mt-8 bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7">
                        <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                            💡 <strong className="text-secondary dark:text-accent">Pro Tip:</strong> Share your results screenshot on LinkedIn to start conversations with other shop owners about DRP negotiations
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialShareSection;
