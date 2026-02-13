import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, agreedToTerms, calculationInputs, calculationResult } = body;

        // Validate required fields
        if (!name || !email || !agreedToTerms) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Log to console (replace with actual backend integration)
        console.log('Calculator Lead Submission:', {
            timestamp: new Date().toISOString(),
            lead: { name, email, agreedToTerms },
            calculation: { inputs: calculationInputs, result: calculationResult },
        });

        // TODO: Send to Make.com webhook or other backend
        // const webhookUrl = process.env.MAKE_WEBHOOK_CALCULATOR;
        // await fetch(webhookUrl, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ name, email, calculationInputs, calculationResult }),
        // });

        return NextResponse.json(
            { success: true, message: 'Lead captured successfully' },
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
