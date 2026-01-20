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

const dpaSections = [
    {
        sectionTitle: 'DEFINITIONS',
        sectionId: { current: 'definitions', _type: 'slug' },
        order: 1,
        sectionContent: [
            txt('"Controller," "Processor," "Data Subject," "Personal Data," "Processing," and "Personal Data Breach" have the meanings given in the GDPR (Regulation (EU) 2016/679) or equivalent terms under applicable data protection laws.'),
        ],
    },
    {
        sectionTitle: 'SCOPE AND ROLES',
        sectionId: { current: 'scope-and-roles', _type: 'slug' },
        order: 2,
        sectionContent: [
            txt('We act as a Processor of Personal Data on behalf of the Customer (Controller) solely to provide the Services described in the Terms of Service.'),
        ],
    },
    {
        sectionTitle: 'PROCESSING INSTRUCTIONS',
        sectionId: { current: 'processing-instructions', _type: 'slug' },
        order: 3,
        sectionContent: [
            txt('We shall process Personal Data only on documented instructions from the Customer, including those set forth in the Terms of Service. We will immediately inform the Customer if instructions violate applicable data protection laws.'),
        ],
    },
    {
        sectionTitle: 'CONFIDENTIALITY',
        sectionId: { current: 'confidentiality', _type: 'slug' },
        order: 4,
        sectionContent: [
            txt('We ensure that personnel authorised to process Personal Data are subject to confidentiality obligations.'),
        ],
    },
    {
        sectionTitle: 'SECURITY MEASURES',
        sectionId: { current: 'security-measures', _type: 'slug' },
        order: 5,
        sectionContent: [
            txt('We implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encryption, access controls, and regular security assessments.'),
        ],
    },
    {
        sectionTitle: 'SUB-PROCESSORS',
        sectionId: { current: 'sub-processors', _type: 'slug' },
        order: 6,
        sectionContent: [
            txt('The Customer authorises Us to engage sub-processors necessary to provide the Services. We maintain a list of current sub-processors available upon request and will notify the Customer of any changes at least thirty (30) days in advance.'),
        ],
    },
    {
        sectionTitle: 'DATA SUBJECT RIGHTS',
        sectionId: { current: 'data-subject-rights', _type: 'slug' },
        order: 7,
        sectionContent: [
            txt('We will assist the Customer in responding to Data Subject requests (access, rectification, erasure, portability, restriction, objection) by providing necessary tools and reasonable cooperation. The Customer agrees to reimburse Us for costs incurred beyond standard Platform functionality.'),
        ],
    },
    {
        sectionTitle: 'PERSONAL DATA BREACHES',
        sectionId: { current: 'personal-data-breaches', _type: 'slug' },
        order: 8,
        sectionContent: [
            txt('We will notify the Customer without undue delay (within 72 hours) upon becoming aware of a Personal Data Breach. We will provide reasonable assistance to enable the Customer to comply with breach notification obligations.'),
        ],
    },
    {
        sectionTitle: 'DATA DELETION',
        sectionId: { current: 'data-deletion', _type: 'slug' },
        order: 9,
        sectionContent: [
            txt('Upon termination or upon Customer request, We will delete or return all Personal Data (at the Customer\'s choice) within thirty (30) days, except where retention is required by law.'),
        ],
    },
    {
        sectionTitle: 'AUDITS',
        sectionId: { current: 'audits', _type: 'slug' },
        order: 10,
        sectionContent: [
            txt('Upon reasonable notice and no more than once annually, the Customer may audit Our compliance with this DPA, subject to confidentiality obligations and reimbursement of costs.'),
        ],
    },
    {
        sectionTitle: 'INTERNATIONAL TRANSFERS',
        sectionId: { current: 'international-transfers', _type: 'slug' },
        order: 11,
        sectionContent: [
            txt('For transfers of Personal Data outside the EEA, UK, or Switzerland, the parties agree to Standard Contractual Clauses approved by the European Commission.'),
        ],
    },
    {
        sectionTitle: 'LIABILITY',
        sectionId: { current: 'liability', _type: 'slug' },
        order: 12,
        sectionContent: [
            txt('Each party\'s liability under this DPA is subject to the limitations set forth in the Terms of Service.'),
        ],
    },
    {
        sectionTitle: 'CONTACT INFORMATION',
        sectionId: { current: 'contact-information-dpa', _type: 'slug' },
        order: 13,
        sectionContent: [
            txt('For DPA-related inquiries, contact:'),
            txt('Nuevexa Data Protection Officer'),
            txt('Email: dpo@nuevexa.com'),
        ],
    },
]

async function main() {
    try {
        console.log('🔍 Finding Data Processing Agreement document...')

        const doc = await client.fetch(`*[_type == "legalDocument" && documentType == "data-processing-agreement"][0]`)

        if (!doc) {
            console.log('📝 No Data Processing Agreement found. Creating new document...')

            await client.create({
                _type: 'legalDocument',
                documentType: 'data-processing-agreement',
                title: 'Data Processing Agreement',
                slug: { current: 'data-processing-agreement', _type: 'slug' },
                version: '1.0.0',
                effectiveDate: '2026-01-19',
                publishStatus: 'published',
                notifyUsers: false,
                introduction: [
                    txt('This Data Processing Agreement supplements and forms part of the Terms of Service between Nuevexa ("Provider," "We," "Us," "Our"), the operator of BayX, and Customer.'),
                ],
                sections: dpaSections,
                contactEmail: 'dpo@nuevexa.com',
                governingLaw: 'England and Wales',
            })

            console.log(`✅ Created Data Processing Agreement with ${dpaSections.length} sections!`)
            console.log('🌐 View at: http://localhost:3000/data-processing-agreement')
        } else {
            console.log(`✅ Found: ${doc.title}`)
            console.log(`📄 Current sections: ${(doc.sections || []).length}`)
            console.log(`➕ Replacing with ${dpaSections.length} sections...`)

            await client.patch(doc._id).set({
                sections: dpaSections,
                introduction: [
                    txt('This Data Processing Agreement supplements and forms part of the Terms of Service between Nuevexa ("Provider," "We," "Us," "Our"), the operator of BayX, and Customer.'),
                ],
            }).commit()

            console.log(`✅ SUCCESS! Total sections: ${dpaSections.length}`)
            console.log('🌐 View at: http://localhost:3000/data-processing-agreement')
        }

        console.log('🔄 Refresh your Sanity Studio to see the changes!')
    } catch (err) {
        console.error('❌ Error:', err.message)
        if (err.response) {
            console.error('Response:', err.response)
        }
        process.exit(1)
    }
}

main()
