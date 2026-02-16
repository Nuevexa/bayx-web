'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useCurrencyDetection } from '@/components/calculator/hooks/useCurrencyDetection';

const ComparisonTableSection = () => {
    const { symbol: currencySymbol } = useCurrencyDetection();

    return (
        <section className="py-[60px] md:py-[100px] bg-background-1 dark:bg-background-6">
            <div className="main-container">
                <div className="max-w-5xl mx-auto">
                    <RevealAnimation delay={0.1}>
                        <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium text-center mb-4">
                            Insurance Rates vs Reality
                        </h2>
                    </RevealAnimation>

                    <RevealAnimation delay={0.2}>
                        <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 text-center mb-12 max-w-3xl mx-auto">
                            See the shocking difference between what insurance companies pay versus actual costs
                        </p>
                    </RevealAnimation>

                    <RevealAnimation delay={0.3}>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-background-8 rounded-[20px] border border-stroke-3 dark:border-stroke-7 overflow-hidden">
                                <thead className="bg-primary-500/10">
                                    <tr>
                                        <th className="text-left p-4 md:p-6 text-heading-6 text-secondary dark:text-accent font-semibold border-b border-stroke-3 dark:border-stroke-7">
                                            Cost Item
                                        </th>
                                        <th className="text-center p-4 md:p-6 text-heading-6 text-secondary dark:text-accent font-semibold border-b border-stroke-3 dark:border-stroke-7">
                                            Insurance Pays
                                        </th>
                                        <th className="text-center p-4 md:p-6 text-heading-6 text-secondary dark:text-accent font-semibold border-b border-stroke-3 dark:border-stroke-7">
                                            Actual Cost
                                        </th>
                                        <th className="text-center p-4 md:p-6 text-heading-6 text-ns-red font-semibold border-b border-stroke-3 dark:border-stroke-7">
                                            Your Loss
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-stroke-3 dark:border-stroke-7">
                                        <td className="p-4 md:p-6 text-tagline-1 text-secondary dark:text-accent">
                                            Base Coat (24 oz)
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary/70 dark:text-accent/70">
                                            {currencySymbol}150
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary dark:text-accent font-semibold">
                                            {currencySymbol}240
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-ns-red font-bold">
                                            -{currencySymbol}90
                                        </td>
                                    </tr>
                                    <tr className="border-b border-stroke-3 dark:border-stroke-7">
                                        <td className="p-4 md:p-6 text-tagline-1 text-secondary dark:text-accent">
                                            Clear Coat (20 oz)
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary/70 dark:text-accent/70">
                                            {currencySymbol}120
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary dark:text-accent font-semibold">
                                            {currencySymbol}160
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-ns-red font-bold">
                                            -{currencySymbol}40
                                        </td>
                                    </tr>
                                    <tr className="border-b border-stroke-3 dark:border-stroke-7">
                                        <td className="p-4 md:p-6 text-tagline-1 text-secondary dark:text-accent">
                                            Consumables (15 units)
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary/70 dark:text-accent/70">
                                            {currencySymbol}30
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-secondary dark:text-accent font-semibold">
                                            {currencySymbol}60
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-tagline-1 text-ns-red font-bold">
                                            -{currencySymbol}30
                                        </td>
                                    </tr>
                                    <tr className="bg-primary-500/5">
                                        <td className="p-4 md:p-6 text-heading-6 text-secondary dark:text-accent font-bold">
                                            Total Per Job
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-heading-6 text-secondary/70 dark:text-accent/70 font-semibold">
                                            {currencySymbol}300
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-heading-6 text-secondary dark:text-accent font-bold">
                                            {currencySymbol}460
                                        </td>
                                        <td className="p-4 md:p-6 text-center text-heading-6 text-ns-red font-bold">
                                            -{currencySymbol}160
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </RevealAnimation>

                    <RevealAnimation delay={0.4}>
                        <div className="mt-8 bg-white dark:bg-background-8 rounded-[20px] p-6 md:p-8 border border-stroke-3 dark:border-stroke-7">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 mb-2">
                                        10 jobs/week
                                    </p>
                                    <p className="text-heading-5 text-ns-red font-bold">
                                        -{currencySymbol}1,600/week
                                    </p>
                                </div>
                                <div>
                                    <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 mb-2">
                                        Annual loss
                                    </p>
                                    <p className="text-heading-5 text-ns-red font-bold">
                                        -{currencySymbol}83,200
                                    </p>
                                </div>
                                <div>
                                    <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 mb-2">
                                        Hidden subsidy
                                    </p>
                                    <p className="text-heading-5 text-primary-500 font-bold">
                                        35% of cost
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>

                    <RevealAnimation delay={0.5}>
                        <p className="text-center text-tagline-1 text-secondary/70 dark:text-accent/70 mt-8">
                            <strong className="text-secondary dark:text-accent">Note:</strong> Figures based on industry averages. Your actual costs may vary based on supplier agreements and regional market rates.
                        </p>
                    </RevealAnimation>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTableSection;
