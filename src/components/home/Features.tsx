import RevealAnimation from '../animation/RevealAnimation';

import handsPhone from '@public/landing-2.png';
import teamGlance from '@public/landing-3.png';
import Image from 'next/image';
import FeaturesFileCard from './FeaturesFileCard';

const Features = () => {
  return (
    <section className="max-[1920px]:px-5">
      <div className="bg-background-12 mx-auto max-w-[1880px] rounded-3xl py-20 lg:rounded-4xl lg:py-30 xl:py-39">
        <div className="main-container">
          <div className="mb-10 space-y-4 text-center md:mb-14 lg:mx-auto lg:max-w-[740px]">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-white-v2 text-secondary font-medium">Core Features</span>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <h2>Everything you need to run your garage smarter.</h2>
            </RevealAnimation>
          </div>
          {/* features grid */}
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
            {/* feature item 1 */}
            <RevealAnimation delay={0.1}>
              <div className="col-span-12 md:col-span-6">
                <div className="relative h-full min-h-[450px] max-w-full overflow-hidden rounded-[20px] bg-white sm:min-h-[780px] md:min-h-[720px] lg:p-10.5">
                  <RevealAnimation delay={0.1}>
                    <div className="absolute bottom-0 left-0 z-10 h-[480px] w-full bg-(image:--color-gradient-11) blur-[2px] md:bottom-20 lg:bottom-0" />
                  </RevealAnimation>
                  <RevealAnimation delay={0.2}>
                    <figure className="absolute right-0 bottom-2 md:bottom-40 lg:bottom-20 xl:bottom-2">
                      <Image src={handsPhone} alt="feature-1" className="h-full w-full scale-[1.01] object-cover" />
                    </figure>
                  </RevealAnimation>
                  <RevealAnimation delay={0.2}>
                    <div className="absolute right-10.5 bottom-10.5 left-6 z-20 max-md:space-y-0.5 sm:left-10.5 md:left-6 md:space-y-1.5 xl:left-10.5">
                      <h3 className="text-heading-6 md:text-heading-5">Visual Job Tracking</h3>
                      <p className="max-w-[450px]">
                        See every job at a glance on your Kanban board. Drag and drop to update status as work progresses.
                      </p>
                    </div>
                  </RevealAnimation>
                </div>
              </div>
            </RevealAnimation>
            {/* feature item 2 */}
            <div className="col-span-12 space-y-8 md:col-span-6">
              <RevealAnimation delay={0.4}>
                <div className="space-y-6 rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8">
                  <div className="bg-background-12 relative overflow-hidden rounded-2xl">
                    <Image src={teamGlance} alt="Team management overview" className="h-full w-full scale-[1.01] object-cover" />
                  </div>
                  <RevealAnimation delay={0.4} start="top 97%">
                    <div className="max-md:space-y-0.5 md:space-y-1.5">
                      <h3 className="text-heading-6 md:text-heading-5">Team at a glance.</h3>
                      <p className="max-w-[450px]">
                        Your technicians, their assigned jobs, and real-time status updates all in one place.
                      </p>
                    </div>
                  </RevealAnimation>
                </div>
              </RevealAnimation>
              <FeaturesFileCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Features.displayName = 'Features';
export default Features;
