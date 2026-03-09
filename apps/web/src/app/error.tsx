'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
        Error
      </p>
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
          再試行
        </button>
        <Link
          href="/"
          className="border-input bg-background hover:bg-accent rounded-md border px-4 py-2 text-sm font-medium transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
