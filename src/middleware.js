import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { getToken } from "next-auth/jwt"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)
const localizedProfileRoute = /^\/([a-z]{2}\/)?profile(\/|$)/

export default async function middleware(req) {
  const { pathname } = req.nextUrl

  if (pathname === "/") {
    const locale = routing.defaultLocale || "en"
    return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  const response = intlMiddleware(req)

  const isProfileRoute = localizedProfileRoute.test(pathname)
  if (isProfileRoute) {
    const token = await getToken({ req })

    if (!token?.SID) {
      const localeMatch = pathname.match(/^\/([a-z]{2})\//)
      const locale = localeMatch ? localeMatch[1] : routing.defaultLocale || "en"

      const loginUrl = new URL(`/${locale}/`, req.url) // можно заменить на `/${locale}/login`
      response.cookies.delete("next-auth.session-token")
      response.cookies.delete("__Secure-next-auth.session-token")

      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
