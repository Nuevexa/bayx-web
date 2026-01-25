import NumberAnimation from '@/components/animation/NumberAnimation';
import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import transactionChart from '@public/images/ns-img-235.svg';
import profitChart from '@public/images/ns-img-240.png';
import statsBackground from '@public/images/background-stats.jpg';
import transactionChartDark from '@public/images/ns-img-dark-157.svg';
import profitChartDark from '@public/images/ns-img-dark-161.png';
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
            <figure className="h-full w-full max-w-[735px] overflow-hidden rounded-[20px]">
              <Image
                src={statsBackground}
                alt="BayX profitability dashboard"
                className="block size-full rounded-[20px] object-cover"
              />
            </figure>
          </RevealAnimation>

          {/* Floating Metric Cards */}
          <div className="absolute inset-0 flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
            <div className="grid w-full max-w-[750px] grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Card 1: 100% Visibility */}
              <RevealAnimation delay={0.5} direction="up" offset={50}>
                <div className="backdrop-blur-md bg-white/95 dark:bg-background-6/95 rounded-[12px] px-6 py-4 text-center shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:rounded-[16px] sm:px-8 sm:py-6">
                  <div className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent flex items-center justify-center font-bold">
                    <NumberAnimation number={100} speed={2000} interval={150} rooms={3} />
                    <span>%</span>
                  </div>
                  <p className="text-tagline-3 sm:text-tagline-2 text-secondary/70 dark:text-accent/70 mt-1.5 font-medium sm:mt-2">
                    Visibility
                  </p>
                </div>
              </RevealAnimation>

              {/* Card 2: 0 Paperwork */}
              <RevealAnimation delay={0.6} direction="up" offset={50}>
                <div className="backdrop-blur-md bg-white/95 dark:bg-background-6/95 rounded-[12px] px-6 py-4 text-center shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:rounded-[16px] sm:px-8 sm:py-6">
                  <div className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent flex items-center justify-center font-bold">
                    <NumberAnimation number={0} speed={1500} interval={150} rooms={1} />
                  </div>
                  <p className="text-tagline-3 sm:text-tagline-2 text-secondary/70 dark:text-accent/70 mt-1.5 font-medium sm:mt-2">
                    Paperwork
                  </p>
                </div>
              </RevealAnimation>

              {/* Card 3: 30 Min Setup */}
              <RevealAnimation delay={0.7} direction="up" offset={50}>
                <div className="backdrop-blur-md bg-white/95 dark:bg-background-6/95 rounded-[12px] px-6 py-4 text-center shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:rounded-[16px] sm:px-8 sm:py-6">
                  <div className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent flex items-center justify-center font-bold">
                    <NumberAnimation number={30} speed={2000} interval={150} rooms={2} />
                    <span className="text-tagline-2 ml-1">min</span>
                  </div>
                  <p className="text-tagline-3 sm:text-tagline-2 text-secondary/70 dark:text-accent/70 mt-1.5 font-medium sm:mt-2">
                    Setup
                  </p>
                </div>
              </RevealAnimation>

              {/* Card 4: 24/7 Access */}
              <RevealAnimation delay={0.8} direction="up" offset={50}>
                <div className="backdrop-blur-md bg-white/95 dark:bg-background-6/95 rounded-[12px] px-6 py-4 text-center shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:rounded-[16px] sm:px-8 sm:py-6">
                  <div className="text-heading-5 sm:text-heading-4 text-secondary dark:text-accent flex items-center justify-center font-bold">
                    <span>24/7</span>
                  </div>
                  <p className="text-tagline-3 sm:text-tagline-2 text-secondary/70 dark:text-accent/70 mt-1.5 font-medium sm:mt-2">
                    Access
                  </p>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
