#!/usr/bin/env node

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Manually parse .env.local file
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

const privacySections = [
    {
        sectionTitle: 'INTRODUCTION',
        sectionId: { current: 'introduction', _type: 'slug' },
        order: 1,
        sectionContent: [
            txt('This Privacy Policy explains how Nuevexa ("Provider," "We," "Us," "Our"), the operator of BayX, collects, uses, processes, discloses, and safeguards personal data when You use the BayX platform (the "Platform"). Throughout this Policy, references to "BayX" or "Platform" refer to the software service, while "Provider," "We," "Us," and "Our" refer to Nuevexa as the legal entity operating BayX.'),
            txt('By accessing or using the Platform, You acknowledge that You have read, understood, and agree to be bound by this Privacy Policy.'),
        ],
    },
    {
        sectionTitle: 'DATA CONTROLLER AND PROCESSOR ROLES',
        sectionId: { current: 'data-controller-and-processor-roles', _type: 'slug' },
        order: 2,
        subsections: [
            {
                subsectionTitle: 'Customer as Data Controller',
                subsectionId: { current: 'customer-as-data-controller', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('For Personal Data uploaded by the Customer to the Platform, the Customer acts as the data controller and is responsible for ensuring lawful processing, obtaining necessary consents, providing required privacy notices, and responding to data subject requests.'),
                ],
            },
            {
                subsectionTitle: 'Provider as Data Processor',
                subsectionId: { current: 'provider-as-data-processor', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('We act as a data processor in relation to Customer Data. We process Customer Data solely on the Customer\'s behalf and in accordance with documented instructions.'),
                ],
            },
            {
                subsectionTitle: 'Provider as Data Controller',
                subsectionId: { current: 'provider-as-data-controller', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('For Personal Data collected directly by Us for account administration, billing, and platform operations, We act as the data controller.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'PERSONAL DATA WE COLLECT',
        sectionId: { current: 'personal-data-we-collect', _type: 'slug' },
        order: 3,
        subsections: [
            {
                subsectionTitle: 'Information Provided Directly',
                subsectionId: { current: 'information-provided-directly', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('We collect Personal Data that You provide when:'),
                    txt('Registering for an Account: Business name, contact name, email address, phone number, business address, and payment credentials.'),
                    txt('Using the Platform: Vehicle information, customer details, service records, communications, and business data.'),
                    txt('Contacting Support: Name, email address, and information provided in support requests.'),
                ],
            },
            {
                subsectionTitle: 'Information Collected Automatically',
                subsectionId: { current: 'information-collected-automatically', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('We automatically collect certain information when You use the Platform, including:'),
                    txt('Usage Data: Features accessed, actions performed, and time stamps.'),
                    txt('Device Information: IP address, browser type, operating system, and device identifiers.'),
                    txt('Log Data: Access times, error logs, and system activity.'),
                ],
            },
            {
                subsectionTitle: 'Information from Third Parties',
                subsectionId: { current: 'information-from-third-parties', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('We may receive information from payment processors, email delivery services, and other service providers necessary to operate the Platform.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'HOW WE USE PERSONAL DATA',
        sectionId: { current: 'how-we-use-personal-data', _type: 'slug' },
        order: 4,
        sectionContent: [
            txt('We use Personal Data for the following purposes:'),
            bullet('Service Provision: To provide, operate, and maintain the Platform and deliver requested Services;'),
            bullet('Account Management: To create and manage Accounts, process subscriptions, and authenticate users;'),
            bullet('Payment Processing: To process payments, issue invoices, and prevent fraud;'),
            bullet('Communications: To send transactional emails, system notifications, and respond to inquiries;'),
            bullet('Improvement and Analytics: To analyse usage patterns, improve features, and develop new functionality;'),
            bullet('Security: To detect, prevent, and address security incidents, fraud, and illegal activity;'),
            bullet('Legal Compliance: To comply with legal obligations, respond to lawful requests, and enforce our Terms.'),
        ],
    },
    {
        sectionTitle: 'LEGAL BASES FOR PROCESSING',
        sectionId: { current: 'legal-bases-for-processing', _type: 'slug' },
        order: 5,
        sectionContent: [
            txt('We process Personal Data based on the following legal grounds:'),
            bullet('Contractual Necessity: Processing is necessary to perform our contract with You (Terms of Service);'),
            bullet('Legitimate Interests: We have a legitimate interest in operating, securing, and improving the Platform, preventing fraud, and enforcing our rights;'),
            bullet('Legal Obligation: Processing is necessary to comply with applicable laws and regulations;'),
            bullet('Consent: Where required by law, we obtain Your explicit consent before processing.'),
        ],
    },
    {
        sectionTitle: 'DATA SHARING AND DISCLOSURE',
        sectionId: { current: 'data-sharing-and-disclosure', _type: 'slug' },
        order: 6,
        subsections: [
            {
                subsectionTitle: 'Third-Party Service Providers',
                subsectionId: { current: 'third-party-service-providers', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('We share Personal Data with third-party service providers who assist in operating the Platform, including cloud hosting providers, payment processors, email delivery services, and analytics providers. These providers are contractually obligated to protect data and use it only for specified purposes.'),
                ],
            },
            {
                subsectionTitle: 'Business Transfers',
                subsectionId: { current: 'business-transfers', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('In the event of a merger, acquisition, reorganisation, or sale of assets, Personal Data may be transferred to the successor entity.'),
                ],
            },
            {
                subsectionTitle: 'Legal Requirements',
                subsectionId: { current: 'legal-requirements', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('We may disclose Personal Data when required by law, court order, legal process, or governmental request, or when necessary to protect our rights, prevent fraud, or ensure safety.'),
                ],
            },
            {
                subsectionTitle: 'With Consent',
                subsectionId: { current: 'with-consent', _type: 'slug' },
                order: 4,
                subsectionContent: [
                    txt('We may share Personal Data for other purposes with Your explicit consent.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'DATA RETENTION',
        sectionId: { current: 'data-retention', _type: 'slug' },
        order: 7,
        sectionContent: [
            txt('We retain Personal Data for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, and enforce our agreements.'),
            txt('Upon Account termination, Customer Data is retained for thirty (30) days to allow retrieval, after which it is permanently deleted unless legal obligations require longer retention.'),
            txt('Aggregated and anonymised data that cannot identify individuals may be retained indefinitely for analytics and research purposes.'),
        ],
    },
    {
        sectionTitle: 'DATA SECURITY',
        sectionId: { current: 'data-security', _type: 'slug' },
        order: 8,
        sectionContent: [
            txt('We implement industry-standard technical and organisational measures to protect Personal Data from unauthorised access, disclosure, alteration, and destruction. These measures include encryption, access controls, regular security assessments, and employee training.'),
            txt('However, no system is completely secure. We cannot guarantee absolute security, and You acknowledge the inherent risks of internet-based services.'),
        ],
    },
    {
        sectionTitle: 'INTERNATIONAL DATA TRANSFERS',
        sectionId: { current: 'international-data-transfers', _type: 'slug' },
        order: 9,
        sectionContent: [
            txt('Personal Data may be transferred to and processed in countries outside Your jurisdiction, including countries that may not provide equivalent data protection standards.'),
            txt('For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses or other lawful transfer mechanisms approved by relevant authorities.'),
        ],
    },
    {
        sectionTitle: 'YOUR RIGHTS',
        sectionId: { current: 'your-rights', _type: 'slug' },
        order: 10,
        sectionContent: [
            txt('Depending on Your location, You may have the following rights regarding Your Personal Data:'),
            bullet('Access: Request copies of Your Personal Data;'),
            bullet('Rectification: Request correction of inaccurate or incomplete data;'),
            bullet('Erasure: Request deletion of Your Personal Data (subject to legal exceptions);'),
            bullet('Portability: Request transfer of Your data in a machine-readable format;'),
            bullet('Restriction: Request limitation of processing under certain circumstances;'),
            bullet('Objection: Object to processing based on legitimate interests;'),
            bullet('Withdraw Consent: Withdraw consent where processing is based on consent.'),
            txt('To exercise these rights, please contact us at privacy@nuevexa.com. We will respond within the timeframes required by applicable law (typically 30 days).'),
        ],
    },
    {
        sectionTitle: 'COOKIES AND TRACKING TECHNOLOGIES',
        sectionId: { current: 'cookies-and-tracking-technologies', _type: 'slug' },
        order: 11,
        sectionContent: [
            txt('We use cookies and similar tracking technologies to operate the Platform, remember preferences, analyse usage, and improve user experience. You may control cookies through Your browser settings, though disabling cookies may affect Platform functionality.'),
        ],
    },
    {
        sectionTitle: 'CHILDREN\'S PRIVACY',
        sectionId: { current: 'childrens-privacy', _type: 'slug' },
        order: 12,
        sectionContent: [
            txt('The Platform is not intended for individuals under 18 years of age. We do not knowingly collect Personal Data from children. If we become aware of such collection, we will promptly delete the data.'),
        ],
    },
    {
        sectionTitle: 'CHANGES TO THIS PRIVACY POLICY',
        sectionId: { current: 'changes-to-this-privacy-policy', _type: 'slug' },
        order: 13,
        sectionContent: [
            txt('We may update this Privacy Policy from time to time. Material changes will be notified via email or prominent notice on the Platform at least thirty (30) days before taking effect. Continued use after changes become effective constitutes acceptance.'),
        ],
    },
    {
        sectionTitle: 'CONTACT INFORMATION',
        sectionId: { current: 'contact-information', _type: 'slug' },
        order: 14,
        sectionContent: [
            txt('For questions or concerns about this Privacy Policy or data protection practices, please contact:'),
            txt('Nuevexa Data Protection Officer'),
            txt('Email: privacy@nuevexa.com'),
            txt('For GDPR-related inquiries (EEA/UK):'),
            txt('Email: dpo@nuevexa.com'),
            txt('For UAE PDPL inquiries:'),
            txt('Email: privacy@nuevexa.com'),
        ],
    },
]

async function main() {
    try {
        console.log('🔍 Finding Privacy Policy document...')

        // First, check if document exists
        const doc = await client.fetch(`*[_type == "legalDocument" && documentType == "privacy-policy"][0]`)

        if (!doc) {
            console.log('📝 No Privacy Policy found. Creating new document...')

            // Create new Privacy Policy document
            const newDoc = await client.create({
                _type: 'legalDocument',
                documentType: 'privacy-policy',
                title: 'Privacy Policy',
                slug: { current: 'privacy-policy', _type: 'slug' },
                version: '1.0',
                effectiveDate: '2026-01-19',
                publishStatus: 'published',
                notifyUsers: false,
                sections: privacySections,
            })

            console.log(`✅ Created Privacy Policy with ${privacySections.length} sections!`)
            console.log('🌐 View at: http://localhost:3000/privacy-policy')
        } else {
            console.log(`✅ Found: ${doc.title}`)
            console.log(`📄 Current sections: ${(doc.sections || []).length}`)
            console.log(`➕ Replacing with ${privacySections.length} sections...`)

            await client.patch(doc._id).set({ sections: privacySections }).commit()

            console.log(`✅ SUCCESS! Total sections: ${privacySections.length}`)
            console.log('🌐 View at: http://localhost:3000/privacy-policy')
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
