import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;

    // Allow certain paths to proceed without checks
    if (pathname.startsWith('/_next/') || pathname.startsWith('/api/auth/') || pathname === '/favicon.ico') {
        return NextResponse.next();
    }

    // Stripe webhook endpoints
    if (pathname === '/api/webhook' || pathname === '/api/webhooks' || pathname === '/api/webhook/stripe') {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret });

    // Check for login, register, and root paths
    if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/') {
        if (token) {


            // Redirect to dashboard if token is valid and no period/price query params
            const dashBoardUrl = new URL('/dashboard', req.url);
            return NextResponse.redirect(dashBoardUrl);
        }
        return NextResponse.next();
    }

    // Redirect to login if no token or token is invalid
    if (!token || !isTokenValid(token)) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    const param = searchParams.get('param');

    // Redirect to payment page if period and price are present in query parameters
    if (pathname.startsWith('/payment') && param) {
        const email = token.email || '';
        const sripeLink = 'https://buy.stripe.com/'
        const paymentUrl = new URL(`${param}?prefilled_email=${email}`, sripeLink);
        console.log(paymentUrl);
        return NextResponse.redirect(paymentUrl);
    }

    // Add tenant ID to headers for other requests
    const tenantId = token?.id;
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', tenantId as string);
    return response;
}

// Function to check if the token is still valid
function isTokenValid(token: JWT) {
    const currentTime = Math.floor(Date.now() / 1000);
    return token.exp && (token.exp as number) > currentTime;
}
