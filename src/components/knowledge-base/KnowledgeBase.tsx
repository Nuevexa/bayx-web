'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

interface Article {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    summary: string;
    publishedAt?: string;
}

interface KnowledgeBaseProps {
    articles: Article[];
}

const CATEGORIES = [
    { value: 'all', label: 'All Topics' },
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'jobs-workflow', label: 'Jobs & Workflow' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technicians', label: 'Technicians' },
    { value: 'customers', label: 'Customers' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
];

const ITEMS_PER_PAGE = 10;

const getCategoryLabel = (value: string) => {
    return CATEGORIES.find(c => c.value === value)?.label || value;
};

const KnowledgeBase = ({ articles }: KnowledgeBaseProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesSearch =
                searchQuery === '' ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                activeCategory === 'all' || article.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [articles, searchQuery, activeCategory]);

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        // Scroll to top of articles list
        document.getElementById('articles-list')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="pt-32 pb-[100px] sm:pt-36 md:pt-42 xl:pt-[180px]">
            <div className="main-container">
                {/* Header */}
                <div className="space-y-5 text-center mb-12">
                    <RevealAnimation delay={0.2}>
                        <span className="badge badge-green">Knowledge Base</span>
                    </RevealAnimation>
                    <div className="space-y-3 text-center">
                        <RevealAnimation delay={0.3}>
                            <h2>How can we help you?</h2>
                        </RevealAnimation>
                        <RevealAnimation delay={0.4}>
                            <p className="mx-auto max-w-[600px]">
                                Find step-by-step guides, tutorials, and answers to help you get the most out of BayX.
                            </p>
                        </RevealAnimation>
                    </div>
                </div>

                {/* Search */}
                <RevealAnimation delay={0.5}>
                    <div className="max-w-[600px] mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-secondary/60 dark:placeholder:text-accent/60 text-secondary dark:text-accent block h-14 w-full rounded-full border pl-14 pr-6 text-tagline-1 font-normal placeholder:font-normal focus:ring-0 focus:outline-none"
                            />
                            <svg
                                className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-secondary/40 dark:text-accent/40"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </RevealAnimation>

                {/* Category Tabs */}
                <RevealAnimation delay={0.6}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setActiveCategory(category.value)}
                                className={`px-4 py-2 rounded-full text-tagline-2 font-medium transition-all duration-300 ${activeCategory === category.value
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-background-2 dark:bg-background-6 text-secondary dark:text-accent hover:bg-background-3 dark:hover:bg-background-5'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </RevealAnimation>

                {/* Results count */}
                {filteredArticles.length > 0 && (
                    <div className="max-w-[850px] mx-auto mb-6">
                        <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">
                            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} articles
                        </p>
                    </div>
                )}

                {/* Articles List */}
                <RevealAnimation delay={0.7}>
                    <div id="articles-list" className="max-w-[850px] mx-auto">
                        {paginatedArticles.length > 0 ? (
                            <div className="space-y-4">
                                {paginatedArticles.map((article) => (
                                    <Link
                                        key={article._id}
                                        href={`/knowledge-base/${article.slug.current}`}
                                        className="block group"
                                    >
                                        <div className="bg-white dark:bg-background-7 rounded-[20px] p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <span className="inline-block px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-tagline-3 font-medium mb-3">
                                                        {getCategoryLabel(article.category)}
                                                    </span>
                                                    <h3 className="text-heading-6 sm:text-heading-5 font-normal text-secondary dark:text-accent group-hover:text-primary-500 transition-colors">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 mt-2 line-clamp-2">
                                                        {article.summary}
                                                    </p>
                                                </div>
                                                <div className="shrink-0 mt-2">
                                                    <svg
                                                        className="size-5 text-secondary/30 dark:text-accent/30 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-heading-5 mb-2">No articles found</h3>
                                <p className="text-secondary/60 dark:text-accent/60 max-w-[400px] mx-auto">
                                    {articles.length === 0
                                        ? 'No articles have been published yet. Check back soon!'
                                        : 'Try adjusting your search or filter to find what you\'re looking for.'}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setActiveCategory('all');
                                        }}
                                        className="mt-4 text-primary-500 underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-full bg-background-2 dark:bg-background-6 text-secondary dark:text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background-3 dark:hover:bg-background-5 transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`w-10 h-10 rounded-full font-medium transition-all duration-300 ${currentPage === page
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-background-2 dark:bg-background-6 text-secondary dark:text-accent hover:bg-background-3 dark:hover:bg-background-5'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-full bg-background-2 dark:bg-background-6 text-secondary dark:text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background-3 dark:hover:bg-background-5 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </RevealAnimation>
            </div>
        </section>
    );
};

export default KnowledgeBase;
