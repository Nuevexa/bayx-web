import { NextRequest, NextResponse } from 'next/server';

function validateEarlyAccessData(data: any) {
    const errors: string[] = [];
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email');
    }
    if (!data.fullName || data.fullName.length < 2) {
        errors.push('Invalid name');
    }
    if (!data.companyName || data.companyName.length < 2) {
        errors.push('Invalid company name');
    }
    if (!data.agreedToTerms) {
        errors.push('Terms agreement required');
    }
    return errors;
}

function sanitize(input: string): string {
    return input.trim().replace(/[<>]/g, '').replace(/['";\\]/g, '').slice(0, 200);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const errors = validateEarlyAccessData(body);

        if (errors.length > 0) {
            return NextResponse.json(
                { error: 'Validation failed', details: errors },
                { status: 400 }
            );
        }

        const sanitizedData = {
            email: sanitize(body.email.toLowerCase()),
            fullName: sanitize(body.fullName),
            firstName: sanitize(body.fullName.split(' ')[0] || ''),
            lastName: sanitize(body.fullName.split(' ').slice(1).join(' ') || ''),
            phone: body.phone ? sanitize(body.phone) : '',
            companyName: sanitize(body.companyName),
            agreedToTerms: body.agreedToTerms === true,
            source: 'Early Access Form',
            submittedAt: new Date().toISOString(),
        };

        const makeWebhookUrl = process.env.MAKE_WEBHOOK_EARLY_ACCESS;

        if (!makeWebhookUrl) {
            console.error('Make.com webhook URL not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Send to Make.com webhook
        const response = await fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData),
        });

        if (!response.ok) {
            console.error('Make.com webhook error:', response.status);
            return NextResponse.json(
                { error: 'Submission failed. Please try again.' },
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
