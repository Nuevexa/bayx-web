import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const CTA = () => {
  return (
    <section className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[112px] xl:pb-[112px]">
      <div className="main-container">
        <div className="mx-auto max-w-[649px] space-y-8 text-center">
          <RevealAnimation delay={0.1}>
            <h2>Ready to transform your shop?</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
              Calculate your material shortfall or join early access to take control of your profitability.
            </p>
          </RevealAnimation>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-3 md:flex-row md:gap-y-0">
            <RevealAnimation delay={0.3} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton
                  href="/insurance-material-shortfall-calculator"
                  btnClass="btn-xl-v2 btn-primary-v2 group-hover/btn-v2:btn-secondary-v2">
                  Free Calculator Tool
                </LinkButton>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.4} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="/early-access" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
                  Join Early Access
                </LinkButton>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.5} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="/pricing" btnClass="btn-xl-v2 btn-ash-v2 !border-0 group-hover/btn-v2:btn-secondary-v2">
                  See Pricing
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
      {/* 
      <div className="main-container">
        <div className="mx-auto max-w-[649px] space-y-8 text-center">
          <RevealAnimation delay={0.1}>
            <h2>Discover the key features of our mobile app.</h2>
          </RevealAnimation>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-3 md:flex-row md:gap-y-0">
            <RevealAnimation delay={0.4} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="#" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
                  App store
                </LinkButton>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.5} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="#" btnClass="btn-xl-v2 btn-ash-v2 !border-0 group-hover/btn-v2:btn-secondary-v2">
                  Google play
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div> */}
    </section>
  );
};

CTA.displayName = 'CTA';
export default CTA;
