import RevealAnimation from '@/components/animation/RevealAnimation';

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "I ran the numbers and was shocked. $380 per paint job, I'm paying out of pocket. That's $76,000 a year. Insurance companies are making US fund their profits.",
            author: "Mike R.",
            location: "Phoenix, AZ",
        },
        {
            quote: "This calculator opened my eyes. I've been operating at a 60% material deficit for three years. Time to renegotiate or walk away from DRP.",
            author: "Sarah K.",
            location: "Austin, TX",
        },
        {
            quote: "Finally, a tool that shows the REAL cost. I'm sharing this with every shop owner I know. We can't keep subsidizing insurance companies.",
            author: "Dan M.",
            location: "Seattle, WA",
        },
    ];

    return (
        <section className="py-[60px] md:py-[100px] bg-background-1 dark:bg-background-6">
            <div className="main-container">
                <div className="max-w-5xl mx-auto">
                    <RevealAnimation delay={0.1}>
                        <h2 className="text-heading-3 md:text-heading-2 text-secondary dark:text-accent font-bold text-center mb-12">
                            What Body Shop Owners Are Saying
                        </h2>
                    </RevealAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <RevealAnimation key={index} delay={0.2 + index * 0.1}>
                                <div className="bg-white dark:bg-background-8 rounded-[20px] p-6 border border-stroke-3 dark:border-stroke-7 h-full flex flex-col">
                                    <div className="flex-1">
                                        <p className="text-tagline-1 text-secondary/80 dark:text-accent/80 italic mb-4">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                    <div className="border-t border-stroke-3 dark:border-stroke-7 pt-4">
                                        <p className="text-tagline-2 text-secondary dark:text-accent font-semibold">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </RevealAnimation>
                        ))}
                    </div>

                    <RevealAnimation delay={0.6}>
                        <p className="text-center text-tagline-2 text-secondary/60 dark:text-accent/60 mt-8">
                            Join thousands of shop owners taking control of their margins
                        </p>
                    </RevealAnimation>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
