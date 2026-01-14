import { CheckIcon } from '@/icons';
import { cn } from '@/utils/cn';
import aboutBg from '@public/images/ns-img-14.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

interface FeatureItem {
  id: string;
  text: string;
}

const Feature = ({ className, btnClassName }: { className?: string; btnClassName?: string }) => {
  const features: FeatureItem[] = [
    {
      id: 'stop-leaking-profit',
      text: 'Stop leaking profit on jobs you thought were profitable',
    },
    {
      id: 'know-vehicle-status',
      text: 'Know exactly where every vehicle stands without walking the floor',
    },
    {
      id: 'customer-transparency',
      text: 'Give customers real-time updates so they stop calling for status',
    },
    {
      id: 'tech-accountability',
      text: 'Track technician efficiency and hold your team accountable',
    },
  ];

  return (
    <section className={className}>
      <RevealAnimation delay={0.2}>
        <div className="main-container">
          <div className="relative z-10">
            <div className="absolute top-0 right-0 bottom-0 left-0 -z-10 overflow-hidden rounded-[20px]">
              <Image src={aboutBg} alt="BayX features background" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-5 px-6 py-14 max-lg:grid-cols-1 max-sm:gap-10 lg:px-11">
              <div className="max-w-[500px]">
                <h2 className="text-accent sm:text-heading-5 text-heading-6 mb-8">
                  Built for garage owners who are tired of guessing where their money goes.
                </h2>
                <LinkButton
                  href="/early-access"
                  btnClass={cn('btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2', btnClassName)}>
                  Join Early Access
                </LinkButton>
              </div>
              <div>
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-2">
                      <span className="bg-accent/17 dark:bg-accent/10 flex size-5 shrink-0 items-center justify-center rounded-full">
                        <CheckIcon className="dark:fill-accent" />
                      </span>
                      <span className="text-accent">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

export default Feature;
