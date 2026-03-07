export const runtime = 'edge';

import type { Metadata } from 'next';
import './globals.css';

import '@fontsource-variable/noto-sans-jp';
import '@fontsource-variable/overpass';

import { Header, Footer, StarAnimation, SuperComment } from '@/components';

export const metadata: Metadata = {
  title: 'miraive2026 | 未来大最大規模の、公認サークルによる新入生歓迎プロジェクト',
  description:
    '未来大最大規模の、公認サークルによる新入生歓迎プロジェクト「miraive2026」の公式サイトです。',
  openGraph: {
    title: 'miraive2026 | 未来大最大規模の新入生歓迎プロジェクト',
    description:
      '未来大最大規模の、公認サークルによる新入生歓迎プロジェクト「miraive2026」の公式サイトです。',
    siteName: 'miraive2026',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StarAnimation />
        <SuperComment />
      </body>
    </html>
  );
}
