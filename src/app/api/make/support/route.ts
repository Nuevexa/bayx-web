import { NextRequest, NextResponse } from 'next/server';

function sanitize(input: string): string {
    return input.trim().replace(/[<>]/g, '').replace(/['";\\]/g, '').slice(0, 500);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, agreedToTerms } = body;

        // Validation
        if (!name || !email || !subject || !message || !agreedToTerms) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const sanitizedData = {
            name: sanitize(name),
            email: sanitize(email.toLowerCase()),
            subject: sanitize(subject),
            message: sanitize(message),
            agreedToTerms: agreedToTerms === true,
            source: 'Support Form',
            submittedAt: new Date().toISOString(),
        };

        const makeWebhookUrl = process.env.MAKE_WEBHOOK_SUPPORT;

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
