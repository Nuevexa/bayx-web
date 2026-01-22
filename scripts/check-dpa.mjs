#!/usr/bin/env node

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

function loadEnvFile() {
    try {
        const envContent = readFileSync('.env.local', 'utf8')
        const env = {}
        envContent.split('\n').forEach(line => {
            line = line.trim()
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=')
                if (key && valueParts.length) {
                    env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
                }
            }
        })
        return env
    } catch (error) {
        console.error('❌ Could not read .env.local:', error.message)
        process.exit(1)
    }
}

const env = loadEnvFile()

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function main() {
    try {
        console.log('🔍 Checking for DPA document...\n')

        // Query all legal documents
        const allDocs = await client.fetch(`*[_type == "legalDocument"]{_id, documentType, title, publishStatus}`)

        console.log('📄 All legal documents in Sanity:')
        allDocs.forEach(doc => {
            console.log(`  - ${doc.title} (${doc.documentType}) - Status: ${doc.publishStatus}`)
        })

        console.log('\n🔍 Looking specifically for DPA...')

        // Query specifically for DPA
        const dpa = await client.fetch(
            `*[_type == "legalDocument" && documentType == "data-processing-agreement" && publishStatus == "published"][0]`
        )

        if (dpa) {
            console.log('✅ DPA document found!')
            console.log(`   Title: ${dpa.title}`)
            console.log(`   ID: ${dpa._id}`)
            console.log(`   Sections: ${dpa.sections?.length || 0}`)
        } else {
            console.log('❌ No published DPA found')

            // Check for drafts
            const draftDPA = await client.fetch(
                `*[_type == "legalDocument" && documentType == "data-processing-agreement"][0]`
            )

            if (draftDPA) {
                console.log(`⚠️  Found unpublished DPA with status: ${draftDPA.publishStatus}`)
                console.log('💡 You may need to publish it in Sanity Studio')
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message)
    }
}

main()
