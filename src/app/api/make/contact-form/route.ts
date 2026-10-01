import { NextRequest, NextResponse } from 'next/server';
import { cleanText, forwardToWebhook, isValidEmail } from '@/utils/formSubmission';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullname, number, email, subject, message, agreedToTerms } = body;

        const sanitizedData = {
            fullname: cleanText(fullname, 100),
            number: cleanText(number, 30),
            email: cleanText(email, 254).toLowerCase(),
            subject: cleanText(subject, 200),
            message: cleanText(message, 5000),
            agreedToTerms: agreedToTerms === true,
            source: 'Contact Form',
            submittedAt: new Date().toISOString(),
        };

        // Validation
        if (!sanitizedData.fullname || !sanitizedData.subject || !sanitizedData.message || !sanitizedData.agreedToTerms) {
            return NextResponse.json(
                { error: 'All required fields must be filled' },
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
            process.env.MAKE_WEBHOOK_CONTACT_FORM,
            sanitizedData,
            'Contact Form'
        );

        if (!delivered) {
            return NextResponse.json(
                { error: 'Submission failed. Please try again or email support@bayx.app.' },
                { status: 500 }
            );
        }

        console.log(`Contact form submission sent to Make.com: ${sanitizedData.email}`);

        return NextResponse.json({
            success: true,
            message: 'Successfully submitted',
        });

    } catch (error: any) {
        console.error('Contact form API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
