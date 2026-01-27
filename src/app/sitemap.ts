import { client } from '@/sanity/lib/client';
import { allBlogPostsQuery } from '@/sanity/lib/queries';
import getMarkDownData from '@/utils/getMarkDownData';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://getbayx.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/features`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/support`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/early-access`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms-conditions`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/refund-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/data-processing-agreement`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Fetch Blog Posts
    try {
        const blogs = await client.fetch(allBlogPostsQuery);
        const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
            url: `${BASE_URL}/blog/${blog.slug.current}`,
            lastModified: new Date(blog.publishedAt),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
        routes.push(...blogRoutes);
    } catch (error) {
        console.error('Error fetching blog sitemap data:', error);
    }

    // Fetch Feature Pages (Markdown)
    try {
        const featurePages = getMarkDownData('src/data/services');
        const featureRoutes: MetadataRoute.Sitemap = featurePages.map((feature: any) => ({
            url: `${BASE_URL}/features/${feature.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
        routes.push(...featureRoutes);
    } catch (error) {
        console.error('Error fetching features sitemap data:', error);
    }

    return routes;
}
