import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
