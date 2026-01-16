import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const NeedHelp = () => {
  return (
    <section className="pt-32 sm:pt-36 md:pt-42 xl:pt-[180px]">
      <div className="main-container">
        <div className="space-y-14 text-center">
          <div className="space-y-3">
            <RevealAnimation delay={0.3}>
              <h2>Need help with BayX?</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="mx-auto max-w-[600px]">
                Welcome to the BayX Help Center. Whether you have a question about features,
                need help setting up your shop, or just want to chat—we&apos;re here to help.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={0.45}>
              <p className="text-primary-500 font-medium">
                We typically respond within 24 hours.
              </p>
            </RevealAnimation>
          </div>
          <RevealAnimation delay={0.5}>
            <div>
              <LinkButton href="#contact-form" btnClass="btn-xl-v2 btn-primary-v2 group-hover/btn-v2:btn-secondary-v2">
                Get help
              </LinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default NeedHelp;
