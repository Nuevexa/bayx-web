import faqImg from '@public/images/ns-img-52.png';
import faqImgDark from '@public/images/ns-img-dark-31.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const Faq = () => {
  return (
    <section
      className="py-[50px] md:py-[70px] lg:py-[85px] xl:pb-[100px]"
      aria-label="Frequently Asked Questions">
      <div className="main-container">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-0">
          <div className="flex-1 space-y-14 text-center lg:text-left">
            <div className="space-y-5">
              <RevealAnimation delay={0.2}>
                <span className="badge badge-cyan">FAQ</span>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <h2 className="mx-auto lg:mx-0 lg:max-w-[439px]" id="faq-heading">
                  Questions about pricing? We've got you covered.
                </h2>
              </RevealAnimation>
            </div>

            {/* faq accordion  */}
            <RevealAnimation delay={0.4}>
              <Accordion className="mx-auto w-full max-w-[576px] lg:mx-0" defaultValue="1">
                <AccordionItem value="1">
                  <AccordionTrigger
                    className="flex w-full cursor-pointer items-center justify-between pt-6 pb-6"
                    titleClassName="flex-1 text-left xl:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
                    value="1"
                    iconType="arrow">
                    How does early access work?
                  </AccordionTrigger>

                  <AccordionContent value="1">
                    Join our early access program to be among the first to use BayX. You'll get full access to all features at our founding member rates. Your feedback helps shape the product, and you'll lock in special pricing for life.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="2">
                  <AccordionTrigger
                    className="flex w-full cursor-pointer items-center justify-between pt-6 pb-6"
                    titleClassName="flex-1 text-left xl:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
                    value="2"
                    iconType="arrow">
                    Can I change plans later?
                  </AccordionTrigger>

                  <AccordionContent value="2">
                    Yes. Upgrade or downgrade anytime from your account settings. If you upgrade, you get immediate access to new features. If you downgrade, changes take effect at your next billing cycle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="3">
                  <AccordionTrigger
                    className="flex w-full cursor-pointer items-center justify-between pt-6 pb-6"
                    titleClassName="flex-1 text-left xl:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
                    value="3"
                    iconType="arrow">
                    What happens if I hit my job limit?
                  </AccordionTrigger>

                  <AccordionContent value="3">
                    We'll notify you when you're approaching your monthly job limit. You can upgrade to a higher plan anytime, or wait until the next billing cycle when your count resets. We never lock you out mid-month.

                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="4">
                  <AccordionTrigger
                    className="flex w-full cursor-pointer items-center justify-between pt-6 pb-6"
                    titleClassName="flex-1 text-left xl:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent"
                    value="4"
                    iconType="arrow">
                    Is there a contract or can I cancel anytime?
                  </AccordionTrigger>

                  <AccordionContent value="4">
                    No contracts, no commitments. BayX is month-to-month. Cancel anytime from your account settings and you won't be charged again. Your data stays accessible for 30 days after cancellation.

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </RevealAnimation>
          </div>

          {/* <!-- faq image --> */}
          <RevealAnimation delay={0.3}>
            <figure className="relative w-full max-w-[684px] flex-1 overflow-hidden">
              <Image
                className="size-full object-cover dark:hidden"
                src={faqImg}
                alt="BayX pricing and subscription illustration"
                loading="lazy"
              />
              <Image
                className="hidden size-full object-cover dark:inline-block"
                src={faqImgDark}
                alt="BayX pricing and subscription illustration"
                loading="lazy"
              />
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Faq;
