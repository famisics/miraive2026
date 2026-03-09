import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // CSP の雛形（プロジェクトに合わせてカスタマイズしてください）
  // response.headers.set(
  //   'Content-Security-Policy',
  //   [
  //     "default-src 'self'",
  //     "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  //     "style-src 'self' 'unsafe-inline'",
  //     "img-src 'self' data: https:",
  //     "font-src 'self'",
  //     "connect-src 'self'",
  //     "frame-ancestors 'none'",
  //   ].join('; '),
  // )

  return response
}

export const config = {
  matcher: ['/((?!api/|_next/|favicon.ico).*)'],
}
