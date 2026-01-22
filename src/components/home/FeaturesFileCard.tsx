import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import estimateApproval from '@public/landing-4.png';

const FeaturesFileCard = () => {
  return (
    <RevealAnimation delay={0.2}>
      <div className="space-y-8 rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8">
        <div className="bg-background-12 relative overflow-hidden rounded-2xl">
          <Image src={estimateApproval} alt="Estimates and approvals" className="h-full w-full scale-[1.01] object-cover" />
        </div>
        <RevealAnimation delay={0.1} start="top 97%">
          <div className="relative z-20 max-md:space-y-0.5">
            <h3 className="text-heading-6 md:text-heading-5">Estimates and approvals ready.</h3>
            <p className="max-w-[450px]">
              Create professional estimates in minutes. Customers review and approve online instantly.
            </p>
          </div>
        </RevealAnimation>
      </div>
    </RevealAnimation>
  );
};

FeaturesFileCard.displayName = 'FeaturesFileCard';
export default FeaturesFileCard;
