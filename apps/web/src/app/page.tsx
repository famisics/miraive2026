import Link from 'next/link'
import { TbUsers, TbDatabase } from 'react-icons/tb'

import { Button } from '@web/components/ui/button'

export default function Page() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight">ui-next-template</h1>
        <p className="text-muted-foreground mt-6 text-lg">
          Turborepo モノレポ構造のテンプレートです。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/users">
              <TbUsers className="size-5" />
              Users
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/microcms-users">
              <TbDatabase className="size-5" />
              microCMS Users
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
