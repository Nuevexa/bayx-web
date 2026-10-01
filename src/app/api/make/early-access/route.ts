import { NextRequest, NextResponse } from 'next/server';
import { cleanText, forwardToWebhook, isValidEmail } from '@/utils/formSubmission';

function validateEarlyAccessData(data: { email: string; fullName: string; companyName: string; agreedToTerms: boolean }) {
    const errors: string[] = [];
    if (!isValidEmail(data.email)) {
        errors.push('Invalid email');
    }
    if (data.fullName.length < 2) {
        errors.push('Invalid name');
    }
    if (data.companyName.length < 2) {
        errors.push('Invalid company name');
    }
    if (!data.agreedToTerms) {
        errors.push('Terms agreement required');
    }
    return errors;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const fullName = cleanText(body.fullName, 100);

        const sanitizedData = {
            email: cleanText(body.email, 254).toLowerCase(),
            fullName,
            firstName: fullName.split(' ')[0] || '',
            lastName: fullName.split(' ').slice(1).join(' ') || '',
            phone: cleanText(body.phone, 30),
            companyName: cleanText(body.companyName, 200),
            agreedToTerms: body.agreedToTerms === true,
            source: 'Early Access Form',
            submittedAt: new Date().toISOString(),
        };

        const errors = validateEarlyAccessData(sanitizedData);

        if (errors.length > 0) {
            return NextResponse.json(
                { error: 'Validation failed', details: errors },
                { status: 400 }
            );
        }

        const delivered = await forwardToWebhook(
            process.env.MAKE_WEBHOOK_EARLY_ACCESS,
            sanitizedData,
            'Early Access Form'
        );

        if (!delivered) {
            return NextResponse.json(
                { error: 'Submission failed. Please try again or email support@bayx.app.' },
                { status: 500 }
            );
        }

        console.log(`Early Access submission sent to Make.com: ${sanitizedData.email}`);

        return NextResponse.json({
            success: true,
            message: 'Successfully submitted',
        });

    } catch (error: any) {
        console.error('Early Access API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
