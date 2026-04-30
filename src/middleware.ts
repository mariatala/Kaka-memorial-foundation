import { NextRequest, NextResponse } from 'next/server';

// better-auth writes session_token with this name.
// In development (HTTP) the cookie is unprefixed; on HTTPS it gets __Secure-.
const SESSION_COOKIES = ['__Secure-better-auth.session_token', 'better-auth.session_token'];

function hasSession(request: NextRequest): boolean {
    return SESSION_COOKIES.some((name) => Boolean(request.cookies.get(name)?.value));
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRequired = pathname.startsWith('/events/event-registration');

    if (!isAdminRoute && !isAuthRequired) {
        return NextResponse.next();
    }

    if (!hasSession(request)) {
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Role check (admin-only routes) is enforced server-side in each page/API
    // handler where a full DB session lookup is available.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/events/event-registration/:path*',
    ],
};
