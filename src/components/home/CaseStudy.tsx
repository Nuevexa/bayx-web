import { ICaseStudy } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const CaseStudy = () => {
  const caseStudyData = getMarkDownData<ICaseStudy & { [key: string]: unknown }>('src/data/case-study').filter(
    (project) => project.showHomePage === true,
  );

  return (
    <section className="py-16 lg:py-20 xl:py-25">
      <div className="main-container">
        <div className="mb-10 text-center lg:mb-[70px]">
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h2 className="">See how BayX transforms your shop.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="mx-auto max-w-[680px]">
                From chaos to clarity - here&apos;s what changes when you run on BayX.
              </p>
            </RevealAnimation>
          </div>
        </div>
        <div className="mb-14">
          <div className="grid grid-cols-12 gap-y-14 lg:gap-x-14">
            <RevealAnimation delay={0.3}>
              <div className="col-span-12">
                <figure className="space-y-6">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[0]?.thumbnail || ''}
                      fill
                      priority
                      className="h-full w-full rounded-[20px] object-cover"
                      alt="portfolio"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">{caseStudyData[0].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[0].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="col-span-12 lg:col-span-6">
                <figure className="space-y-6">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[2]?.thumbnail || ''}
                      className="h-full w-full rounded-[20px] object-cover"
                      alt="portfolio"
                      fill
                      priority
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">
                      {caseStudyData[2].title || ''}
                    </h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[2].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="col-span-12 lg:col-span-6">
                <figure className="space-y-6">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[3]?.thumbnail || ''}
                      fill
                      priority
                      alt="portfolio"
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">{caseStudyData[3].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[3].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="col-span-12">
                <figure className="space-y-6">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[1]?.thumbnail || ''}
                      fill
                      priority
                      className="h-full w-full rounded-[20px] object-cover"
                      alt="portfolio"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5">{caseStudyData[1].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[1].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>
          </div>
        </div>

        <RevealAnimation delay={0.2}>
          <div className="group text-center">
            <LinkButton href="/early-access" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
              Join Early Access
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

CaseStudy.displayName = 'CaseStudy';
export default CaseStudy;
