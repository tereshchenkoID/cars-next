import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

function isAuthenticated(req) {
  const sessionCookie = req.cookies.get('__Secure-next-auth.session-token') || req.cookies.get('next-auth.session-token')
  return sessionCookie !== undefined
}

export default function middleware(req) {
  const { pathname } = req.nextUrl
  const response = intlMiddleware(req)

  const localizedProfileRoute = /^\/[a-z]{2}\/profile/
  const isProfileRoute = pathname === '/profile' || localizedProfileRoute.test(pathname)

  if (isProfileRoute && !isAuthenticated(req)) {
    const loginUrl = new URL('/', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next|images).*)', 
    '/:lang(profile)/:path*',
    '/profile/:path*',
  ]
}