import CTAV1 from '@/components/shared/cta/CTAV1';
import RevealAnimation from '@/components/animation/RevealAnimation';
import BlogCard from '@/components/blog/BlogCard';
import { client } from '@/sanity/lib/client';
import { allBlogPostsQuery, featuredBlogPostsQuery } from '@/sanity/lib/queries';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import FeaturedBlogSwiper from '@/components/blog/FeaturedBlogSwiper';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Blog - BayX Garage Management Resources',
};

// Revalidate every 60 seconds
export const revalidate = 60;

const BlogPage = async () => {
  const [allBlogs, featuredBlogs] = await Promise.all([
    client.fetch(allBlogPostsQuery),
    client.fetch(featuredBlogPostsQuery),
  ]);

  const hasSanityBlogs = allBlogs && allBlogs.length > 0;

  return (
    <main className="bg-background-4 dark:bg-background-9">
      {/* Featured Section */}
      <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
        <div className="main-container">
          <div className="space-y-14 md:space-y-[70px]">
            <div className="mx-auto max-w-[700px] space-y-3 text-center">
              <RevealAnimation delay={0.1}>
                <h2>Resources for Garage Owners</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p>Tips, guides, and insights to help you run a more profitable shop.</p>
              </RevealAnimation>
            </div>
            {hasSanityBlogs && featuredBlogs.length > 0 && (
              <FeaturedBlogSwiper featuredBlogs={featuredBlogs} isSanity={true} />
            )}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
        <div className="main-container">
          <div className="mb-10 space-y-3 text-center md:mb-[70px]">
            <RevealAnimation delay={0.1}>
              <h2>
                All <span className="text-primary-500 inline-block">Articles</span>
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="mx-auto max-w-[738px]">
                Practical advice for independent garage owners. From profitability tips to workflow optimization,
                we share what works in real shops.
              </p>
            </RevealAnimation>
          </div>

          {hasSanityBlogs ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allBlogs.map((blog: any) => (
                <BlogCard key={blog._id} blog={blog} isSanity={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-secondary/60 dark:text-accent/60">
                No blog posts yet. Visit <a href="/studio" className="text-primary-500 underline">/studio</a> to create your first post.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTAV1
        className="dark:bg-background-7 bg-white"
        badgeClass="hidden"
        ctaHeading="Ready to see your shop's true profit?"
        description="Join our early access program today."
        ctaBtnText="Get Early Access"
      />
    </main>
  );
};

export default BlogPage;
