'use client';
import { CalendarIcon, ClockIcon } from '@/icons';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  author?: string;
  thumbnail?: any;
  tag?: string;
  readTime?: string;
  publishedAt?: string;
}

interface FeaturedBlogSwiperProps {
  featuredBlogs: SanityBlogPost[];
  isSanity?: boolean;
}

const FeaturedBlogSwiper = ({ featuredBlogs, isSanity = true }: FeaturedBlogSwiperProps) => {
  return (
    <RevealAnimation delay={0.3}>
      <div className="relative">
        <Swiper
          className="swiper blog-article-swiper"
          slidesPerView={1}
          loop={featuredBlogs.length > 1}
          effect="slide"
          speed={1000}
          spaceBetween={40}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.pagination-bullets',
            clickable: true,
            type: 'bullets',
          }}
          scrollbar={false}>
          <div className="swiper-wrapper">
            {featuredBlogs?.map((blog) => {
              const slug = isSanity ? blog.slug?.current : (blog as any).slug;
              const thumbnailUrl = isSanity && blog.thumbnail
                ? urlFor(blog.thumbnail).width(1200).height(550).url()
                : (blog as any).thumbnail;
              const publishDate = isSanity
                ? blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : 'No date'
                : (blog as any).publishDate;

              return (
                <SwiperSlide key={blog._id || slug}>
                  <article className="bg-background-1 dark:bg-background-5 scale-100 overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[99%] hover:transition-transform hover:duration-500">
                    <figure className="max-h-[550px] w-full overflow-hidden rounded-[20px]">
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          width={800}
                          height={550}
                        />
                      ) : (
                        <div className="h-[300px] w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </figure>
                    <div className="space-y-4 rounded-b-[20px] p-4 md:p-6 lg:p-8">
                      <div className="inline-block">
                        <span className="badge badge-cyan" aria-label="Article category">
                          {blog.tag || 'General'}
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <time
                          className="text-tagline-2 text-secondary/60 dark:text-accent/60 flex items-center gap-2 font-medium"
                          dateTime={blog.publishedAt || ''}>
                          <CalendarIcon className="size-5" />
                          {publishDate}
                        </time>
                        <div aria-hidden="true" className="bg-stroke-2 dark:bg-stroke-6 inline-block h-3 w-px" />
                        <time
                          className="text-tagline-2 text-secondary/60 dark:text-accent/60 flex items-center gap-2 font-medium"
                          dateTime="PT1M">
                          <ClockIcon className="size-5.5" />
                          {blog.readTime || '5 min read'}
                        </time>
                      </div>
                      <h3 className="sm:text-heading-5 text-tagline-1 font-normal">
                        <Link href={`/blog/${slug}`} aria-label={`Read full article about ${blog.title}`}>
                          {blog.title}
                        </Link>
                      </h3>
                      <div>
                        <LinkButton
                          btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2"
                          href={`/blog/${slug}`}>
                          Read more
                        </LinkButton>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </div>
          <div className="pagination-bullets mt-5 md:mt-14"></div>
        </Swiper>
      </div>
    </RevealAnimation>
  );
};

FeaturedBlogSwiper.displayName = 'FeaturedBlogSwiper';
export default FeaturedBlogSwiper;
