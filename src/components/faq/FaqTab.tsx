import RevealAnimation from '../animation/RevealAnimation';
import GeneralTab from './GeneralTab';

const FaqTab = () => {
  return (
    <section className="pt-32 pb-[100px] sm:pt-36 md:pt-42 xl:pt-[180px]">
      <div className="main-container">
        <div className="space-y-5 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green">FAQ</span>
          </RevealAnimation>
          <div className="space-y-3 text-center">
            <RevealAnimation delay={0.3}>
              <h2>Frequently Asked Questions</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="mx-auto max-w-[600px]">
                Find quick answers to common questions about BayX features, pricing, and getting started with your shop management.
              </p>
            </RevealAnimation>
          </div>
        </div>
        <RevealAnimation delay={0.5}>
          <div className="py-[70px]">
            <GeneralTab />
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default FaqTab;
