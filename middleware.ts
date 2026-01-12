import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Redirect anyone trying to access /studio to 404
    if (request.nextUrl.pathname.startsWith('/studio')) {
        return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/studio/:path*'],
};
