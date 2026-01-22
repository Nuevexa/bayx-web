import { IService } from '@/interface';
import newArrowWhite from '@public/images/icons/new-arrow-white.svg';
import serviceImage from '@public/landing-6.png';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

interface BeforeAfterServiceImgProps {
  service?: IService;
}

const BeforeAfterServiceImg = ({ service }: BeforeAfterServiceImgProps) => {
  return (
    <RevealAnimation delay={0.3} direction="right">
      <div className="group/card-img col-span-12 lg:col-span-6">
        <div className="bg-background-12 border-background-12 grid h-full grid-cols-12 gap-y-16 rounded-3xl border p-5 md:gap-6 md:p-8">
          <aside className="col-span-12 flex flex-col justify-between space-y-5 pt-14 md:col-span-6">
            <blockquote className="space-y-2">
              <h3 className="text-heading-5 md:text-heading-4">{service?.title}</h3>
              <p className="text-tagline-1 text-secondary/60">{service?.description}</p>
            </blockquote>
            <Link
              href={`/features/${service?.slug}`}
              className="hover:bg-primary-500 group bg-secondary relative flex h-10 w-18 items-center justify-center space-y-5 overflow-hidden rounded-[40px] p-4 ring-8 ring-white transition-all duration-500 ease-in-out md:h-13 md:w-22 md:p-5">
              <figure className="relative size-6 items-center justify-center overflow-hidden">
                <Image
                  src={newArrowWhite}
                  alt="new-arrow"
                  className="absolute inset-0 size-full -translate-x-6 object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-1"
                />
                <Image
                  src={newArrowWhite}
                  alt="new-arrow"
                  className="size-full object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-6"
                />
              </figure>
            </Link>
          </aside>
          <figure className="col-span-12 mx-auto w-full overflow-hidden rounded-lg transition-transform duration-500 ease-in-out group-hover/card-img:scale-105 md:col-span-6 md:rounded-[20px]">
            <Image src={serviceImage} alt="Service feature" className="h-full w-full scale-[1.01] object-cover" />
          </figure>
        </div>
      </div>
    </RevealAnimation>
  );
};

BeforeAfterServiceImg.displayName = 'BeforeAfterServiceImg';
export default BeforeAfterServiceImg;
