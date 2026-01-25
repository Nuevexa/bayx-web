/**
 * Migration script to convert markdown blog posts to Sanity documents
 * Run with: npx tsx scripts/migrate-blogs-to-sanity.ts
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Sanity client with write access
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '49v86oin',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

// Helper to convert markdown text to Portable Text blocks
function markdownToPortableText(markdown: string): any[] {
    const blocks: any[] = [];
    const lines = markdown.split('\n');
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            const text = currentParagraph.join(' ').trim();
            if (text) {
                blocks.push({
                    _type: 'block',
                    _key: generateKey(),
                    style: 'normal',
                    markDefs: [],
                    children: parseInlineMarks(text),
                });
            }
            currentParagraph = [];
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Skip empty lines
        if (!trimmedLine) {
            flushParagraph();
            continue;
        }

        // Headers
        if (trimmedLine.startsWith('####')) {
            flushParagraph();
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'h4',
                markDefs: [],
                children: parseInlineMarks(trimmedLine.replace(/^####\s*/, '')),
            });
        } else if (trimmedLine.startsWith('###')) {
            flushParagraph();
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'h3',
                markDefs: [],
                children: parseInlineMarks(trimmedLine.replace(/^###\s*/, '')),
            });
        } else if (trimmedLine.startsWith('##')) {
            flushParagraph();
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'h2',
                markDefs: [],
                children: parseInlineMarks(trimmedLine.replace(/^##\s*/, '')),
            });
        }
        // List items (simplified - treats them as paragraphs)
        else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\./.test(trimmedLine)) {
            flushParagraph();
            const listText = trimmedLine.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'normal',
                markDefs: [],
                children: [
                    { _type: 'span', _key: generateKey(), text: '• ' + listText, marks: [] },
                ],
            });
        }
        // Blockquote
        else if (trimmedLine.startsWith('>')) {
            flushParagraph();
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'blockquote',
                markDefs: [],
                children: parseInlineMarks(trimmedLine.replace(/^>\s*/, '')),
            });
        }
        // Table (skip for now - convert to paragraph)
        else if (trimmedLine.startsWith('|')) {
            // Skip table rows
            continue;
        }
        // Regular paragraph
        else {
            currentParagraph.push(trimmedLine);
        }
    }

    flushParagraph();
    return blocks;
}

// Generate a random key for Portable Text
function generateKey(): string {
    return Math.random().toString(36).substring(2, 12);
}

// Parse inline marks (bold, italic) - simplified version
function parseInlineMarks(text: string): any[] {
    const children: any[] = [];

    // Simple regex to handle **bold** and *italic*
    // For simplicity, we'll just strip the marks and add as plain text
    // A full implementation would track mark positions

    const cleanText = text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
        .replace(/\*([^*]+)\*/g, '$1')     // Remove italic markers
        .replace(/`([^`]+)`/g, '$1');       // Remove code markers

    children.push({
        _type: 'span',
        _key: generateKey(),
        text: cleanText,
        marks: [],
    });

    return children;
}

async function migrateBlogPosts() {
    const blogsDir = path.join(process.cwd(), 'src/data/blogs');

    // Check if directory exists
    if (!fs.existsSync(blogsDir)) {
        console.log('No blogs directory found at', blogsDir);
        return;
    }

    const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

    console.log(`Found ${files.length} blog posts to migrate\n`);

    for (const file of files) {
        const filePath = path.join(blogsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content: markdownBody } = matter(content);

        const slug = file.replace('.md', '');

        console.log(`Migrating: ${frontmatter.title || slug}`);

        // Convert markdown body to Portable Text
        const body = markdownToPortableText(markdownBody);

        // Create the Sanity document
        const document = {
            _type: 'blogPost',
            title: frontmatter.title || slug,
            slug: {
                _type: 'slug',
                current: slug,
            },
            description: frontmatter.description || '',
            author: frontmatter.author || 'BayX Team',
            tag: frontmatter.tag || 'tips',
            readTime: frontmatter.readTime || '5 min read',
            publishedAt: frontmatter.publishDate
                ? new Date(frontmatter.publishDate).toISOString()
                : new Date().toISOString(),
            body: body,
            // Note: Images need to be uploaded separately
            // thumbnail and authorImage are skipped for now
        };

        try {
            const result = await client.create(document);
            console.log(`  ✓ Created with ID: ${result._id}`);
        } catch (error: any) {
            console.error(`  ✗ Error: ${error.message}`);
        }
    }

    console.log('\n✅ Migration complete!');
    console.log('\nNote: Thumbnail images were not migrated.');
    console.log('You can add them manually in the Sanity Studio at /studio');
}

// Run migration
migrateBlogPosts().catch(console.error);

//