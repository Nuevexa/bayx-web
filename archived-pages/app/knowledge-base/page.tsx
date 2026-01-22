import KnowledgeBase from '@/components/knowledge-base/KnowledgeBase';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { client } from '@/sanity/lib/client';
import { allKnowledgeBaseArticlesQuery } from '@/sanity/lib/queries';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
    ...defaultMetadata,
    title: 'Knowledge Base - BayX Garage Management',
    description: 'Find step-by-step guides, tutorials, and answers to help you get the most out of BayX garage management software.',
};

// Revalidate every 60 seconds
export const revalidate = 60;

const KnowledgeBasePage = async () => {
    const articles = await client.fetch(allKnowledgeBaseArticlesQuery);

    return (
        <main className="bg-background-3 dark:bg-background-7">
            <KnowledgeBase articles={articles || []} />
            <CTAV1
                className="dark:bg-background-5 bg-white"
                badgeClass="hidden"
                ctaHeading="Can't find what you're looking for?"
                description="Reach out to our support team and we'll get back to you within 24 hours."
                ctaBtnText="Contact Support"
                ctaLink="/support"
            />
        </main>
    );
};

export default KnowledgeBasePage;
