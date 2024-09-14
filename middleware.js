import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Add custom header
  response.headers.set('x-custom-header', 'my-custom-value');

  // Check authentication
  const isAuthenticated = checkAuth(request);
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

function checkAuth(request) {
  return request.cookies.has('session');
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
