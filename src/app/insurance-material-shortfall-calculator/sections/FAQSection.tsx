import RevealAnimation from '@/components/animation/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 1,
        question: 'What is insurance material shortfall in auto body repair?',
        answer: 'Insurance material shortfall is the gap between what insurance companies reimburse for paint and materials versus the actual cost auto body shops pay. DRP agreements often pay 30-50% less than real market costs, forcing shops to subsidise repairs out-of-pocket.',
    },
    {
        id: 2,
        question: "How do DRP agreements affect my shop's profitability?",
        answer: 'Direct Repair Programme (DRP) agreements typically result in $200-$400 loss per paint job on materials alone. For shops doing 10-20 paint jobs per week, this translates to $50,000-$100,000+ in annual out-of-pocket subsidies that directly impact profitability.',
    },
    {
        id: 3,
        question: 'Why do insurance companies underpay for paint and materials?',
        answer: "Insurance reimbursement rates haven't kept pace with material cost increases, which have risen over 40% in the past five years. Modern three-stage paint systems require premium materials, but insurance payouts remain based on outdated pricing models, maximising insurance company profits at the expense of repair shops.",
    },
    {
        id: 4,
        question: 'How accurate is this calculator for my shop?',
        answer: 'The calculator uses industry-standard material costs and typical DRP reimbursement rates validated by thousands of body shops across the US, UK, and Canada. Results provide a realistic estimate of your shortfall, though actual costs may vary based on your specific suppliers and insurance agreements.',
    },
    {
        id: 5,
        question: 'Can I negotiate better rates with insurance companies?',
        answer: 'Yes, armed with accurate data about your actual material costs and losses, you can negotiate more effectively with insurance companies. Many shops have successfully renegotiated DRP rates by documenting their material shortfall and presenting concrete evidence of losses.',
    },
    {
        id: 6,
        question: 'How do I track material costs accurately?',
        answer: 'Modern garage management software like BayX automatically tracks material costs per job, providing real-time profitability analysis. This eliminates manual tracking and gives you accurate data for insurance negotiations and business decisions.',
    },
    {
        id: 7,
        question: "What's the average material shortfall for body shops?",
        answer: 'Industry research shows the average auto body shop loses $200-$400 per paint job on materials alone when working under DRP agreements. High-volume shops can experience total annual shortfalls exceeding $100,000, significantly impacting overall profitability.',
    },
    {
        id: 8,
        question: 'What regions does this calculator cover?',
        answer: 'This calculator is designed for auto body shops in the United States, United Kingdom, and Canada. It accounts for regional variations in insurance practises and material costs across these markets.',
    },
];

const FAQSection = () => {
    return (
        <section className="max-[1920px]:px-5">
            <RevealAnimation delay={0.1}>
                <div className="bg-background-12 mx-auto max-w-[1880px] rounded-2xl py-18 md:rounded-4xl md:py-20 lg:py-25 xl:py-28">
                    <div className="main-container">
                        <div className="mx-auto mb-12 max-w-[720px] space-y-3 text-center md:space-y-5 lg:mb-[70px]">
                            <RevealAnimation delay={0.2}>
                                <span className="badge badge-white-v2 uppercase">FAQ</span>
                            </RevealAnimation>
                            <div className="space-y-3">
                                <RevealAnimation delay={0.3}>
                                    <h2>Frequently Asked Questions</h2>
                                </RevealAnimation>
                                <RevealAnimation delay={0.4}>
                                    <p>
                                        Everything you need to know about insurance material shortfall and DRP agreements
                                    </p>
                                </RevealAnimation>
                            </div>
                        </div>
                        <Accordion
                            className="mx-auto max-w-[770px] space-y-4"
                            defaultValue="1"
                            enableScrollAnimation={true}
                            animationDelay={0.1}>
                            {faqs.map((item) => (
                                <AccordionItem
                                    className="rounded-2xl bg-white dark:bg-background-8 px-6 md:rounded-4xl md:px-8"
                                    key={item.id}
                                    value={item.id.toString()}>
                                    <AccordionTrigger
                                        titleClassName="flex-1 text-left lg:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
                                        className="flex w-full cursor-pointer items-center justify-between py-6 md:py-8"
                                        value={item.id.toString()}
                                        iconType="arrow">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent value={item.id.toString()}>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <RevealAnimation delay={0.6}>
                            <div className="mt-12 text-center">
                                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                                    Still have questions?{' '}
                                    <a
                                        href="/contact-us"
                                        className="text-primary-500 hover:text-primary-600 font-semibold underline">
                                        Contact our team
                                    </a>{' '}
                                    for personalised assistance.
                                </p>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </RevealAnimation>
        </section>
    );
};

export default FAQSection;
