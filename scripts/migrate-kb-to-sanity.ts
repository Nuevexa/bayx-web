/**
 * Migration script to convert Knowledge Base markdown files to Sanity documents
 * Run with: npx sanity exec scripts/migrate-kb-to-sanity.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Get client with user's authenticated session
const client = getCliClient();

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

        if (!trimmedLine) {
            flushParagraph();
            continue;
        }

        // Skip code blocks (simplified - just treat as text)
        if (trimmedLine.startsWith('```')) {
            continue;
        }

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
        } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\./.test(trimmedLine)) {
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
        } else if (trimmedLine.startsWith('|')) {
            // Skip table rows
            continue;
        } else {
            currentParagraph.push(trimmedLine);
        }
    }

    flushParagraph();
    return blocks;
}

function generateKey(): string {
    return Math.random().toString(36).substring(2, 12);
}

function parseInlineMarks(text: string): any[] {
    const cleanText = text
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1');

    return [{
        _type: 'span',
        _key: generateKey(),
        text: cleanText,
        marks: [],
    }];
}

async function migrateKnowledgeBaseArticles() {
    const kbDir = path.join(process.cwd(), 'src/data/knowledge-base');

    if (!fs.existsSync(kbDir)) {
        console.log('No knowledge-base directory found at', kbDir);
        return;
    }

    const files = fs.readdirSync(kbDir).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} knowledge base articles to migrate\n`);

    for (const file of files) {
        const filePath = path.join(kbDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content: markdownBody } = matter(content);

        const slug = frontmatter.slug || file.replace('.md', '');
        console.log(`Migrating: ${frontmatter.title || slug}`);

        const body = markdownToPortableText(markdownBody);

        const document = {
            _type: 'knowledgeBaseArticle',
            title: frontmatter.title || slug,
            slug: { _type: 'slug', current: slug },
            category: frontmatter.category || 'getting-started',
            summary: frontmatter.summary || '',
            order: frontmatter.order || 0,
            publishedAt: new Date().toISOString(),
            body: body,
        };

        try {
            const result = await client.create(document);
            console.log(`  ✓ Created with ID: ${result._id}`);
        } catch (error: any) {
            console.error(`  ✗ Error: ${error.message}`);
        }
    }

    console.log('\n✅ Knowledge Base migration complete!');
}

migrateKnowledgeBaseArticles().catch(console.error);
