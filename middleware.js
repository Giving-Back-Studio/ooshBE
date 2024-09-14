import { NextResponse } from 'next/server';

export function middleware(request) {
  // Example: Add a custom header to all requests
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-header', 'my-custom-value');

  // Example: Redirect if the user is not authenticated
  // This is just a placeholder, you'll need to implement actual auth logic
  const isAuthenticated = checkAuth(request);
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue with the request
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// This is a placeholder function. Implement your actual auth check here.
function checkAuth(request) {
  // For example, check for a session cookie or token
  return request.cookies.has('session');
}

// Optionally, specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
