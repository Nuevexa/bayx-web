import RevealAnimation from '@/components/animation/RevealAnimation';

const WhyMattersSection = () => {
    return (
        <section className="py-[60px] md:py-[100px] bg-background-1 dark:bg-background-6">
            <div className="main-container">
                <div className="max-w-4xl mx-auto">
                    <RevealAnimation delay={0.1}>
                        <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium text-center mb-8">
                            Why This Matters
                        </h2>
                    </RevealAnimation>

                    <div className="space-y-6 text-tagline-1 text-secondary/80 dark:text-accent/80">
                        <RevealAnimation delay={0.2}>
                            <p>
                                Direct Repair Programmes (DRPs) were designed to streamline the claims process, but they've evolved into a profit-extraction mechanism for insurance companies. The reality? <strong>You're being forced to work at a loss.</strong>
                            </p>
                        </RevealAnimation>

                        <RevealAnimation delay={0.3}>
                            <p>
                                Modern three-stage paint systems require premium materials - base coats, clear coats, and extensive prep supplies. Insurance reimbursement rates haven't kept pace with these material costs, which have increased by over 40% in the past five years alone.
                            </p>
                        </RevealAnimation>

                        <RevealAnimation delay={0.35}>
                            <p>
                                This problem affects body shops globally. In the <strong>United States</strong>, major insurers continue to squeeze DRP rates while material costs soar. <strong>UK bodyshops</strong> face similar challenges with ABI (Association of British Insurers) recommended rates that don't reflect real-world PPG, Axalta, or BASF paint system costs. In <strong>Canada</strong>, provincial variations in insurance regulations create additional complexity, but the core issue remains: shops subsidise insurance company profits.
                            </p>
                        </RevealAnimation>

                        <RevealAnimation delay={0.4}>
                            <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 md:p-8 border border-stroke-3 dark:border-stroke-7">
                                <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-4">
                                    Real Impact on Your Business
                                </h3>
                                <ul className="space-y-3 text-secondary/70 dark:text-accent/70">
                                    <li className="flex gap-3">
                                        <span className="text-primary-500 font-bold">•</span>
                                        <span>Average shops lose $200-$400 per paint job on materials alone</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-500 font-bold">•</span>
                                        <span>That translates to $50,000-$100,000+ in annual out-of-pocket subsidies</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-500 font-bold">•</span>
                                        <span>Insurance companies profit from YOUR losses</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-500 font-bold">•</span>
                                        <span>Without accurate tracking, most shops underestimate their true material shortfall by 20-30%</span>
                                    </li>
                                </ul>
                            </div>
                        </RevealAnimation>

                        <RevealAnimation delay={0.45}>
                            <p>
                                The situation is compounded by <strong>rising labour costs, environmental regulations, and equipment investments</strong> that insurance companies refuse to acknowledge in their reimbursement formulas. Meanwhile, shops are expected to maintain OEM certification standards and invest in advanced training - all while losing money on materials.
                            </p>
                        </RevealAnimation>

                        <RevealAnimation delay={0.5}>
                            <p className="text-center text-heading-6 text-primary-500 font-semibold">
                                It's time to expose the real cost of DRP agreements.
                            </p>
                        </RevealAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyMattersSection;
