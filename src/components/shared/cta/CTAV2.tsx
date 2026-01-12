import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/Button';
import { cn } from '@/utils/cn';
import CTACheckList from './CTACheckList';
interface CTAV2Props {
  className?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaBtnText?: string;
  btnClass?: string;
  spanText?: string;
  ctaCheckListData: {
    id: string;
    text: string;
  }[];
}
const CTAV2 = ({
  className,
  ctaHeading,
  ctaDescription,
  ctaBtnText,
  btnClass,
  spanText,
  ctaCheckListData,
}: CTAV2Props) => {
  return (
    <section
      className={cn('pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]', className)}>
      <div className="main-container">
        <div className="text-center">
          <RevealAnimation delay={0.1}>
            <h2 className="mx-auto mb-3 max-w-[810px] text-center">
              {ctaHeading} {spanText && <span className="text-primary-500">{spanText}</span>}
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="mx-auto mb-8 lg:max-w-[390px]">{ctaDescription}</p>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <div className="text-center md:inline-block">
              <div>
                <LinkButton
                  href="/contact-us"
                  btnClass={cn('btn-lg-v2 btn-primary-v2 group-hover/btn-v2:btn-v2-white', btnClass)}>
                  {ctaBtnText}
                </LinkButton>
              </div>
            </div>
          </RevealAnimation>
          <CTACheckList
            listClass="gap-3"
            listAnimationDelay={0.3}
            className="mt-5 flex flex-wrap items-center justify-center gap-[42px] max-lg:gap-5 md:mt-8"
            ctaCheckListData={ctaCheckListData}
          />
        </div>
      </div>
    </section>
  );
};

CTAV2.displayName = 'CTAV2';
export default CTAV2;
