'use client';
import { useWordAnimation } from '@/hooks/useWordAnimation';
import RevealAnimation from '../animation/RevealAnimation';

const VisionStatement = () => {
  const { titleRef } = useWordAnimation({
    start: 'top 80%',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-23 max-[1920px]:px-5">
        <div className="bg-background-12 border-background-12 relative mx-auto max-w-[1880px] overflow-hidden rounded-3xl border py-20 md:py-30 xl:rounded-4xl">
          <div className="main-container relative z-30">
            <div className="text-center">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-white-v2 text-secondary font-medium mb-5">About BayX</span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                <h1 className="mb-3 font-medium">
                  Built by shop owners. <br className="hidden md:block" />
                  For shop owners.
                </h1>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="mx-auto mb-7 max-w-[750px]">
                  BayX was born from a simple frustration: existing shop management software was either too complex,
                  too expensive, or built for giant dealerships. We created BayX to give independent garage owners
                  the profitability insights they deserve—without the enterprise price tag.
                </p>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="max-[1920px]:px-5">
        <RevealAnimation delay={0.2}>
          <div className="bg-secondary mx-auto max-w-[1880px] rounded-3xl px-5 lg:py-24 xl:rounded-4xl xl:py-28">
            <div className="mx-auto max-w-[1400px] py-16 lg:py-20 xl:py-30">
              <h2
                ref={titleRef}
                className="split-text-team-title text-accent font-inter-tight text-heading-5 sm:text-heading-4 md:text-heading-3 lg:text-heading-2 xl:text-heading-1 text-center font-light wrap-break-word 2xl:text-[88px] 2xl:leading-[120%]">
                Helping garage owners stop leaking profit by giving them real-time visibility into every job, every technician, and every dollar.
              </h2>
            </div>
          </div>
        </RevealAnimation>
      </section>

      {/* Stats Section */}
      <section className="max-[1920px]:px-5">
        <div className="bg-background-12 mx-auto max-w-[1880px] rounded-3xl py-20 lg:rounded-4xl lg:py-30">
          <div className="main-container">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <RevealAnimation delay={0.2}>
                <div className="rounded-[20px] bg-white p-10 text-center">
                  <div className="text-5xl font-bold text-primary-500 mb-2 lg:text-6xl">500+</div>
                  <p className="text-secondary text-lg">Garages using BayX</p>
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <div className="rounded-[20px] bg-white p-10 text-center">
                  <div className="text-5xl font-bold text-primary-500 mb-2 lg:text-6xl">$2M+</div>
                  <p className="text-secondary text-lg">Revenue tracked monthly</p>
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <div className="rounded-[20px] bg-white p-10 text-center">
                  <div className="text-5xl font-bold text-primary-500 mb-2 lg:text-6xl">15%</div>
                  <p className="text-secondary text-lg">Avg. margin improvement</p>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

VisionStatement.displayName = 'VisionStatement';
export default VisionStatement;
