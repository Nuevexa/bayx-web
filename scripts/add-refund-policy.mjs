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

const refundSections = [
    {
        sectionTitle: 'GENERAL NO-REFUND POLICY',
        sectionId: { current: 'general-no-refund-policy', _type: 'slug' },
        order: 1,
        sectionContent: [
            txt('All subscription fees paid to Us are non-refundable, except as expressly provided in this Refund Policy or as required by applicable law. By subscribing to BayX, the Customer acknowledges and accepts this policy.'),
            txt('This no-refund policy applies to:'),
            bullet('Monthly and annual subscription fees;'),
            bullet('Upgrade fees when moving to a higher Subscription Tier;'),
            bullet('Add-on features or services purchased;'),
            bullet('Fees paid during promotional or discounted periods;'),
            bullet('Partial billing periods following cancellation or termination.'),
        ],
    },
    {
        sectionTitle: 'FREE TRIAL PERIOD',
        sectionId: { current: 'free-trial-period', _type: 'slug' },
        order: 2,
        subsections: [
            {
                subsectionTitle: 'Trial Evaluation Period',
                subsectionId: { current: 'trial-evaluation-period', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('We offer a free trial period (typically 14 days) to allow prospective Customers to evaluate the Platform before committing to a paid subscription. No payment is required during the trial period, and no refunds are applicable as no fees have been charged.'),
                ],
            },
            {
                subsectionTitle: 'No Refunds After Trial',
                subsectionId: { current: 'no-refunds-after-trial', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('Once the Customer transitions from the free trial to a paid subscription and the first payment is successfully processed, the no-refund policy takes full effect. The trial period provides adequate opportunity for evaluation, and payment after trial completion constitutes acceptance of the Platform in its current state.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'CANCELLATION AND MID-CYCLE BILLING',
        sectionId: { current: 'cancellation-and-mid-cycle-billing', _type: 'slug' },
        order: 3,
        subsections: [
            {
                subsectionTitle: 'Cancellation Process',
                subsectionId: { current: 'cancellation-process', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('The Customer may cancel their subscription at any time in accordance with Section 6.3 of the Terms of Service by accessing Account settings or contacting legal@nuevexa.com.'),
                ],
            },
            {
                subsectionTitle: 'Access Until End of Billing Period',
                subsectionId: { current: 'access-until-end-of-billing-period', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('Upon cancellation:'),
                    bullet('The Customer will not be charged for subsequent billing periods;'),
                    bullet('The Customer retains full access to the Platform until the end of the current prepaid billing period (monthly or annual);'),
                    bullet('No pro-rated refund will be provided for the remaining days or months in the current billing period.'),
                    txt('Example: If a Customer with a monthly subscription paid on January 1st cancels on January 15th, they will retain access until January 31st, but will not receive a refund for the unused portion of January.'),
                ],
            },
            {
                subsectionTitle: 'Immediate Termination by Customer',
                subsectionId: { current: 'immediate-termination-by-customer', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('If the Customer requests immediate Account closure before the end of the prepaid period, access will be terminated immediately, but no refund will be provided for the unused time.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'BILLING ERRORS AND DUPLICATE CHARGES',
        sectionId: { current: 'billing-errors-and-duplicate-charges', _type: 'slug' },
        order: 4,
        subsections: [
            {
                subsectionTitle: 'System or Payment Processing Errors',
                subsectionId: { current: 'system-or-payment-processing-errors', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('If We or our payment processor erroneously charge the Customer due to a technical error, system malfunction, or duplicate processing, the Customer is entitled to a full refund of the erroneous charge to the original payment method.'),
                    txt('Examples of refundable billing errors include:'),
                    bullet('Duplicate charges for the same billing period;'),
                    bullet('Charges applied to a cancelled Account after the cancellation effective date;'),
                    bullet('Charges for an incorrect amount exceeding the applicable Subscription Plan price;'),
                    bullet('Unauthorised charges resulting from Our system failure (not including compromised Customer credentials).'),
                ],
            },
            {
                subsectionTitle: 'Refund Request Process',
                subsectionId: { current: 'refund-request-process', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('To request a refund for a billing error:'),
                    bullet('The Customer must contact Us at billing@nuevexa.com within thirty (30) days of the erroneous charge;'),
                    bullet('Provide Account details, transaction date, amount charged, and description of the error;'),
                    bullet('We will investigate the claim within ten (10) business days;'),
                    bullet('If the error is confirmed, We will issue a full refund to the original payment method within fifteen (15) business days.'),
                    txt('Failure to report billing errors within 30 days constitutes acceptance of the charge.'),
                ],
            },
            {
                subsectionTitle: 'Customer-Initiated Payment Disputes',
                subsectionId: { current: 'customer-initiated-payment-disputes', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('If the Customer initiates a chargeback, payment reversal, or dispute through their bank or payment provider without first contacting Us, the Account will be immediately suspended pending resolution. Fraudulent or unjustified chargebacks may result in Account termination and forfeiture of all prepaid fees.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'EXTENDED PLATFORM DOWNTIME',
        sectionId: { current: 'extended-platform-downtime', _type: 'slug' },
        order: 5,
        subsections: [
            {
                subsectionTitle: 'Service Availability Standard',
                subsectionId: { current: 'service-availability-standard', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('While We use commercially reasonable efforts to maintain Platform availability, the Platform is provided "AS IS" without guaranteed uptime (Section 12.3 of the Terms of Service).'),
                ],
            },
            {
                subsectionTitle: 'Downtime Refund Eligibility',
                subsectionId: { current: 'downtime-refund-eligibility', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('Notwithstanding the no-refund policy, if the Platform experiences complete unavailability (100% inaccessible to all users) resulting in monthly availability below 90% in any calendar month, the Customer may request a pro-rated refund for that month.'),
                    txt('Calculation:'),
                    txt('90% availability threshold = allowable downtime of approximately 72 hours (3 days) per 30-day month.'),
                    txt('Complete unavailability means the Platform is entirely inaccessible; degraded performance, slow loading times, or partial feature outages do not qualify.'),
                ],
            },
            {
                subsectionTitle: 'Exclusions from Downtime Refunds',
                subsectionId: { current: 'exclusions-from-downtime-refunds', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('Downtime refunds do not apply to unavailability caused by:'),
                    bullet('Scheduled maintenance announced at least 48 hours in advance;'),
                    bullet('Emergency security patches or critical system updates;'),
                    bullet('Force Majeure events (Section 16 of the Terms of Service), including natural disasters, internet service provider failures, infrastructure provider outages, cyberattacks, or government actions;'),
                    bullet('Customer actions, including misconfigurations, Acceptable Use Policy violations, or failure to maintain valid payment methods;'),
                    bullet('Third-party service failures outside Our direct control, including cloud hosting providers, DNS providers, or payment processors;'),
                    bullet('Scheduled Account suspension due to non-payment or Terms violations.'),
                ],
            },
            {
                subsectionTitle: 'Refund Request Process',
                subsectionId: { current: 'downtime-refund-request-process', _type: 'slug' },
                order: 4,
                subsectionContent: [
                    txt('To request a downtime refund:'),
                    bullet('The Customer must submit a written request to legal@nuevexa.com within fifteen (15) days following the end of the affected calendar month;'),
                    bullet('Provide specific dates and times of unavailability experienced;'),
                    bullet('We will review system logs and availability metrics to verify the claim;'),
                    bullet('If downtime is confirmed to exceed the 90% threshold after applying exclusions, We will issue a pro-rated refund calculated as: Refund Amount = (Monthly Subscription Fee) × (Excess Downtime Hours ÷ 720 hours)'),
                    txt('Refunds will be issued to the original payment method within thirty (30) days of claim verification.'),
                ],
            },
            {
                subsectionTitle: 'Sole Remedy',
                subsectionId: { current: 'sole-remedy', _type: 'slug' },
                order: 5,
                subsectionContent: [
                    txt('The pro-rated refund described in this Section is the Customer\'s sole and exclusive remedy for Platform unavailability. No additional damages, compensation, or service credits will be provided.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'EU/UK CONSUMER COOLING-OFF RIGHTS WAIVER',
        sectionId: { current: 'eu-uk-consumer-cooling-off-rights-waiver', _type: 'slug' },
        order: 6,
        subsections: [
            {
                subsectionTitle: 'Statutory Right to Withdraw',
                subsectionId: { current: 'statutory-right-to-withdraw', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('Under EU Consumer Rights Directive (2011/83/EU) and UK Consumer Contracts Regulations 2013, consumers ordinarily have a 14-day cooling-off period to cancel online purchases and receive a full refund.'),
                ],
            },
            {
                subsectionTitle: 'Express Waiver and Immediate Service Commencement',
                subsectionId: { current: 'express-waiver-and-immediate-service-commencement', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('By subscribing to BayX and accepting the Terms of Service, the Customer expressly requests that Services commence immediately upon Account activation and explicitly agrees to waive the statutory 14-day cooling-off period.'),
                    txt('The Customer acknowledges that:'),
                    bullet('Services are delivered immediately upon subscription;'),
                    bullet('The free trial period (typically 14 days) provides adequate opportunity for evaluation before payment;'),
                    bullet('Once payment is processed, the right of withdrawal is waived in accordance with Article 16(a) of Directive 2011/83/EU and Regulation 37(1)(a) of the UK Consumer Contracts Regulations 2013;'),
                    bullet('This waiver is made knowingly and voluntarily with full understanding of its effect.'),
                ],
            },
            {
                subsectionTitle: 'Mandatory Statutory Rights',
                subsectionId: { current: 'mandatory-statutory-rights', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('Nothing in this Refund Policy limits or excludes statutory consumer rights that cannot be waived under applicable law, including rights relating to faulty digital content, misrepresentation, or unfair contract terms.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'TERMINATION FOR CAUSE BY PROVIDER',
        sectionId: { current: 'termination-for-cause-by-provider', _type: 'slug' },
        order: 7,
        subsections: [
            {
                subsectionTitle: 'Forfeiture of Prepaid Fees',
                subsectionId: { current: 'forfeiture-of-prepaid-fees', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('If We terminate the Customer\'s Account for cause pursuant to Section 6.4 of the Terms of Service, including but not limited to:'),
                    bullet('Material breach of Terms;'),
                    bullet('Acceptable Use Policy violations;'),
                    bullet('Fraudulent activity or misrepresentation;'),
                    bullet('Illegal use of the Platform;'),
                    bullet('Security threats or abusive conduct;'),
                    txt('All prepaid subscription fees are forfeited entirely, and no refunds or credits will be provided.'),
                ],
            },
            {
                subsectionTitle: 'Purpose of Forfeiture',
                subsectionId: { current: 'purpose-of-forfeiture', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('Forfeiture serves as a deterrent against misuse and compensates Us for administrative costs, reputational harm, legal exposure, and resource consumption associated with Terms violations.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'VOLUNTARY DISCONTINUATION OF PLATFORM',
        sectionId: { current: 'voluntary-discontinuation-of-platform', _type: 'slug' },
        order: 8,
        sectionContent: [
            txt('If We elect to discontinue the BayX Platform entirely and provide at least ninety (90) days\' advance written notice to Customers, the Customer will receive a pro-rated refund for any prepaid subscription fees covering periods after the Platform discontinuation date.'),
            txt('This Section does not apply to feature deprecations, plan restructuring, or changes to pricing or terms, which are governed by Sections 5.4 and 18.2 of the Terms of Service.'),
        ],
    },
    {
        sectionTitle: 'REFUND PROCESSING',
        sectionId: { current: 'refund-processing', _type: 'slug' },
        order: 9,
        subsections: [
            {
                subsectionTitle: 'Method of Refund',
                subsectionId: { current: 'method-of-refund', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('All approved refunds will be issued to the original payment method used for the transaction (credit card, debit card, or payment account). We do not issue refunds via alternative methods, cash, cheque, or wire transfer.'),
                ],
            },
            {
                subsectionTitle: 'Processing Time',
                subsectionId: { current: 'processing-time', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('Refunds are typically processed within fifteen (15) business days of approval. The time for funds to appear in the Customer\'s account depends on the payment provider and may take an additional 5-10 business days.'),
                ],
            },
            {
                subsectionTitle: 'Currency and Exchange Rates',
                subsectionId: { current: 'currency-and-exchange-rates', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('Refunds are issued in the same currency as the original payment. Currency conversion fees, exchange rate fluctuations, or international transaction fees imposed by banks or payment providers are the Customer\'s responsibility.'),
                ],
            },
            {
                subsectionTitle: 'Payment Provider Fees',
                subsectionId: { current: 'payment-provider-fees', _type: 'slug' },
                order: 4,
                subsectionContent: [
                    txt('We are not responsible for non-refundable payment processing fees charged by third-party payment providers (typically 2-3% of transaction value). Refunds reflect the net amount received by Us, not the total amount charged to the Customer by their payment provider.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'NON-REFUNDABLE ITEMS AND SERVICES',
        sectionId: { current: 'non-refundable-items-and-services', _type: 'slug' },
        order: 10,
        sectionContent: [
            txt('The following are explicitly non-refundable under all circumstances:'),
            bullet('Setup fees, onboarding fees, or implementation charges (if applicable);'),
            bullet('Custom development, consulting, or professional services rendered by Us;'),
            bullet('Third-party service fees (e.g., payment processing fees, SMS charges, API usage fees);'),
            bullet('Data export or retrieval fees charged for Customer Data exports;'),
            bullet('Add-on purchases such as additional storage, user seats, or premium features (subject to same terms as base subscription);'),
            bullet('Training, certification, or educational materials (if offered).'),
        ],
    },
    {
        sectionTitle: 'REFUND POLICY FOR ANNUAL SUBSCRIPTIONS',
        sectionId: { current: 'refund-policy-for-annual-subscriptions', _type: 'slug' },
        order: 11,
        subsections: [
            {
                subsectionTitle: 'Annual Commitment',
                subsectionId: { current: 'annual-commitment', _type: 'slug' },
                order: 1,
                subsectionContent: [
                    txt('Customers selecting annual billing receive a discounted rate in exchange for a 12-month commitment. Annual subscriptions are non-refundable, even if the Customer cancels before the 12-month period expires.'),
                ],
            },
            {
                subsectionTitle: 'Exception for Extended Downtime',
                subsectionId: { current: 'exception-for-extended-downtime', _type: 'slug' },
                order: 2,
                subsectionContent: [
                    txt('The only exception to annual subscription non-refundability is the extended downtime provision in Section 5, calculated on a monthly pro-rated basis against the annual fee.'),
                ],
            },
            {
                subsectionTitle: 'Cancellation of Annual Subscriptions',
                subsectionId: { current: 'cancellation-of-annual-subscriptions', _type: 'slug' },
                order: 3,
                subsectionContent: [
                    txt('Customers may cancel annual subscriptions at any time, but will retain access for the full 12-month prepaid period without refund. The subscription will not renew at the end of the 12-month term.'),
                ],
            },
        ],
    },
    {
        sectionTitle: 'MODIFICATIONS TO REFUND POLICY',
        sectionId: { current: 'modifications-to-refund-policy', _type: 'slug' },
        order: 12,
        sectionContent: [
            txt('We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting the revised Policy on the BayX website or providing notice via email.'),
            txt('Material changes will be announced at least thirty (30) days before taking effect. Continued use of the Platform after the effective date constitutes acceptance of the revised Refund Policy.'),
            txt('Changes to the Refund Policy do not apply retroactively to fees paid before the effective date of the change.'),
        ],
    },
    {
        sectionTitle: 'GOVERNING LAW',
        sectionId: { current: 'governing-law', _type: 'slug' },
        order: 13,
        sectionContent: [
            txt('This Refund Policy is governed by the laws of England and Wales, consistent with the Terms of Service. Disputes regarding refunds are subject to the dispute resolution provisions in Section 17 of the Terms of Service.'),
        ],
    },
    {
        sectionTitle: 'CONTACT INFORMATION',
        sectionId: { current: 'contact-information-refund', _type: 'slug' },
        order: 14,
        sectionContent: [
            txt('For refund requests, billing inquiries, or questions about this Refund Policy, please contact:'),
            txt('Nuevexa Billing Department'),
            txt('Email: billing@nuevexa.com'),
            txt('For general inquiries:'),
            txt('Email: legal@nuevexa.com'),
        ],
    },
]

async function main() {
    try {
        console.log('🔍 Finding Refund Policy document...')

        const doc = await client.fetch(`*[_type == "legalDocument" && documentType == "refund-policy"][0]`)

        if (!doc) {
            console.log('📝 No Refund Policy found. Creating new document...')

            await client.create({
                _type: 'legalDocument',
                documentType: 'refund-policy',
                title: 'Refund Policy',
                slug: { current: 'refund-policy', _type: 'slug' },
                version: '1.0',
                effectiveDate: '2026-01-19',
                publishStatus: 'published',
                notifyUsers: false,
                introduction: [
                    txt('This Refund Policy forms part of the Terms of Service between Nuevexa ("Provider," "We," "Us," "Our"), the operator of BayX, and the Customer for use of the BayX platform. Throughout this Policy, references to "BayX" or "Platform" refer to the software service, while "Provider," "We," "Us," and "Our" refer to Nuevexa as the legal entity operating BayX. Capitalised terms not defined herein have the meanings assigned in the Terms of Service.'),
                ],
                sections: refundSections,
            })

            console.log(`✅ Created Refund Policy with ${refundSections.length} sections!`)
            console.log('🌐 View at: http://localhost:3000/refund-policy')
        } else {
            console.log(`✅ Found: ${doc.title}`)
            console.log(`📄 Current sections: ${(doc.sections || []).length}`)
            console.log(`➕ Replacing with ${refundSections.length} sections...`)

            await client.patch(doc._id).set({
                sections: refundSections,
                introduction: [
                    txt('This Refund Policy forms part of the Terms of Service between Nuevexa ("Provider," "We," "Us," "Our"), the operator of BayX, and the Customer for use of the BayX platform. Throughout this Policy, references to "BayX" or "Platform" refer to the software service, while "Provider," "We," "Us," and "Our" refer to Nuevexa as the legal entity operating BayX. Capitalised terms not defined herein have the meanings assigned in the Terms of Service.'),
                ],
            }).commit()

            console.log(`✅ SUCCESS! Total sections: ${refundSections.length}`)
            console.log('🌐 View at: http://localhost:3000/refund-policy')
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
