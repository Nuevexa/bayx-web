import cardOneImg from '@public/visual-job-board.png';
import cardOneImgDark from '@public/images/ns-img-dark-63.png';

import cardTwoImg from '@public/profitability-analytics.png';
import cardTwoImgDark from '@public/images/ns-img-dark-64.png';

import cardThreeImg from '@public/customer-tracking-portal.png';
import cardThreeImgDark from '@public/images/ns-img-dark-65.png';

import cardFourImg from '@public/technicial-mobile-portal.png';
import cardFourImgDark from '@public/images/ns-img-dark-66.png';

import cardFiveImg from '@public/estimates-approvals.png';
import cardFiveImgDark from '@public/images/ns-img-dark-67.png';

import cardSixImg from '@public/bay-management.png';
import cardSixImgDark from '@public/images/ns-img-dark-63.png';

import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const Features = () => {
  return (
    <section className="pt-[100px] pb-[100px] md:pt-[160px]" aria-label="Features">
      <div className="main-container">
        <div className="space-y-[70px]">
          {/* feature heading  */}
          <div className="space-y-3 text-center">
            <RevealAnimation delay={0.3}>
              <h2 className="mx-auto max-w-[814px]">Everything you need to run a profitable garage</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="mx-auto max-w-[734px]">
                BayX gives you complete visibility into every job, every technician, and every dollar.
                Stop guessing. Start knowing exactly where your money goes.
              </p>
            </RevealAnimation>
          </div>

          {/* feature cards  */}
          {/* Row 1: 3 cards  */}
          <div className="flex flex-col items-center justify-center gap-y-8 sm:flex-row sm:gap-x-8">
            {/* Card 1: Job Board */}
            <RevealAnimation delay={0.5}>
              <Link href="/features/job-board" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardOneImg}
                      alt="Visual job board for garage management"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardOneImgDark}
                      alt="Visual job board for garage management"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Visual Job Board</h3>
                  <p>Drag-and-drop jobs from intake to completion. See every vehicle at a glance.</p>
                </div>
              </Link>
            </RevealAnimation>

            {/* Card 2: Profitability Analytics */}
            <RevealAnimation delay={0.6}>
              <Link href="/features/profitability-analytics" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardTwoImg}
                      alt="Real-time profitability analytics dashboard"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardTwoImgDark}
                      alt="Real-time profitability analytics dashboard"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Profitability Analytics</h3>
                  <p>Know your margin on every job. Track revenue, costs, and profits in real time.</p>
                </div>
              </Link>
            </RevealAnimation>

            {/* Card 3: Customer Portal */}
            <RevealAnimation delay={0.7}>
              <Link href="/features/customer-portal" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardThreeImg}
                      alt="Customer tracking portal"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardThreeImgDark}
                      alt="Customer tracking portal"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Customer Tracking Portal</h3>
                  <p>Customers see real-time status updates. No more "Where's my car?" calls.</p>
                </div>
              </Link>
            </RevealAnimation>
          </div>

          {/* Row 2: 3 cards  */}
          <div className="flex flex-col items-center justify-center gap-y-8 sm:flex-row sm:gap-x-8">
            {/* Card 4: Technician Portal */}
            <RevealAnimation delay={0.8}>
              <Link href="/features/technician-portal" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardFourImg}
                      alt="Mobile technician portal"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardFourImgDark}
                      alt="Mobile technician portal"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Technician Mobile Portal</h3>
                  <p>Techs clock in, upload photos, and update jobs from their phone. No paperwork.</p>
                </div>
              </Link>
            </RevealAnimation>

            {/* Card 5: Estimates & Approvals */}
            <RevealAnimation delay={0.9}>
              <Link href="/features/estimates-approvals" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardFiveImg}
                      alt="Estimates and approvals feature"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardFiveImgDark}
                      alt="Estimates and approvals feature"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Estimates &amp; Approvals</h3>
                  <p>Build quotes in minutes. Customers review and approve online instantly.</p>
                </div>
              </Link>
            </RevealAnimation>

            {/* Card 6: Bay Management */}
            <RevealAnimation delay={1.0}>
              <Link href="/features/bay-management" className="group block space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="dark:bg-background-5 w-full max-w-[409px] rounded-[20px] bg-white p-2.5 transition-shadow duration-300 group-hover:shadow-lg">
                  <figure className="bg-background-3 dark:bg-background-7 overflow-hidden rounded-2xl p-4">
                    <Image
                      src={cardSixImg}
                      alt="Service bay management"
                      className="h-full w-full rounded-[10px] object-cover dark:hidden"
                      loading="lazy"
                    />
                    <Image
                      src={cardSixImgDark}
                      alt="Service bay management"
                      className="hidden h-full w-full rounded-[10px] object-cover dark:block"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="space-y-1">
                  <h3 className="text-heading-5 group-hover:text-primary-500 transition-colors duration-300">Bay Management</h3>
                  <p>See which bays are busy, available, or waiting. Maximize your shop floor capacity.</p>
                </div>
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};
Features.displayName = 'Features';
export default Features;
