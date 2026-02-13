import Calculator from '@/components/calculator/Calculator';
import RevealAnimation from '@/components/animation/RevealAnimation';

const HeroSection = () => {
    return (
        <section className="pt-[120px] pb-[60px] md:pt-[140px] md:pb-[100px]">
            <div className="main-container">
                <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column - Copy */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
                        <RevealAnimation delay={0.1}>
                            <span className="badge badge-green mb-5">Free Calculator</span>
                        </RevealAnimation>

                        <RevealAnimation delay={0.2}>
                            <h1 className="mb-4 text-heading-2 md:text-heading-1 text-secondary dark:text-accent font-bold">
                                Are You Subsidizing Insurance Company Profits?
                            </h1>
                        </RevealAnimation>

                        <RevealAnimation delay={0.3}>
                            <h2 className="mb-6 text-heading-6 md:text-heading-5 text-ns-green font-semibold">
                                Calculate Your Exact Loss on Paint & Materials
                            </h2>
                        </RevealAnimation>

                        <RevealAnimation delay={0.4}>
                            <div className="space-y-4 text-tagline-1 text-secondary/80 dark:text-accent/80">
                                <p>
                                    Insurance companies pay significantly less than actual material costs through Direct Repair Program (DRP) agreements, forcing shops to subsidize repairs out-of-pocket.
                                </p>
                                <p>
                                    Use our free calculator to discover exactly how much you're losing on every paint job.
                                </p>
                                <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">
                                    <strong>Used by 5,000+ body shops nationwide</strong>
                                </p>
                            </div>
                        </RevealAnimation>
                    </div>

                    {/* Right Column - Calculator */}
                    <div className="col-span-12 lg:col-span-7">
                        <RevealAnimation delay={0.5}>
                            <Calculator />
                        </RevealAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
