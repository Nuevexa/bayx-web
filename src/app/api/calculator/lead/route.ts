import { NextRequest, NextResponse } from 'next/server';

interface SenderSubscriber {
    email: string;
    firstname?: string;
    lastname?: string;
    fields?: Record<string, string>;
    groups?: string[];
}

async function submitToSender(
    name: string,
    email: string,
    garageName: string
): Promise<{ success: boolean; error?: string }> {
    const apiToken = process.env.SENDER_API_TOKEN;
    const groupId = process.env.SENDER_GROUP_ID;

    if (!apiToken) {
        console.error('SENDER_API_TOKEN not configured');
        return { success: false, error: 'Email service not configured' };
    }

    try {
        const payload: SenderSubscriber = {
            email,
            firstname: name,
            fields: {
                garage_name: garageName,
            },
        };

        // Add to group if specified
        if (groupId) {
            payload.groups = [groupId];
        }

        const response = await fetch('https://api.sender.net/v2/subscribers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Sender.net API Error:', response.status, errorData);
            return {
                success: false,
                error: `Sender.net returned status ${response.status}`
            };
        }

        const data = await response.json();
        console.log('Successfully added subscriber to Sender.net:', data);
        return { success: true };
    } catch (error) {
        console.error('Error submitting to Sender.net:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, garageName, agreedToTerms, calculationInputs, calculationResult } = body;

        // Validate required fields
        if (!name || !email || !garageName || !agreedToTerms) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Log to console
        console.log('Calculator Lead Submission:', {
            timestamp: new Date().toISOString(),
            lead: { name, email, garageName, agreedToTerms },
            calculation: { inputs: calculationInputs, result: calculationResult },
        });

        // Submit to Sender.net
        const senderResult = await submitToSender(name, email, garageName);

        if (!senderResult.success) {
            console.error('Failed to submit to Sender.net:', senderResult.error);
            // Continue anyway - don't fail the whole request if email service fails
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Lead captured successfully',
                emailSubmitted: senderResult.success
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Calculator API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
