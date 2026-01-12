'use client';

import { CalendarIcon, ClockIcon } from '@/icons';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
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

interface BlogCardProps {
  blog: SanityBlogPost;
  isSanity?: boolean;
}

export const BlogCard = ({ blog, isSanity = true }: BlogCardProps) => {
  const slug = isSanity ? blog.slug?.current : (blog as any).slug;
  const thumbnailUrl = isSanity && blog.thumbnail
    ? urlFor(blog.thumbnail).width(620).height(620).url()
    : (blog as any).thumbnail;
  const publishDate = isSanity
    ? blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : 'No date'
    : (blog as any).publishDate;

  return (
    <article className="group">
      <div className="bg-background-1 dark:bg-background-5 relative scale-100 overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500">
        <figure className="h-[250px] max-w-full overflow-hidden rounded-b-[20px] xl:h-[310px]">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={blog.title || 'Blog post thumbnail'}
              loading="lazy"
              className="h-full w-full object-cover object-center"
              width={310}
              height={310}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
          <div className="flex items-center gap-4">
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
          <h3 className="sm:text-heading-5 text-tagline-1 line-clamp-1 font-normal">
            <Link
              href={`/blog/${slug}`}
              aria-label={`Read full article about ${blog.title}`}>
              {blog.title}
            </Link>
          </h3>
          <div className="mt-8">
            <LinkButton href={`/blog/${slug}`} btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2">
              Read more
            </LinkButton>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
