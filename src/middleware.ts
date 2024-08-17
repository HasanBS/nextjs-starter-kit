import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/login') ||
        pathname === '/' ||
        pathname.startsWith('/api/auth/') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    console.log('middleware', req.nextUrl);

    const token = await getToken({ req, secret });

    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
