/**
 * Script to delete all FAQ items from Sanity
 * Run with: npx sanity exec scripts/delete-all-faq.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function deleteAllFaq() {
    console.log('Fetching all FAQ items...');

    const faqItems = await client.fetch('*[_type == "faqItem"]._id');
    console.log(`Found ${faqItems.length} FAQ items to delete\n`);

    for (const id of faqItems) {
        try {
            await client.delete(id);
            console.log(`  ✓ Deleted: ${id}`);
        } catch (error: any) {
            console.error(`  ✗ Error deleting ${id}: ${error.message}`);
        }
    }

    console.log('\n✅ All FAQ items deleted!');
}

deleteAllFaq().catch(console.error);
