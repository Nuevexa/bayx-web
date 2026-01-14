import heroBanner from '@public/landing-1.svg';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const Hero = () => {
  return (
    <section className="pt-23 max-[1920px]:px-5">
      <div className="bg-background-12 border-background-12 relative mx-auto -mb-2 max-w-[1880px] overflow-hidden rounded-3xl border pt-20 md:pt-30 xl:rounded-4xl">
        <RevealAnimation delay={0.3} direction="up" instant>
          <div className="before:bg-stroke-3 after:bg-stroke-3 absolute top-0 left-0 z-10 hidden h-full w-full before:absolute before:top-0 before:left-[7%] before:z-10 before:h-[100%] before:w-px before:content-[''] after:absolute after:top-0 after:right-[7%] after:z-10 after:h-[100%] after:w-px after:content-[''] md:block 2xl:before:left-[16%] 2xl:after:right-[16%]">
            <div className="bg-stroke-3 before:ring-stroke-3 after:ring-stroke-3 absolute top-[44%] h-px w-[100%] before:absolute before:-top-2 before:left-[6.3%] before:z-20 before:size-3 before:rounded-full before:bg-white before:ring-6 before:drop-shadow-[0,1px,2px,#AFB9C6] before:content-[''] after:absolute after:-top-[7px] after:right-[6.3%] after:z-20 after:size-3 after:rounded-full after:bg-white after:ring-6 after:drop-shadow-[0,1px,2px,#AFB9C6] after:content-[''] xl:top-[43%] 2xl:before:left-[15.7%] 2xl:after:right-[15.7%]" />
          </div>
        </RevealAnimation>
        <div className="main-container relative z-30">
          <div className="mb-12 text-center lg:mb-20 xl:mb-33">
            <RevealAnimation delay={0.1}>
              <h1 className="mb-3 font-medium opacity-0">
                Know Your Shop's Profit <br className="hidden md:block" />
                on Every Job. In Real Time.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="mx-auto mb-7 max-w-[750px] md:mb-14">
                BayX is the garage management system that shows you exactly where your money goes, so you can fix your workflow, not just cars.
              </p>
            </RevealAnimation>
            <ul className="flex flex-col items-center justify-center gap-x-4 gap-y-3 md:flex-row md:gap-y-0">
              <RevealAnimation delay={0.4} direction="left" instant offset={50}>
                <div>
                  <LinkButton href="/early-access" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
                    Join Early Access
                  </LinkButton>
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.5} direction="left" instant offset={50}>
                <div>
                  <LinkButton href="/pricing" btnClass="btn-xl-v2 btn-v2-white group-hover/btn-v2:btn-secondary-v2">
                    See Pricing
                  </LinkButton>
                </div>
              </RevealAnimation>
            </ul>
          </div>
          {/* banner */}
          <RevealAnimation delay={0.4} direction="up" instant>
            <figure className="mx-auto -mb-3 max-w-[620px] min-[1800px]:!max-w-[1166px] lg:max-w-[840px] xl:max-w-[1000px] 2xl:max-w-[1016px]">
              <Image src={heroBanner} alt="Hero banner" className="h-full w-full object-cover" />
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
