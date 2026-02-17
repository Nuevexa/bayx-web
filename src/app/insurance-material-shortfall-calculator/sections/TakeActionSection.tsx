import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';

const TakeActionSection = () => {
    return (
        <section className="py-14 md:py-16 lg:py-[88px]">
            <div className="main-container">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-medium text-center mb-8">
                        Take Action
                    </h2>

                    <p className="text-tagline-1 text-secondary/80 dark:text-accent/80 text-center mb-10">
                        You've calculated your losses. Now it's time to stop subsidising insurance companies and take back control of your margins.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Step 1 */}
                        <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-heading-5 text-primary-500 font-bold">1</span>
                            </div>
                            <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-2">
                                Document Your Losses
                            </h3>
                            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Use this calculator for every paint job. Track the deficit over 30-60 days to build a comprehensive case.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-heading-5 text-primary-500 font-bold">2</span>
                            </div>
                            <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-2">
                                Present Data to Insurers
                            </h3>
                            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Armed with hard numbers, approach your DRP partners to renegotiate material reimbursement rates.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-heading-5 text-primary-500 font-bold">3</span>
                            </div>
                            <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-2">
                                Join Industry Advocacy
                            </h3>
                            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Connect with organisations fighting for fair shop reimbursement and industry transparency.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-heading-5 text-primary-500 font-bold">4</span>
                            </div>
                            <h3 className="text-heading-6 text-secondary dark:text-accent font-semibold mb-2">
                                Consider Alternatives
                            </h3>
                            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">
                                Evaluate whether DRP agreements are sustainable. Sometimes walking away is the best business decision.
                            </p>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-gradient-to-br from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/10 rounded-[20px] p-8 text-center border border-primary-500/20">
                        <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold mb-3">
                            Need Help Fighting Back?
                        </h3>
                        <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 mb-6">
                            Our team can help you analyse your DRP agreements and develop strategies to improve your margins.
                        </p>
                        <div className="group">
                            <LinkButton href="/contact-us" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
                                Get Expert Guidance
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeActionSection;
