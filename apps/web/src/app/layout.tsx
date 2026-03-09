import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Link from 'next/link'
import { TbHome, TbUsers, TbDatabase } from 'react-icons/tb'

import { cn } from '@web/lib/utils'

import './globals.css'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'ui-next-template',
    template: '%s | ui-next-template',
  },
  description: 'Turborepo モノレポ構造の Next.js テンプレート。',
  openGraph: {
    title: 'ui-next-template',
    description: 'Turborepo モノレポ構造の Next.js テンプレート。',
    url: '/',
    siteName: 'ui-next-template',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ui-next-template',
    description: 'Turborepo モノレポ構造の Next.js テンプレート。',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', notoSansJP.variable)}>
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
          <div className="container flex h-14 items-center">
            <Link href="/" className="flex h-full items-center space-x-2 px-5 font-semibold">
              ui-next-template
            </Link>
            <nav className="flex h-full items-center text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground flex h-full items-center gap-1.5 px-3 transition-colors">
                <TbHome className="size-4" />
                Home
              </Link>
              <Link
                href="/users"
                className="text-muted-foreground hover:text-foreground flex h-full items-center gap-1.5 px-3 transition-colors">
                <TbUsers className="size-4" />
                Users
              </Link>
              <Link
                href="/microcms-users"
                className="text-muted-foreground hover:text-foreground flex h-full items-center gap-1.5 px-3 transition-colors">
                <TbDatabase className="size-4" />
                microCMS
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto flex-1 px-4 py-8">{children}</main>

        <footer className="border-t py-6 md:py-0">
          <div className="text-muted-foreground flex h-14 items-center justify-center text-sm">
            2026 © famisics
          </div>
        </footer>
      </body>
    </html>
  )
}
