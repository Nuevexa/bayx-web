import RevealAnimation from '@/components/animation/RevealAnimation';

const CostBreakdownSection = () => {
    return (
        <section className="max-[1920px]:px-5">
            <div className="bg-background-12 mx-auto max-w-[1880px] rounded-3xl py-16 md:py-24 lg:rounded-4xl">
                <div className="main-container">
                    <div className="max-w-5xl mx-auto">
                        <RevealAnimation delay={0.1}>
                            <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium text-center mb-12">
                                How Modern Paint Costs Add Up
                            </h2>
                        </RevealAnimation>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Base Coat */}
                            <RevealAnimation delay={0.2}>
                                <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7 text-center">
                                    <div className="bg-primary-500/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-heading-4 text-primary-500 font-bold">1</span>
                                    </div>
                                    <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-3">
                                        Base Coat
                                    </h3>
                                    <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-4">
                                        High-quality colour match base coats are essential for professional finishes.
                                    </p>
                                    <div className="text-primary-500 font-semibold">
                                        $8-$12 per ounce
                                    </div>
                                    <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 mt-2">
                                        Typical job: 20-30 oz
                                    </p>
                                </div>
                            </RevealAnimation>

                            {/* Clear Coat */}
                            <RevealAnimation delay={0.3}>
                                <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7 text-center">
                                    <div className="bg-primary-500/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-heading-4 text-primary-500 font-bold">2</span>
                                    </div>
                                    <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-3">
                                        Clear Coat
                                    </h3>
                                    <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-4">
                                        UV-resistant clear coats protect the finish and ensure longevity.
                                    </p>
                                    <div className="text-primary-500 font-semibold">
                                        $7-$9 per ounce
                                    </div>
                                    <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 mt-2">
                                        Typical job: 18-25 oz
                                    </p>
                                </div>
                            </RevealAnimation>

                            {/* Consumables */}
                            <RevealAnimation delay={0.4}>
                                <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7 text-center">
                                    <div className="bg-primary-500/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-heading-4 text-primary-500 font-bold">3</span>
                                    </div>
                                    <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-3">
                                        Consumables
                                    </h3>
                                    <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-4">
                                        Sandpaper, masking materials, tack cloths, and prep supplies.
                                    </p>
                                    <div className="text-primary-500 font-semibold">
                                        $3-$5 per unit
                                    </div>
                                    <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 mt-2">
                                        Typical job: 10-20 units
                                    </p>
                                </div>
                            </RevealAnimation>
                        </div>

                        {/* Comparison */}
                        <RevealAnimation delay={0.5}>
                            <div className="bg-gradient-to-br from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/10 rounded-[20px] p-8 border border-primary-500/20">
                                <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold text-center mb-6">
                                    What Insurance Pays vs. Reality
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-background-8/50 rounded-xl">
                                        <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-2">Insurance Payout</p>
                                        <p className="text-2xl sm:text-3xl md:text-heading-3 text-secondary dark:text-accent font-bold whitespace-nowrap">$150-$200</p>
                                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 mt-2">Typical DRP rate</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-background-8/50 rounded-xl">
                                        <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mb-2">Actual Material Cost</p>
                                        <p className="text-2xl sm:text-3xl md:text-heading-3 text-primary-500 font-bold whitespace-nowrap">$400-$600</p>
                                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 mt-2">Real shop expense</p>
                                    </div>
                                </div>
                                <p className="text-center text-heading-6 text-primary-500 font-semibold mt-6">
                                    The gap? YOU pay it.
                                </p>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostBreakdownSection;
