import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const response = NextResponse.next();
  
  // Add security headers
  addSecurityHeaders(response);

  // Check if it's a static asset or API route
  if (isStaticOrApiRoute(request)) {
    return response;
  }

  // Authenticate user
  const isAuthenticated = await checkAuth(request);

  // Redirect unauthenticated users in production
  if (process.env.NODE_ENV === 'production' && !isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

function addSecurityHeaders(response) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

function isStaticOrApiRoute(request) {
  return request.nextUrl.pathname.startsWith('/_next') || 
         request.nextUrl.pathname.startsWith('/api') ||
         request.nextUrl.pathname.includes('.');
}

async function checkAuth(request) {
  const token = request.cookies.get('session')?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
