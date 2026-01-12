/**
 * Migration script to convert FAQ JSON to Sanity documents
 * Run with: npx sanity exec scripts/migrate-faq-to-sanity.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';
import * as fs from 'fs';
import * as path from 'path';

// Get client with user's authenticated session
const client = getCliClient();

interface FaqItem {
    question: string;
    answer: string;
    category: string;
    order: number;
}

async function migrateFaqItems() {
    const faqPath = path.join(process.cwd(), 'src/data/json/faq/faq.json');

    if (!fs.existsSync(faqPath)) {
        console.log('No FAQ file found at', faqPath);
        return;
    }

    const faqData: FaqItem[] = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));
    console.log(`Found ${faqData.length} FAQ items to migrate\n`);

    for (const faq of faqData) {
        console.log(`Migrating: ${faq.question.substring(0, 50)}...`);

        const document = {
            _type: 'faqItem',
            question: faq.question,
            answer: faq.answer,
            category: faq.category || 'general',
            order: faq.order || 0,
        };

        try {
            const result = await client.create(document);
            console.log(`  ✓ Created with ID: ${result._id}`);
        } catch (error: any) {
            console.error(`  ✗ Error: ${error.message}`);
        }
    }

    console.log('\n✅ FAQ migration complete!');
}

migrateFaqItems().catch(console.error);
