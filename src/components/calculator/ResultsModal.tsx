'use client';

import { X, Share2 } from 'lucide-react';
import { CalculationResult, CalculatorInputs } from './types';

interface ResultsModalProps {
    isOpen: boolean;
    result: CalculationResult | null;
    inputs: CalculatorInputs | null;
    currencySymbol: string;
    onClose: () => void;
}

const ResultsModal = ({ isOpen, result, inputs, currencySymbol, onClose }: ResultsModalProps) => {
    if (!isOpen || !result || !inputs) return null;

    const formatCurrency = (amount: number) => {
        return `${currencySymbol}${Math.abs(amount).toFixed(2)}`;
    };

    const shareResults = () => {
        const message = result.isLoss
            ? `I just calculated that insurance companies are making ME pay ${formatCurrency(Math.abs(result.materialShortfall))} out of pocket to paint vehicles. Check your numbers: ${window.location.origin}/insurance-material-shortfall-calculator`
            : `I'm breaking even on paint & materials with my insurance DRP. Calculate your numbers: ${window.location.origin}/insurance-material-shortfall-calculator`;

        if (navigator.share) {
            navigator.share({
                title: 'Insurance Material Shortfall Calculator',
                text: message,
            }).catch(() => {
                // Fallback to clipboard
                navigator.clipboard.writeText(message);
            });
        } else {
            navigator.clipboard.writeText(message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-[20px] bg-white dark:bg-background-8 p-6 shadow-6 lg:p-10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-secondary/40 hover:text-secondary dark:text-accent/40 dark:hover:text-accent transition-colors"
                    aria-label="Close results"
                >
                    <X className="size-6" />
                </button>

                {/* Main Result */}
                <div className="mb-8 text-center">
                    <h2 className={`text-heading-3 mb-4 font-bold ${result.isLoss ? 'text-primary-500' : 'text-ns-green'}`}>
                        {result.isLoss
                            ? `You just paid ${formatCurrency(Math.abs(result.materialShortfall))} out of your own pocket`
                            : "You're breaking even on this job"}
                    </h2>
                    <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                        Your true material deficit is {Math.abs(result.deficitPercentage).toFixed(1)}%
                    </p>
                </div>

                {/* Breakdown */}
                <div className="bg-background-1 dark:bg-background-6 rounded-[16px] p-6 mb-6 space-y-4">
                    <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-4">Breakdown</h3>

                    <div className="flex justify-between items-center pb-3 border-b border-stroke-3 dark:border-stroke-7">
                        <span className="text-tagline-1 text-secondary/70 dark:text-accent/70">Insurance Paid:</span>
                        <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">{formatCurrency(inputs.insurancePayout)}</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-stroke-3 dark:border-stroke-7">
                        <span className="text-tagline-1 text-secondary/70 dark:text-accent/70">Actual Cost:</span>
                        <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">{formatCurrency(result.actualMaterialCost)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">Your {result.isLoss ? 'Loss' : 'Profit'}:</span>
                        <span className={`text-heading-6 font-bold ${result.isLoss ? 'text-primary-500' : 'text-ns-green'}`}>
                            {result.isLoss ? '-' : '+'}{formatCurrency(Math.abs(result.materialShortfall))}
                        </span>
                    </div>
                </div>

                {/* Share Section */}
                <div className="bg-background-1 dark:bg-background-6 rounded-[16px] p-6 mb-6 text-center">
                    <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-4">
                        Share this result to expose insurance underpayments
                    </p>
                    <button
                        onClick={shareResults}
                        className="btn btn-md btn-primary inline-flex items-center gap-2"
                    >
                        <Share2 className="size-4" />
                        Share Results
                    </button>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-tagline-1 text-secondary dark:text-accent mb-4">
                        Want to learn how to fight insurance underpayments?
                    </p>
                    <a
                        href="https://getbayx.com/contact-us"
                        className="btn btn-lg btn-secondary-v2 inline-block"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultsModal;
