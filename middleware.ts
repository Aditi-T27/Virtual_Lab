import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/resume-analysis", "/mock-interview"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // In a real app, you would check for a valid JWT token
    // For this demo, we'll check localStorage on the client side
    const response = NextResponse.next()

    // Add headers to check auth on client side
    response.headers.set("x-middleware-cache", "no-cache")

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume-analysis/:path*", "/mock-interview/:path*"],
}
