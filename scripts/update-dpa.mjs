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

if (!env.SANITY_API_WRITE_TOKEN || !env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
}

console.log('✅ Environment loaded successfully')

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const txt = (text) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text }],
    markDefs: [],
})

const bullet = (text) => ({
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    children: [{ _type: 'span', text }],
    markDefs: [],
    level: 1,
})

const dpaSections = [
    {
        sectionTitle: 'DEFINITIONS',
        sectionId: { current: 'definitions', _type: 'slug' },
        order: 1,
        sectionContent: [
            txt('"Personal Data" means any information relating to an identified or identifiable person that the Customer uploads to the Platform.'),
            txt('"Processing" means any operation performed on Personal Data, including collection, storage, use, disclosure, or deletion.'),
            txt('"Applicable Data Protection Law" means GDPR, UK GDPR, India DPDP Act 2023, and other applicable privacy laws.'),
            txt('"Sub-processor" means any third party We engage to process Personal Data.'),
        ],
    },
    {
        sectionTitle: 'ROLES AND SCOPE',
        sectionId: { current: 'roles-and-scope', _type: 'slug' },
        order: 2,
        sectionContent: [
            txt('You (Customer) are the Controller who determines how and why Personal Data is processed.'),
            txt('We (Provider) are the Processor who processes Personal Data only on Your behalf and according to Your instructions.'),
            txt('This DPA applies to all Personal Data processed through the BayX Platform, including customer records, vehicle information, service history, and communications.'),
        ],
    },
    {
        sectionTitle: 'PROCESSING INSTRUCTIONS',
        sectionId: { current: 'processing-instructions', _type: 'slug' },
        order: 3,
        sectionContent: [
            txt('We will process Personal Data only:'),
            bullet('To provide the BayX Services as described in the Terms of Service'),
            bullet('According to Your instructions through use of the Platform'),
            bullet('As You direct in writing to privacy@bayx.app'),
            bullet('As required by law'),
            txt('If we believe any instruction violates data protection law, we will notify You immediately.'),
        ],
    },
    {
        sectionTitle: 'YOUR RESPONSIBILITIES (CONTROLLER)',
        sectionId: { current: 'your-responsibilities-controller', _type: 'slug' },
        order: 4,
        sectionContent: [
            txt('You represent and warrant that:'),
            bullet('You have lawful bases to collect and process Personal Data'),
            bullet('You have obtained necessary consents from individuals'),
            bullet('You have provided privacy notices to individuals'),
            bullet('Your instructions comply with applicable data protection laws'),
        ],
    },
    {
        sectionTitle: 'OUR OBLIGATIONS (PROCESSOR)',
        sectionId: { current: 'our-obligations-processor', _type: 'slug' },
        order: 5,
        sectionContent: [
            txt('We will:'),
            bullet('Process Personal Data only per Your instructions'),
            bullet('Keep Personal Data confidential'),
            bullet('Implement appropriate security measures'),
            bullet('Assist You with data subject rights requests'),
            bullet('Notify You of data breaches within 72 hours'),
            bullet('Delete or return Personal Data upon termination'),
        ],
    },
    {
        sectionTitle: 'SECURITY MEASURES',
        sectionId: { current: 'security-measures', _type: 'slug' },
        order: 6,
        sectionContent: [
            txt('We implement industry-standard security measures including:'),
            bullet('Encryption of data in transit (TLS 1.2+)'),
            bullet('Access controls and authentication'),
            bullet('Regular security monitoring and updates'),
            bullet('Automated backups and disaster recovery'),
            bullet('Security assessments of Sub-processors'),
        ],
    },
    {
        sectionTitle: 'SUB-PROCESSORS',
        sectionId: { current: 'sub-processors', _type: 'slug' },
        order: 7,
        sectionContent: [
            txt('We use the following types of Sub-processors:'),
            bullet('Cloud hosting providers (US, Europe, or Singapore)'),
            bullet('Email delivery services'),
            bullet('Payment processors'),
            bullet('Analytics and monitoring tools'),
            txt('Current Sub-processor list available at: privacy@bayx.app'),
            txt('Notice of Changes: We will notify You 30 days before adding new Sub-processors. You may object within 14 days if You have reasonable data protection concerns.'),
        ],
    },
    {
        sectionTitle: 'DATA SUBJECT RIGHTS',
        sectionId: { current: 'data-subject-rights', _type: 'slug' },
        order: 8,
        sectionContent: [
            txt('We will assist You in responding to requests from individuals to access, correct, delete, or export their Personal Data by providing Platform tools and responding to Your requests within 10 business days.'),
            txt('If an individual contacts us directly, we will redirect them to You.'),
        ],
    },
    {
        sectionTitle: 'DATA BREACHES',
        sectionId: { current: 'data-breaches', _type: 'slug' },
        order: 9,
        sectionContent: [
            txt('If a security breach affects Your Personal Data, we will notify You within 72 hours and provide details of what happened, what data was affected, and what steps we\'re taking to address it.'),
            txt('You remain responsible for determining whether to notify authorities or affected individuals per applicable law.'),
        ],
    },
    {
        sectionTitle: 'INTERNATIONAL DATA TRANSFERS',
        sectionId: { current: 'international-data-transfers', _type: 'slug' },
        order: 10,
        sectionContent: [
            txt('Personal Data may be processed in India, United States, Europe, or Singapore.'),
            txt('For EEA/UK Customers: We use Standard Contractual Clauses (SCCs) approved by the European Commission for transfers outside the EEA/UK.'),
            txt('For other jurisdictions: We comply with applicable cross-border transfer requirements.'),
        ],
    },
    {
        sectionTitle: 'DATA RETENTION AND DELETION',
        sectionId: { current: 'data-retention-and-deletion', _type: 'slug' },
        order: 11,
        sectionContent: [
            txt('We retain Personal Data during Your active subscription plus 30 days after termination to allow data retrieval.'),
            txt('To export Your data: Contact privacy@bayx.app (available as CSV/JSON export)'),
            txt('After 30 days: We permanently delete all Personal Data unless legally required to retain it.'),
        ],
    },
    {
        sectionTitle: 'AUDITS',
        sectionId: { current: 'audits', _type: 'slug' },
        order: 12,
        sectionContent: [
            txt('Upon reasonable written request (maximum once per year), we will provide documentation of our security and data protection practices, subject to confidentiality.'),
        ],
    },
    {
        sectionTitle: 'LIABILITY',
        sectionId: { current: 'liability', _type: 'slug' },
        order: 13,
        sectionContent: [
            txt('Liability under this DPA is subject to the limitations in Section 14 of the Terms of Service, except for liability that cannot be limited by law (fraud, gross negligence, intentional violations).'),
        ],
    },
    {
        sectionTitle: 'TERM AND TERMINATION',
        sectionId: { current: 'term-and-termination', _type: 'slug' },
        order: 14,
        sectionContent: [
            txt('This DPA remains in effect during Your subscription and for 30 days after termination (for data retention period).'),
            txt('Sections 6 (Security), 11 (Deletion), and 13 (Liability) survive termination.'),
        ],
    },
    {
        sectionTitle: 'AMENDMENTS',
        sectionId: { current: 'amendments', _type: 'slug' },
        order: 15,
        sectionContent: [
            txt('We may update this DPA to reflect legal changes. Material changes will be notified 30 days in advance.'),
        ],
    },
    {
        sectionTitle: 'GOVERNING LAW',
        sectionId: { current: 'governing-law', _type: 'slug' },
        order: 16,
        sectionContent: [
            txt('This DPA is governed by the laws of India, except where Standard Contractual Clauses apply (which have their own governing law provisions).'),
        ],
    },
    {
        sectionTitle: 'CONTACT INFORMATION',
        sectionId: { current: 'contact-information', _type: 'slug' },
        order: 17,
        sectionContent: [
            txt('For all data protection inquiries:'),
            txt('Email: privacy@bayx.app'),
            txt('Data Protection Officer:'),
            txt('Email: privacy@bayx.app'),
            txt('Technical Support:'),
            txt('Email: support@bayx.app'),
        ],
    },
]

async function main() {
    try {
        console.log('🔍 Finding Data Processing Agreement document...')

        const doc = await client.fetch(`*[_type == "legalDocument" && documentType == "data-processing-agreement"][0]`)

        if (!doc) {
            console.log('❌ No DPA found. Please run add-dpa.mjs first.')
            process.exit(1)
        }

        console.log(`✅ Found: ${doc.title}`)
        console.log(`📄 Current sections: ${(doc.sections || []).length}`)
        console.log(`➕ Updating with ${dpaSections.length} new sections...`)

        await client.patch(doc._id).set({
            sections: dpaSections,
            version: '1.0.0',
            introduction: [
                txt('This Data Processing Agreement ("DPA") forms part of the Terms of Service between Nuevexa Private Limited ("Provider," "We," "Processor"), operating the BayX platform, and the Customer ("Controller," "You").'),
                txt('Registered Office: [Full Address], Kochi, Kerala, India [PIN Code]'),
                txt('Corporate Identification Number (CIN): [Your CIN]'),
            ],
            contactEmail: 'privacy@bayx.app',
            governingLaw: 'India',
        }).commit()

        console.log(`✅ SUCCESS! Updated DPA with ${dpaSections.length} sections!`)
        console.log('🌐 View at: http://localhost:3000/data-processing-agreement')
        console.log('🔄 Refresh your Sanity Studio and frontend to see the changes!')
    } catch (err) {
        console.error('❌ Error:', err.message)
        if (err.response) {
            console.error('Response:', err.response)
        }
        process.exit(1)
    }
}

main()
