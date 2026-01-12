import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allKnowledgeBaseSlugsQuery, knowledgeBaseArticleBySlugQuery } from '@/sanity/lib/queries';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RevealAnimation from '@/components/animation/RevealAnimation';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
    const slugs = await client.fetch(allKnowledgeBaseSlugsQuery);
    return slugs.map((item: { slug: string }) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await client.fetch(knowledgeBaseArticleBySlugQuery, { slug });

    if (!article) {
        return {
            ...defaultMetadata,
            title: 'Knowledge Base - BayX',
        };
    }

    return {
        ...defaultMetadata,
        title: `${article.title} - BayX Knowledge Base`,
        description: article.summary,
    };
}

const CATEGORY_LABELS: Record<string, string> = {
    'getting-started': 'Getting Started',
    'jobs-workflow': 'Jobs & Workflow',
    'billing': 'Billing & Payments',
    'technicians': 'Technicians',
    'customers': 'Customers',
    'troubleshooting': 'Troubleshooting',
};

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
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-secondary dark:text-accent">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
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
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || 'Article image'}
                        width={800}
                        height={450}
                        className="rounded-2xl w-full h-auto"
                    />
                </figure>
            );
        },
    },
};

const KnowledgeBaseArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const article = await client.fetch(knowledgeBaseArticleBySlugQuery, { slug });

    if (!article) {
        notFound();
    }

    return (
        <main className="bg-background-3 dark:bg-background-7">
            <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
                <div className="main-container">
                    {/* Back Link */}
                    <RevealAnimation delay={0.1}>
                        <Link
                            href="/knowledge-base"
                            className="inline-flex items-center gap-2 text-secondary/60 dark:text-accent/60 hover:text-primary-500 transition-colors mb-8"
                        >
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Knowledge Base
                        </Link>
                    </RevealAnimation>

                    {/* Header */}
                    <div className="max-w-[850px] mb-12">
                        <RevealAnimation delay={0.2}>
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-tagline-3 font-medium mb-4">
                                {CATEGORY_LABELS[article.category] || article.category}
                            </span>
                        </RevealAnimation>
                        <RevealAnimation delay={0.3}>
                            <h1 className="text-heading-3 md:text-heading-2">{article.title}</h1>
                        </RevealAnimation>
                        {article.summary && (
                            <RevealAnimation delay={0.4}>
                                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 mt-4">
                                    {article.summary}
                                </p>
                            </RevealAnimation>
                        )}
                    </div>

                    {/* Content */}
                    <RevealAnimation delay={0.5}>
                        <article className="max-w-[850px]">
                            {article.body ? (
                                <PortableText value={article.body} components={portableTextComponents} />
                            ) : (
                                <p className="text-secondary/60 dark:text-accent/60">No content available.</p>
                            )}
                        </article>
                    </RevealAnimation>

                    {/* Helpful? Section */}
                    <RevealAnimation delay={0.6}>
                        <div className="max-w-[850px] mt-16 pt-8 border-t border-stroke-2 dark:border-stroke-7">
                            <p className="text-tagline-1 font-medium text-secondary dark:text-accent mb-4">
                                Was this article helpful?
                            </p>
                            <div className="flex gap-3">
                                <button className="px-6 py-2 rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors">
                                    👍 Yes
                                </button>
                                <button className="px-6 py-2 rounded-full bg-background-2 dark:bg-background-6 text-secondary/60 dark:text-accent/60 hover:bg-background-3 dark:hover:bg-background-5 transition-colors">
                                    👎 No
                                </button>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
            </section>

            <CTAV1
                className="dark:bg-background-5 bg-white"
                badgeClass="hidden"
                ctaHeading="Still need help?"
                description="Our support team is here to assist you."
                ctaBtnText="Contact Support"
                ctaLink="/support"
            />
        </main>
    );
};

export default KnowledgeBaseArticlePage;
