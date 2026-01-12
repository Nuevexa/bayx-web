import NumberAnimation from '@/components/animation/NumberAnimation';
import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import transactionChart from '@public/images/ns-img-235.svg';
import profitChart from '@public/images/ns-img-240.png';
import transactionRing from '@public/images/ns-img-74.png';
import transactionChartDark from '@public/images/ns-img-dark-157.svg';
import profitChartDark from '@public/images/ns-img-dark-161.png';
import transactionRingDark from '@public/images/ns-img-dark-50.png';
import Image from 'next/image';

const WhyChooseUs = ({ className }: { className?: string }) => {
  return (
    <section className={cn('bg-background-3 dark:bg-background-5 overflow-hidden py-20 lg:py-[120px]', className)}>
      <div className="main-container flex flex-col items-center justify-between gap-12 lg:flex-row">
        <div>
          <RevealAnimation delay={0.1}>
            <span className="badge badge-green mb-5">Why BayX</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2 className="mb-3">
              See your shop&apos;s true
              <br className="hidden lg:block" />
              profit. Every job.
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="lg:max-w-[536px]">
              Most garage owners work hard but don&apos;t know which jobs actually make money.
              BayX shows you exactly where every dollar goes so you can fix what&apos;s leaking.
            </p>
          </RevealAnimation>
          <ul className="mt-8 space-y-1 lg:mt-14">
            <RevealAnimation delay={0.4}>
              <li className="flex list-none items-center gap-4 py-2">
                <span className="ns-shape-8 text-secondary dark:text-accent text-[36px]"> </span>
                <strong className="text-tagline-1 text-secondary dark:text-accent font-medium">
                  Set up in under 30 minutes. No training required.
                </strong>
              </li>
            </RevealAnimation>
            <RevealAnimation delay={0.5}>
              <li className="flex list-none items-center gap-4 py-2">
                <span className="ns-shape-9 text-secondary dark:text-accent text-[36px]"> </span>
                <strong className="text-tagline-1 text-secondary dark:text-accent font-medium">
                  Real-time profitability on every single job.
                </strong>
              </li>
            </RevealAnimation>
            <RevealAnimation delay={0.6}>
              <li className="flex list-none items-center gap-4 py-2">
                <span className="ns-shape-12 text-secondary dark:text-accent text-[36px]"> </span>
                <strong className="text-tagline-1 text-secondary dark:text-accent font-medium">
                  Customers track their vehicle without calling you.
                </strong>
              </li>
            </RevealAnimation>
            <RevealAnimation delay={0.7}>
              <li className="flex list-none items-center gap-4 py-2">
                <span className="ns-shape-21 text-secondary dark:text-accent text-[36px]"> </span>
                <strong className="text-tagline-1 text-secondary dark:text-accent font-medium">
                  Technicians update jobs from their phone. Zero paperwork.
                </strong>
              </li>
            </RevealAnimation>
          </ul>
        </div>
        <div className="relative">
          <RevealAnimation delay={0.2} direction="up" offset={150}>
            <figure className="h-full w-full max-w-[735px] rounded-[20px] object-cover">
              <Image
                src={transactionRing}
                alt="BayX profitability dashboard"
                className="block size-full object-cover dark:hidden"
              />
              <Image
                src={transactionRingDark}
                alt="BayX profitability dashboard"
                className="hidden size-full object-cover dark:block"
              />
            </figure>
          </RevealAnimation>
          <RevealAnimation delay={0.5} direction="right" offset={100} useSpring={true} duration={2}>
            <figure className="absolute top-[15%] right-6 w-full max-w-[140px] overflow-hidden rounded-[20px] md:right-0 md:max-w-[253px] lg:max-w-[200px] xl:max-w-[253px]">
              <Image
                src={transactionChart}
                alt="Revenue chart"
                className="inline-block h-full w-full object-cover dark:hidden"
              />
              <Image
                src={transactionChartDark}
                alt="Revenue chart"
                className="hidden h-full w-full object-cover dark:block"
              />
            </figure>
          </RevealAnimation>
          <RevealAnimation delay={1} direction="up" offset={100} useSpring={true} duration={1.5}>
            <div className="absolute top-[20%] right-0 z-10 w-[92px] xl:-right-[4%]">
              <div className="text-heading-6 md:text-heading-5 bg-ns-yellow flex -rotate-[14deg] items-center justify-center rounded-[8px] px-2 py-1 font-normal">
                <NumberAnimation number={15} speed={2500} interval={200} rooms={2}>
                  15
                </NumberAnimation>
                %
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.7} direction="right" offset={100} useSpring={true} duration={2}>
            <figure className="shadow-3 absolute right-0 bottom-0 w-full max-w-[200px] overflow-hidden rounded-[20px] sm:bottom-10 sm:max-w-[320px] md:bottom-[10%] md:max-w-[395px]">
              <Image src={profitChart} alt="Profit margins chart" className="h-full w-full dark:hidden" />
              <Image src={profitChartDark} alt="Profit margins chart" className="hidden h-full w-full dark:block" />
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
