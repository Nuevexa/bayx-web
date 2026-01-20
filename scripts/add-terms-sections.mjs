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
                    // Remove quotes and trim
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

console.log('🔍 Environment variables loaded:')
console.log('  - NEXT_PUBLIC_SANITY_PROJECT_ID:', env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ NOT FOUND')
console.log('  - NEXT_PUBLIC_SANITY_DATASET:', env.NEXT_PUBLIC_SANITY_DATASET || '❌ NOT FOUND')
console.log('  - SANITY_API_WRITE_TOKEN:', env.SANITY_API_WRITE_TOKEN ? `✅ Found (${env.SANITY_API_WRITE_TOKEN.substring(0, 10)}...)` : '❌ NOT FOUND')

if (!env.SANITY_API_WRITE_TOKEN) {
    console.error('\n❌ SANITY_API_WRITE_TOKEN not found in .env.local')
    console.log('📝 Available keys in .env.local:', Object.keys(env).join(', '))
    process.exit(1)
}

if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('\n❌ NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
    process.exit(1)
}

console.log('\n✅ All required environment variables found')
console.log('🔗 Connecting to Sanity...')

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

const newSections = [
    {
        sectionTitle: 'CUSTOMER DATA',
        sectionId: { current: 'customer-data', _type: 'slug' },
        order: 7,
        subsections: [
            { subsectionTitle: 'Ownership', subsectionId: { current: 'ownership', _type: 'slug' }, order: 1, subsectionContent: [txt('The Customer retains all ownership rights, title, and interest in and to Customer Data. We acquire no ownership rights in Customer Data except as necessary to provide the Services.')] },
            { subsectionTitle: 'Licence to Process', subsectionId: { current: 'licence-to-process', _type: 'slug' }, order: 2, subsectionContent: [txt('The Customer grants Us a non-exclusive, worldwide, royalty-free licence to access, use, process, copy, store, transmit, and display Customer Data solely to the extent necessary to provide the Services, comply with legal obligations, and enforce these Terms.')] },
            { subsectionTitle: 'Customer Responsibilities', subsectionId: { current: 'customer-responsibilities', _type: 'slug' }, order: 3, subsectionContent: [txt('The Customer represents, warrants, and covenants that:'), bullet('It has all necessary rights and consents to upload Customer Data to the Platform;'), bullet("Customer Data does not infringe or violate any third party's intellectual property rights, privacy rights, or other legal rights;"), bullet('Customer Data does not contain viruses, malware, or harmful code;'), bullet('The Customer will comply with all applicable data protection and privacy laws in connection with Customer Data.')] },
            { subsectionTitle: 'Data Security', subsectionId: { current: 'data-security', _type: 'slug' }, order: 4, subsectionContent: [txt('We implement commercially reasonable technical and organisational measures designed to protect Customer Data from unauthorised access, disclosure, alteration, or destruction. However, no security system is impenetrable, and We do not guarantee absolute security.')] },
            { subsectionTitle: 'Data Backup and Retrieval', subsectionId: { current: 'data-backup-and-retrieval', _type: 'slug' }, order: 5, subsectionContent: [txt('The Customer is solely responsible for maintaining independent backups of Customer Data. Upon request during the Subscription Term or within thirty (30) days following termination, We will provide the Customer with an export of Customer Data in a commonly used format, subject to payment of applicable retrieval fees.')] },
            { subsectionTitle: 'Data Deletion', subsectionId: { current: 'data-deletion', _type: 'slug' }, order: 6, subsectionContent: [txt('Following termination or upon Customer request, We will delete Customer Data in accordance with Our data retention policies and legal obligations. Once deleted, Customer Data cannot be recovered.')] },
        ],
    },
    {
        sectionTitle: 'DATA PROTECTION AND PRIVACY',
        sectionId: { current: 'data-protection-and-privacy', _type: 'slug' },
        order: 8,
        subsections: [
            { subsectionTitle: 'Privacy Policy', subsectionId: { current: 'privacy-policy-ref', _type: 'slug' }, order: 1, subsectionContent: [txt('Our collection, use, and processing of Personal Data is governed by the Privacy Policy, incorporated into these Terms by reference. The Customer agrees to review and comply with the Privacy Policy.')] },
            { subsectionTitle: 'Roles and Responsibilities', subsectionId: { current: 'roles-and-responsibilities', _type: 'slug' }, order: 2, subsectionContent: [txt('To the extent the Platform processes Personal Data:'), bullet('The Customer acts as the data controller and is responsible for ensuring lawful processing, obtaining necessary consents, and providing required notices to data subjects;'), bullet("We act as the data processor and process Personal Data solely on the Customer's behalf in accordance with documented instructions.")] },
            { subsectionTitle: 'Data Processing Agreement', subsectionId: { current: 'data-processing-agreement', _type: 'slug' }, order: 3, subsectionContent: [txt('For Customers subject to GDPR, UAE PDPL, or similar data protection laws requiring written data processing agreements, the Data Processing Agreement forms part of these Terms and governs the processing of Personal Data.')] },
            { subsectionTitle: 'Data Subject Rights', subsectionId: { current: 'data-subject-rights', _type: 'slug' }, order: 4, subsectionContent: [txt('The Customer is responsible for responding to data subject requests (access, rectification, erasure, portability, restriction, objection). We will provide reasonable assistance upon written request, subject to reimbursement of associated costs.')] },
            { subsectionTitle: 'Cross-Border Data Transfers', subsectionId: { current: 'cross-border-data-transfers', _type: 'slug' }, order: 5, subsectionContent: [txt("Customer Data may be transferred to, processed, and stored in jurisdictions outside the Customer's location, including jurisdictions that may not provide equivalent data protection standards. By using the Platform, the Customer consents to such transfers.")] },
            { subsectionTitle: 'Security Incidents', subsectionId: { current: 'security-incidents', _type: 'slug' }, order: 6, subsectionContent: [txt("We will notify the Customer without undue delay upon becoming aware of any unauthorised access to or acquisition of Customer Data that is reasonably likely to result in risk to individuals' rights and freedoms.")] },
        ],
    },
    {
        sectionTitle: 'INTELLECTUAL PROPERTY RIGHTS',
        sectionId: { current: 'intellectual-property-rights', _type: 'slug' },
        order: 9,
        subsections: [
            { subsectionTitle: 'Ownership by Provider', subsectionId: { current: 'ownership-by-provider', _type: 'slug' }, order: 1, subsectionContent: [txt('The Platform, including all software, algorithms, designs, interfaces, Documentation, trademarks, logos, and all intellectual property rights therein, is and remains the exclusive property of Nuevexa and its licensors. These Terms do not transfer any ownership rights to the Customer.')] },
            { subsectionTitle: 'Feedback', subsectionId: { current: 'feedback', _type: 'slug' }, order: 2, subsectionContent: [txt('If the Customer provides suggestions or feedback regarding the Platform, We may use such feedback without restriction or compensation. The Customer hereby assigns all rights, title, and interest in feedback to Us.')] },
            { subsectionTitle: 'Restrictions on Use', subsectionId: { current: 'restrictions-on-use', _type: 'slug' }, order: 3, subsectionContent: [txt('The Customer acknowledges that the Platform contains proprietary and confidential information protected by intellectual property laws and international treaties. Any unauthorised use, reproduction, or distribution constitutes a material breach and may subject the Customer to civil and criminal liability.')] },
        ],
    },
    {
        sectionTitle: 'ACCEPTABLE USE POLICY',
        sectionId: { current: 'acceptable-use-policy', _type: 'slug' },
        order: 10,
        subsections: [
            { subsectionTitle: 'Prohibited Activities', subsectionId: { current: 'prohibited-activities', _type: 'slug' }, order: 1, subsectionContent: [txt('The Customer shall not, and shall ensure Authorised Users do not, use the Platform to:'), bullet('Violate any applicable law, regulation, or third party right;'), bullet('Transmit, store, or process any content that is unlawful, defamatory, obscene, harassing, threatening, or otherwise objectionable;'), bullet('Distribute viruses, malware, or other malicious code;'), bullet('Engage in fraudulent, deceptive, or misleading practices;'), bullet('Interfere with or disrupt the integrity, performance, or security of the Platform;'), bullet('Attempt to gain unauthorised access to any systems, accounts, or data;'), bullet('Use the Platform to send unsolicited communications or spam;'), bullet('Impersonate any person or entity;'), bullet('Infringe upon intellectual property rights or privacy rights of any third party.')] },
            { subsectionTitle: 'Monitoring and Enforcement', subsectionId: { current: 'monitoring-and-enforcement', _type: 'slug' }, order: 2, subsectionContent: [txt('We reserve the right to monitor Customer use of the Platform to ensure compliance with this Acceptable Use Policy and may investigate suspected violations.')] },
            { subsectionTitle: 'Consequences of Violation', subsectionId: { current: 'consequences-of-violation', _type: 'slug' }, order: 3, subsectionContent: [txt('Violation of this Acceptable Use Policy constitutes a material breach. We may suspend or terminate the Account, delete violating content, report violations to authorities, and seek legal remedies.')] },
        ],
    },
    {
        sectionTitle: 'THIRD PARTY SERVICES AND INTEGRATIONS',
        sectionId: { current: 'third-party-services-and-integrations', _type: 'slug' },
        order: 11,
        subsections: [
            { subsectionTitle: 'Third Party Services', subsectionId: { current: 'third-party-services', _type: 'slug' }, order: 1, subsectionContent: [txt('The Platform may integrate with or contain links to third-party services, applications, or websites (collectively, "Third Party Services"). Such integrations are provided for convenience only.')] },
            { subsectionTitle: 'No Endorsement', subsectionId: { current: 'no-endorsement', _type: 'slug' }, order: 2, subsectionContent: [txt('We do not endorse, control, or assume responsibility for Third Party Services. The Customer\'s use of Third Party Services is governed by separate terms of the third-party providers.')] },
            { subsectionTitle: 'Disclaimer', subsectionId: { current: 'third-party-disclaimer', _type: 'slug' }, order: 3, subsectionContent: [txt('We make no representations or warranties regarding Third Party Services, including their availability, accuracy, reliability, security, or compliance with laws. The Customer uses Third Party Services entirely at its own risk.')] },
            { subsectionTitle: 'Data Sharing', subsectionId: { current: 'data-sharing', _type: 'slug' }, order: 4, subsectionContent: [txt('If the Customer enables integrations with Third Party Services, Customer Data may be shared with such third parties. The Customer is responsible for reviewing third-party privacy policies and obtaining necessary consents before enabling integrations.')] },
        ],
    },
    {
        sectionTitle: 'WARRANTIES AND DISCLAIMERS',
        sectionId: { current: 'warranties-and-disclaimers', _type: 'slug' },
        order: 12,
        subsections: [
            { subsectionTitle: 'Mutual Warranties', subsectionId: { current: 'mutual-warranties', _type: 'slug' }, order: 1, subsectionContent: [txt('Each party warrants that it has the legal authority to enter into this Agreement and its performance will comply with applicable laws.')] },
            { subsectionTitle: 'Platform Availability', subsectionId: { current: 'platform-availability', _type: 'slug' }, order: 2, subsectionContent: [txt('We will use commercially reasonable efforts to make the Platform available. This is a service objective only and does not constitute a warranty or guarantee.')] },
            { subsectionTitle: 'Disclaimer of Warranties', subsectionId: { current: 'disclaimer-of-warranties', _type: 'slug' }, order: 3, subsectionContent: [txt('TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE PLATFORM AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.'), txt('WE SPECIFICALLY DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, RELIABILITY, AND FREEDOM FROM ERRORS.'), txt('WE DO NOT WARRANT THAT:'), bullet('The Platform will meet the Customer\'s requirements or expectations;'), bullet('The Platform will be uninterrupted, error-free, secure, or free from viruses;'), bullet('Any errors or defects will be corrected;'), bullet('Customer Data will be secure or not lost, damaged, or corrupted.')] },
            { subsectionTitle: 'No Professional Advice', subsectionId: { current: 'no-professional-advice', _type: 'slug' }, order: 4, subsectionContent: [txt('The Platform is a software tool and does not provide legal, financial, tax, or professional advice. The Customer is solely responsible for consulting qualified professionals and making independent business decisions.')] },
        ],
    },
    {
        sectionTitle: 'INDEMNIFICATION',
        sectionId: { current: 'indemnification', _type: 'slug' },
        order: 13,
        subsections: [
            { subsectionTitle: 'Customer Indemnification', subsectionId: { current: 'customer-indemnification', _type: 'slug' }, order: 1, subsectionContent: [txt('The Customer agrees to indemnify, defend, and hold harmless the Provider and its affiliates from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of or relating to:'), bullet('The Customer\'s or any Authorised User\'s use or misuse of the Platform;'), bullet('Breach of these Terms by the Customer or any Authorised User;'), bullet('Customer Data, including any claims of infringement or violation of rights;'), bullet('Violation of applicable laws or regulations by the Customer.')] },
            { subsectionTitle: 'Indemnification by Provider', subsectionId: { current: 'indemnification-by-provider', _type: 'slug' }, order: 2, subsectionContent: [txt('We will indemnify the Customer against third-party claims alleging that the Platform, when used in accordance with these Terms, infringes a valid patent, copyright, or trademark. If the Platform becomes subject to an infringement claim, We may obtain rights to continue use, replace or modify the Platform, or terminate the subscription and refund prepaid fees for the unused portion.')] },
            { subsectionTitle: 'Exclusions', subsectionId: { current: 'indemnification-exclusions', _type: 'slug' }, order: 3, subsectionContent: [txt('We have no indemnification obligation for claims arising from modifications not made by Us, use in combination with third-party products, Customer Data, or use in violation of these Terms.'), txt('THIS SECTION 13 STATES THE PARTIES\' SOLE AND EXCLUSIVE REMEDIES WITH RESPECT TO INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS.')] },
        ],
    },
    {
        sectionTitle: 'LIMITATION OF LIABILITY',
        sectionId: { current: 'limitation-of-liability', _type: 'slug' },
        order: 14,
        subsections: [
            { subsectionTitle: 'Exclusion of Consequential Damages', subsectionId: { current: 'exclusion-of-consequential-damages', _type: 'slug' }, order: 1, subsectionContent: [txt('TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, BUSINESS, DATA, GOODWILL, OR BUSINESS INTERRUPTION, WHETHER ARISING UNDER CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.')] },
            { subsectionTitle: 'Liability Cap', subsectionId: { current: 'liability-cap', _type: 'slug' }, order: 2, subsectionContent: [txt('OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID BY THE CUSTOMER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.')] },
            { subsectionTitle: 'Exceptions', subsectionId: { current: 'liability-exceptions', _type: 'slug' }, order: 3, subsectionContent: [txt('The limitations in this Section do not apply to the Customer\'s indemnification obligations, liability arising from fraud or wilful misconduct, or liability that cannot be excluded under applicable law.')] },
            { subsectionTitle: 'Basis of the Bargain', subsectionId: { current: 'basis-of-the-bargain', _type: 'slug' }, order: 4, subsectionContent: [txt('The Customer acknowledges that the limitations of liability reflect a reasonable allocation of risk and form an essential basis of the bargain. The fees charged would be substantially higher without these limitations.')] },
        ],
    },
    {
        sectionTitle: 'CONFIDENTIALITY',
        sectionId: { current: 'confidentiality', _type: 'slug' },
        order: 15,
        subsections: [
            { subsectionTitle: 'Confidential Information', subsectionId: { current: 'confidential-information', _type: 'slug' }, order: 1, subsectionContent: [txt('Each party agrees to hold the other party\'s Confidential Information in strict confidence, use it solely to perform obligations under this Agreement, and protect it using at least the same degree of care used to protect its own confidential information, but no less than reasonable care.')] },
            { subsectionTitle: 'Exclusions', subsectionId: { current: 'confidentiality-exclusions', _type: 'slug' }, order: 2, subsectionContent: [txt('Confidentiality obligations do not apply to information that is publicly available, rightfully known prior to disclosure, rightfully received from a third party, independently developed, or required to be disclosed pursuant to legal process.')] },
            { subsectionTitle: 'Remedies', subsectionId: { current: 'confidentiality-remedies', _type: 'slug' }, order: 3, subsectionContent: [txt('The parties acknowledge that breach of confidentiality obligations may cause irreparable harm for which monetary damages are inadequate, and the non-breaching party is entitled to seek injunctive relief.')] },
        ],
    },
    {
        sectionTitle: 'FORCE MAJEURE',
        sectionId: { current: 'force-majeure', _type: 'slug' },
        order: 16,
        sectionContent: [txt('Neither party shall be liable for failure or delay in performing its obligations (other than payment obligations) to the extent caused by events beyond its reasonable control, including acts of God, natural disasters, war, terrorism, government actions, labour strikes, or infrastructure failures ("Force Majeure Event").'), txt('The party affected by a Force Majeure Event must promptly notify the other party and use commercially reasonable efforts to mitigate the effects. If a Force Majeure Event prevents performance for more than thirty (30) consecutive days, either party may terminate this Agreement upon written notice.')],
    },
    {
        sectionTitle: 'GOVERNING LAW AND DISPUTE RESOLUTION',
        sectionId: { current: 'governing-law-and-dispute-resolution', _type: 'slug' },
        order: 17,
        subsections: [
            { subsectionTitle: 'Governing Law', subsectionId: { current: 'governing-law', _type: 'slug' }, order: 1, subsectionContent: [txt('This Agreement shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of laws principles.')] },
            { subsectionTitle: 'Jurisdiction', subsectionId: { current: 'jurisdiction', _type: 'slug' }, order: 2, subsectionContent: [txt('The parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales for resolution of any disputes.')] },
            { subsectionTitle: 'Injunctive Relief', subsectionId: { current: 'injunctive-relief', _type: 'slug' }, order: 3, subsectionContent: [txt('Either party may seek injunctive or equitable relief in any court of competent jurisdiction to prevent irreparable harm.')] },
        ],
    },
    {
        sectionTitle: 'GENERAL PROVISIONS',
        sectionId: { current: 'general-provisions', _type: 'slug' },
        order: 18,
        subsections: [
            { subsectionTitle: 'Entire Agreement', subsectionId: { current: 'entire-agreement', _type: 'slug' }, order: 1, subsectionContent: [txt('These Terms, together with the Privacy Policy and Data Processing Agreement, constitute the entire agreement between the parties and supersede all prior agreements and understandings.')] },
            { subsectionTitle: 'Amendments', subsectionId: { current: 'amendments', _type: 'slug' }, order: 2, subsectionContent: [txt('We reserve the right to modify these Terms at any time by posting revised Terms or providing notice via email. Material changes will take effect thirty (30) days after notice. Continued use of the Platform after the effective date constitutes acceptance.')] },
            { subsectionTitle: 'Severability', subsectionId: { current: 'severability', _type: 'slug' }, order: 3, subsectionContent: [txt('If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.')] },
            { subsectionTitle: 'Waiver', subsectionId: { current: 'waiver', _type: 'slug' }, order: 4, subsectionContent: [txt('No waiver of any provision constitutes a continuing waiver unless expressly provided in writing.')] },
            { subsectionTitle: 'Assignment', subsectionId: { current: 'assignment', _type: 'slug' }, order: 5, subsectionContent: [txt('The Customer may not assign this Agreement without Our prior written consent. We may assign this Agreement to any affiliate or successor.')] },
            { subsectionTitle: 'Independent Contractors', subsectionId: { current: 'independent-contractors', _type: 'slug' }, order: 6, subsectionContent: [txt('The parties are independent contractors. These Terms do not create a partnership, joint venture, or agency relationship.')] },
            { subsectionTitle: 'Notices', subsectionId: { current: 'notices', _type: 'slug' }, order: 7, subsectionContent: [txt('All notices must be in writing and delivered via email or registered post. Notices to Us should be sent to legal@nuevexa.com.')] },
            { subsectionTitle: 'Export Compliance', subsectionId: { current: 'export-compliance', _type: 'slug' }, order: 8, subsectionContent: [txt('The Customer agrees to comply with all applicable export control and sanctions laws.')] },
            { subsectionTitle: 'No Third Party Beneficiaries', subsectionId: { current: 'no-third-party-beneficiaries', _type: 'slug' }, order: 9, subsectionContent: [txt('These Terms are for the sole benefit of the parties and do not confer rights upon any third party.')] },
            { subsectionTitle: 'Language', subsectionId: { current: 'language', _type: 'slug' }, order: 10, subsectionContent: [txt('These Terms are drafted in the English language. In the event of conflict between the English version and any translation, the English version shall prevail.')] },
            { subsectionTitle: 'Contact Information', subsectionId: { current: 'contact-information', _type: 'slug' }, order: 11, subsectionContent: [txt('For questions regarding these Terms, please contact:'), txt('Nuevexa Legal Department'), txt('Email: legal@nuevexa.com')] },
        ],
    },
]

async function main() {
    try {
        console.log('\n🔍 Finding Terms of Service document...')
        const doc = await client.fetch(`*[_type == "legalDocument" && documentType == "terms-of-service"][0]`)

        if (!doc) {
            console.error('❌ No Terms of Service found. Please create one in Sanity Studio first.')
            process.exit(1)
        }

        console.log(`✅ Found: ${doc.title}`)
        console.log(`📄 Current sections: ${(doc.sections || []).length}`)
        console.log(`➕ Adding ${newSections.length} sections (7-18)...`)

        const updated = [...(doc.sections || []), ...newSections]

        await client.patch(doc._id).set({ sections: updated }).commit()

        console.log(`\n✅ SUCCESS! Total sections: ${updated.length}`)
        console.log('🌐 View at: http://localhost:3000/terms-conditions')
        console.log('🔄 Refresh your Sanity Studio to see the changes!')
    } catch (err) {
        console.error('\n❌ Error:', err.message)
        if (err.response) {
            console.error('Response:', err.response)
        }
        process.exit(1)
    }
}

main()
