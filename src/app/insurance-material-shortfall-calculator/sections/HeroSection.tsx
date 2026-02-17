import Calculator from '@/components/calculator/Calculator';
import RevealAnimation from '@/components/animation/RevealAnimation';

const HeroSection = () => {
    return (
        <section className="bg-background-12 pt-28 pb-8 sm:bg-transparent sm:px-4 sm:pt-23 sm:pb-0 max-[1920px]:sm:px-5">
            <div className="sm:bg-background-12 sm:border-background-12 mx-auto max-w-[1880px] sm:overflow-hidden sm:rounded-3xl sm:border pt-12 pb-8 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 xl:rounded-4xl">
                <div className="main-container">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                        {/* Left Column - Copy */}
                        <div className="lg:col-span-5 flex flex-col items-start justify-center">
                            <RevealAnimation delay={0.1}>
                                <div className="flex flex-wrap gap-3 mb-5">
                                    <span className="badge badge-green">Free Calculator</span>
                                    <span className="badge badge-primary">5,000+ Shops Trust Us</span>
                                </div>
                            </RevealAnimation>

                            <RevealAnimation delay={0.2}>
                                <h1 className="mb-4 font-medium lg:text-heading-2 lg:max-w-xl">
                                    Insurance Material Shortfall Calculator for Auto Body Shops
                                </h1>
                            </RevealAnimation>

                            <RevealAnimation delay={0.3}>
                                <h2 className="mb-6 text-heading-6 md:text-heading-5 text-ns-green font-semibold">
                                    Are You Subsidising Insurance Company Profits?
                                </h2>
                            </RevealAnimation>

                            <RevealAnimation delay={0.4}>
                                <div className="space-y-4 text-tagline-1 text-secondary/80 dark:text-accent/80">
                                    <p>
                                        Insurance companies pay significantly less than actual material costs through Direct Repair Programme (DRP) agreements, forcing shops to subsidise repairs out-of-pocket.
                                    </p>
                                    <p>
                                        Use our free calculator to discover exactly how much you're losing on every paint job. <strong>Trusted by auto body shops across the US, UK, and Canada.</strong>
                                    </p>
                                    <p className="text-tagline-2 text-primary-500 font-semibold">
                                        ✓ Instant results • No registration required • 100% Free
                                    </p>
                                </div>
                            </RevealAnimation>
                        </div>

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-7 min-w-0">
                            <RevealAnimation delay={0.5}>
                                <Calculator />
                            </RevealAnimation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
