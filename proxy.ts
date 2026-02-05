import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth/auth';
import { headers } from 'next/headers';

//  Specify protected routes
const protectedRoutes = ['/dashboard'];

export default async function proxy(req: NextRequest) {
  //  Check if the current route  is protected or public (even if it's a subroute)
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => route === path || path.startsWith(route),
  );

  // Get the session
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error('Error getting session:', error);
  }

  // Redirect to login if user is not logged in and tries to access protected route
  if (!session?.user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to dashboard if user is logged in and tries to access login page
  if (session?.user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Allow access to public routes if user is not logged in
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
