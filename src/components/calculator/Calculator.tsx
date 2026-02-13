'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { CalculatorInputs, CalculationResult, LeadFormData } from './types';
import { useCurrencyDetection } from './hooks/useCurrencyDetection';
import LeadCaptureModal from './LeadCaptureModal';
import ResultsModal from './ResultsModal';

const Calculator = () => {
    const { symbol: currencySymbol, isLoading: currencyLoading } = useCurrencyDetection();

    const [unit, setUnit] = useState<'oz' | 'L'>('oz');

    const [inputs, setInputs] = useState<CalculatorInputs>({
        insurancePayout: 150,
        baseCoatAmount: 24,
        baseCoatCost: 10,
        clearCoatAmount: 20,
        clearCoatCost: 8,
        consumablesAmount: 15,
        consumablesCost: 4,
    });

    const [showLeadModal, setShowLeadModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

    // Conversion constants
    const OZ_TO_L = 0.0295735;
    const L_TO_OZ = 33.814;

    // Get display values based on current unit
    const getDisplayAmount = (ozValue: number) => {
        return unit === 'L' ? (ozValue * OZ_TO_L).toFixed(2) : ozValue.toString();
    };

    const getMaxValue = () => {
        return unit === 'L' ? parseFloat((64 * OZ_TO_L).toFixed(2)) : 64;
    };

    const getStepValue = () => {
        return unit === 'L' ? 0.01 : 1;
    };

    const handleUnitToggle = (newUnit: 'oz' | 'L') => {
        if (newUnit === unit) return;

        setUnit(newUnit);
        // Convert costs when switching units
        if (newUnit === 'L') {
            setInputs(prev => ({
                ...prev,
                baseCoatCost: parseFloat((prev.baseCoatCost * L_TO_OZ).toFixed(2)),
                clearCoatCost: parseFloat((prev.clearCoatCost * L_TO_OZ).toFixed(2)),
            }));
        } else {
            setInputs(prev => ({
                ...prev,
                baseCoatCost: parseFloat((prev.baseCoatCost * OZ_TO_L).toFixed(2)),
                clearCoatCost: parseFloat((prev.clearCoatCost * OZ_TO_L).toFixed(2)),
            }));
        }
    };

    const handleAmountChange = (field: 'baseCoatAmount' | 'clearCoatAmount', value: number) => {
        // Always store in oz internally
        const ozValue = unit === 'L' ? Math.round(value * L_TO_OZ) : value;
        setInputs(prev => ({ ...prev, [field]: ozValue }));
    };

    const calculateResults = (): CalculationResult => {
        const baseCoatTotal = inputs.baseCoatAmount * inputs.baseCoatCost;
        const clearCoatTotal = inputs.clearCoatAmount * inputs.clearCoatCost;
        const consumablesTotal = inputs.consumablesAmount * inputs.consumablesCost;
        const actualMaterialCost = baseCoatTotal + clearCoatTotal + consumablesTotal;
        const materialShortfall = inputs.insurancePayout - actualMaterialCost;
        const deficitPercentage = (materialShortfall / actualMaterialCost) * 100;

        return {
            actualMaterialCost,
            materialShortfall,
            deficitPercentage,
            isLoss: materialShortfall < 0,
        };
    };

    const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = calculateResults();
        setCalculationResult(result);
        setShowLeadModal(true);
    };

    const handleLeadSubmit = async (leadData: LeadFormData) => {
        setIsProcessing(true);

        try {
            // Submit to API
            const response = await fetch('/api/calculator/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...leadData,
                    calculationInputs: inputs,
                    calculationResult: calculationResult,
                }),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Track in GA
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'calculator_submit', {
                    event_category: 'engagement',
                    event_label: 'insurance_calculator',
                });
            }

            // Close lead modal, show results
            setShowLeadModal(false);
            setShowResultsModal(true);
        } catch (error) {
            console.error('Lead submission failed:', error);
            // Still show results for better UX
            setShowLeadModal(false);
            setShowResultsModal(true);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="w-full rounded-[20px] bg-white dark:bg-background-8 p-6 shadow-6 lg:p-8">
                <form onSubmit={handleCalculate} className="space-y-6">
                    {/* Unit Toggle */}
                    <div className="flex justify-end">
                        <div className="inline-flex rounded-full bg-background-4 dark:bg-background-6 p-1">
                            <button
                                type="button"
                                onClick={() => handleUnitToggle('oz')}
                                className={`px-4 py-1.5 rounded-full text-tagline-2 font-medium transition-all ${unit === 'oz'
                                    ? 'bg-primary-500 text-white'
                                    : 'text-secondary/60 dark:text-accent/60 hover:text-secondary dark:hover:text-accent'
                                    }`}
                            >
                                oz
                            </button>
                            <button
                                type="button"
                                onClick={() => handleUnitToggle('L')}
                                className={`px-4 py-1.5 rounded-full text-tagline-2 font-medium transition-all ${unit === 'L'
                                    ? 'bg-primary-500 text-white'
                                    : 'text-secondary/60 dark:text-accent/60 hover:text-secondary dark:hover:text-accent'
                                    }`}
                            >
                                L
                            </button>
                        </div>
                    </div>

                    {/* Insurance Payout */}
                    <fieldset className="space-y-2">
                        <label htmlFor="insurance-payout" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                            Insurance Payout for Paint & Materials
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 dark:text-accent/60">
                                {currencyLoading ? '...' : currencySymbol}
                            </span>
                            <input
                                type="number"
                                id="insurance-payout"
                                value={inputs.insurancePayout}
                                onChange={(e) => setInputs((prev) => ({ ...prev, insurancePayout: parseFloat(e.target.value) || 0 }))}
                                className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 dark:text-accent placeholder:text-secondary/60 dark:placeholder:text-accent/60 shadow-1 block h-12 w-full rounded-full border pl-10 pr-4 py-3 font-normal focus:ring-0 focus:outline-none"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </fieldset>

                    {/* Base Coat */}
                    <fieldset className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="base-coat-amount" className="text-tagline-1 text-secondary dark:text-accent font-medium">
                                Base Coat Used
                            </label>
                            <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">
                                {getDisplayAmount(inputs.baseCoatAmount)} {unit}
                            </span>
                        </div>
                        <input
                            type="range"
                            id="base-coat-amount"
                            min="0"
                            max={getMaxValue()}
                            step={getStepValue()}
                            value={unit === 'L' ? parseFloat(getDisplayAmount(inputs.baseCoatAmount)) : inputs.baseCoatAmount}
                            onChange={(e) => handleAmountChange('baseCoatAmount', parseFloat(e.target.value))}
                            className="w-full h-2 bg-background-4 dark:bg-background-6 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex items-center gap-3">
                            <label htmlFor="base-coat-cost" className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Cost per {unit}:
                            </label>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 dark:text-accent/60 text-tagline-2">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    id="base-coat-cost"
                                    value={inputs.baseCoatCost}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, baseCoatCost: parseFloat(e.target.value) || 0 }))}
                                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 text-tagline-2 dark:text-accent shadow-1 block h-10 w-full rounded-full border pl-8 pr-3 py-2 focus:ring-0 focus:outline-none"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Clear Coat */}
                    <fieldset className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="clear-coat-amount" className="text-tagline-1 text-secondary dark:text-accent font-medium">
                                Clear Coat Used
                            </label>
                            <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">
                                {getDisplayAmount(inputs.clearCoatAmount)} {unit}
                            </span>
                        </div>
                        <input
                            type="range"
                            id="clear-coat-amount"
                            min="0"
                            max={getMaxValue()}
                            step={getStepValue()}
                            value={unit === 'L' ? parseFloat(getDisplayAmount(inputs.clearCoatAmount)) : inputs.clearCoatAmount}
                            onChange={(e) => handleAmountChange('clearCoatAmount', parseFloat(e.target.value))}
                            className="w-full h-2 bg-background-4 dark:bg-background-6 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex items-center gap-3">
                            <label htmlFor="clear-coat-cost" className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Cost per {unit}:
                            </label>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 dark:text-accent/60 text-tagline-2">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    id="clear-coat-cost"
                                    value={inputs.clearCoatCost}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, clearCoatCost: parseFloat(e.target.value) || 0 }))}
                                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 text-tagline-2 dark:text-accent shadow-1 block h-10 w-full rounded-full border pl-8 pr-3 py-2 focus:ring-0 focus:outline-none"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Consumables */}
                    <fieldset className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="consumables-amount" className="text-tagline-1 text-secondary dark:text-accent font-medium">
                                Consumables & Materials
                            </label>
                            <span className="text-tagline-1 text-secondary dark:text-accent font-semibold">
                                {inputs.consumablesAmount} units
                            </span>
                        </div>
                        <input
                            type="range"
                            id="consumables-amount"
                            min="0"
                            max="50"
                            value={inputs.consumablesAmount}
                            onChange={(e) => setInputs((prev) => ({ ...prev, consumablesAmount: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-background-4 dark:bg-background-6 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                            Includes masking paper, tape, sandpaper, tack cloths, etc.
                        </p>
                        <div className="flex items-center gap-3">
                            <label htmlFor="consumables-cost" className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Cost per unit:
                            </label>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 dark:text-accent/60 text-tagline-2">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    id="consumables-cost"
                                    value={inputs.consumablesCost}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, consumablesCost: parseFloat(e.target.value) || 0 }))}
                                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 text-tagline-2 dark:text-accent shadow-1 block h-10 w-full rounded-full border pl-8 pr-3 py-2 focus:ring-0 focus:outline-none"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={currencyLoading}
                        className="btn btn-xl btn-secondary-v2 w-full first-letter:uppercase before:content-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {currencyLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="size-5 animate-spin" />
                                Loading...
                            </span>
                        ) : (
                            'Calculate My Loss'
                        )}
                    </button>
                </form>
            </div>

            {/* Modals */}
            <LeadCaptureModal
                isOpen={showLeadModal}
                isProcessing={isProcessing}
                onSubmit={handleLeadSubmit}
                onClose={() => setShowLeadModal(false)}
            />

            <ResultsModal
                isOpen={showResultsModal}
                result={calculationResult}
                inputs={inputs}
                currencySymbol={currencySymbol}
                onClose={() => setShowResultsModal(false)}
            />
        </>
    );
};

export default Calculator;
