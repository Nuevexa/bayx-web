import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Use ipapi.co for geolocation (free tier: 1,000 requests/day)
        const response = await fetch('https://ipapi.co/json/', {
            headers: {
                'User-Agent': 'BayX-Calculator/1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`Geolocation API failed: ${response.status}`);
        }

        const data = await response.json();

        // Return simplified response with just what we need
        return NextResponse.json({
            country_code: data.country_code || 'US',
            currency: data.currency || 'USD',
        });
    } catch (error) {
        console.error('Geolocation detection failed:', error);

        // Fallback to US/USD
        return NextResponse.json(
            {
                country_code: 'US',
                currency: 'USD',
            },
            { status: 200 } // Return 200 even on error to prevent client-side failures
        );
    }
}
