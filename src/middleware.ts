import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    // const { pathname } = req.nextUrl;

    // if (pathname.startsWith('/_next/') || pathname.startsWith('/api/auth/') || pathname === '/favicon.ico') {
    //     return NextResponse.next();
    // }

    // const token = await getToken({ req, secret });
    // if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/') {
    //     if (token) {
    //         const dashBoardUrl = new URL('/dashboard', req.url);
    //         return NextResponse.redirect(dashBoardUrl);
    //     }
    //     return NextResponse.next();
    // } 

    // if (!token) {
    //     const loginUrl = new URL('/login', req.url);
    //     return NextResponse.redirect(loginUrl);
    // }
    
    // return NextResponse.next();
}
