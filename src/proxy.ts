import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAdminRoute =
		pathname.startsWith('/admin') || pathname.startsWith('/registrations');
	const isAuthRequired = pathname.startsWith('/events/event-registration');

	if (!isAdminRoute && !isAuthRequired) {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		const signInUrl = new URL('/sign-in', request.url);
		signInUrl.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(signInUrl);
	}

	if (isAdminRoute && session.user.role !== 'admin') {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/registrations/:path*',
		'/events/event-registration/:path*',
	],
};
