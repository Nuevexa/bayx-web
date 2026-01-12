import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allBlogSlugsQuery, blogPostBySlugQuery } from '@/sanity/lib/queries';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CTAV1 from '@/components/shared/cta/CTAV1';
import RevealAnimation from '@/components/animation/RevealAnimation';
import ShareLink from '@/components/blog-details/ShareLink';
import { defaultMetadata } from '@/utils/generateMetaData';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(allBlogSlugsQuery);
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(blogPostBySlugQuery, { slug });

  if (!post) {
    return {
      ...defaultMetadata,
      title: 'Blog - BayX Garage Management',
    };
  }

  return {
    ...defaultMetadata,
    title: `${post.title} - BayX Blog`,
    description: post.description,
  };
}

// Custom Portable Text components for styling
const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-heading-4 md:text-heading-3 mt-12 mb-4 font-normal">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-heading-5 md:text-heading-4 mt-10 mb-3 font-normal">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-heading-6 md:text-heading-5 mt-8 mb-2 font-normal">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 my-8 italic text-secondary/80 dark:text-accent/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-secondary dark:text-accent">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary-500 underline hover:text-primary-600"
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(950).url()}
            alt={value.alt || 'Blog image'}
            width={950}
            height={500}
            className="rounded-2xl w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-secondary/60 dark:text-accent/60 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await client.fetch(blogPostBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const thumbnailUrl = post.thumbnail ? urlFor(post.thumbnail).width(1200).height(700).url() : null;
  const authorImageUrl = post.authorImage ? urlFor(post.authorImage).width(96).height(96).url() : '/images/ns-avatar-1.png';
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'No date';

  return (
    <main className="bg-background-3 dark:bg-background-7">
      <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[200px]">
        <div className="main-container">
          <div className="mx-auto max-w-[1209px] space-y-3">
            <RevealAnimation delay={0.1}>
              <h1 className="text-heading-3 md:text-heading-2 max-w-[884px]">{post.title}</h1>
            </RevealAnimation>
            <div className="flex items-center gap-3">
              <RevealAnimation delay={0.2}>
                <figure className="size-12 overflow-hidden rounded-full bg-[#ECEAED]">
                  <Image
                    src={authorImageUrl}
                    className="object-cover object-center"
                    alt={`${post.author || 'Author'}'s avatar`}
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                </figure>
              </RevealAnimation>
              <div>
                <RevealAnimation delay={0.3}>
                  <h3 className="text-tagline-1 font-medium">{post.author || 'BayX Team'}</h3>
                </RevealAnimation>
                <RevealAnimation delay={0.4}>
                  <time
                    dateTime={post.publishedAt}
                    className="text-tagline-2 text-secondary/60 dark:text-accent/60 flex items-center gap-2 font-normal">
                    {publishDate} <span>•</span> {post.readTime || '5 min read'}
                  </time>
                </RevealAnimation>
              </div>
            </div>
          </div>

          {thumbnailUrl && (
            <RevealAnimation delay={0.4}>
              <figure className="my-10 max-w-full overflow-hidden rounded-lg md:my-[70px] md:rounded-4xl">
                <Image
                  src={thumbnailUrl}
                  className="h-full w-full object-cover object-center"
                  alt={post.title}
                  width={1200}
                  height={700}
                  priority
                />
              </figure>
            </RevealAnimation>
          )}

          <RevealAnimation delay={0.5}>
            <article className="mx-auto max-w-[950px]">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-secondary/60 dark:text-accent/60">No content available.</p>
              )}
            </article>
          </RevealAnimation>

          <ShareLink />
        </div>
      </section>

      <CTAV1
        className="dark:bg-background-7 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Start your 14-day free trial."
        ctaBtnText="Start Free Trial"
      />
    </main>
  );
};

export default BlogDetailPage;
