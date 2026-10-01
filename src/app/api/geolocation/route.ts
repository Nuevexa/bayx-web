import { NextRequest, NextResponse } from 'next/server';

// The visitor's country is set by the hosting edge: Cloudflare sends cf-ipcountry,
// Vercel sends x-vercel-ip-country. Calling an IP lookup service from here would
// return the server's location, not the visitor's.
export async function GET(request: NextRequest) {
    const country = (
        request.headers.get('cf-ipcountry') ||
        request.headers.get('x-vercel-ip-country') ||
        ''
    ).toUpperCase();

    // XX = unknown, T1 = Tor
    const countryCode = /^[A-Z]{2}$/.test(country) && country !== 'XX' && country !== 'T1' ? country : 'US';

    return NextResponse.json(
        { country_code: countryCode },
        { headers: { 'Cache-Control': 'private, no-store' } }
    );
}
