import { NextResponse } from 'next/server';

export default function middleware(request) {
  console.log('Middleware executed for path:', request.nextUrl.pathname);
  
  try {
    const response = NextResponse.next();
    response.headers.set('x-custom-header', 'my-custom-value');
    console.log('Custom header set successfully');

    // Check authentication
    const isAuthenticated = checkAuth(request);
    if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
      console.log('Redirecting unauthenticated user to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.next();
  }
}

function checkAuth(request) {
  return request.cookies.has('session');
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
