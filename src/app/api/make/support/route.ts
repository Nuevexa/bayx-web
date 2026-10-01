import { NextRequest, NextResponse } from 'next/server';
import { cleanText, forwardToWebhook, isValidEmail } from '@/utils/formSubmission';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, agreedToTerms } = body;

        const sanitizedData = {
            name: cleanText(name, 100),
            email: cleanText(email, 254).toLowerCase(),
            subject: cleanText(subject, 200),
            message: cleanText(message, 5000),
            agreedToTerms: agreedToTerms === true,
            source: 'Support Form',
            submittedAt: new Date().toISOString(),
        };

        // Validation
        if (!sanitizedData.name || !sanitizedData.subject || !sanitizedData.message || !sanitizedData.agreedToTerms) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }
        if (!isValidEmail(sanitizedData.email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        const delivered = await forwardToWebhook(
            process.env.MAKE_WEBHOOK_SUPPORT,
            sanitizedData,
            'Support Form'
        );

        if (!delivered) {
            return NextResponse.json(
                { error: 'Submission failed. Please try again or email support@bayx.app.' },
                { status: 500 }
            );
        }

        console.log(`Support submission sent to Make.com: ${sanitizedData.email}`);

        return NextResponse.json({
            success: true,
            message: 'Successfully submitted',
        });

    } catch (error: any) {
        console.error('Support API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
