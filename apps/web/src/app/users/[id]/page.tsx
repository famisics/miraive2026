import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TbHome, TbUsers, TbUser, TbArrowLeft } from 'react-icons/tb'

import { Badge } from '@web/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@web/components/ui/breadcrumb'
import { Button } from '@web/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@web/components/ui/card'
import { Separator } from '@web/components/ui/separator'
import { ROUTES } from '@web/consts'
import { api } from '@web/lib/api'

export const dynamic = 'force-dynamic'

type Params = Promise<{ id: string }>

export default async function UserDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const res = await api.users[':id'].$get({ param: { id } })

  if (!res.ok) {
    notFound()
  }

  const user = await res.json()

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center gap-1">
                <TbHome className="size-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.USERS} className="flex items-center gap-1">
                <TbUsers className="size-4" />
                Users
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <TbUser className="size-4" />
              {user.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TbUser className="size-6" />
              {user.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />

            <dl className="space-y-4">
              <div>
                <dt className="text-muted-foreground text-sm">ID</dt>
                <dd>
                  <Badge variant="outline">{user.id}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">名前</dt>
                <dd className="font-medium">{user.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">作成日時</dt>
                <dd>{format(new Date(user.createdAt), 'yyyy/MM/dd HH:mm:ss')}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">更新日時</dt>
                <dd>{format(new Date(user.updatedAt), 'yyyy/MM/dd HH:mm:ss')}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.USERS}>
                  <TbArrowLeft className="size-4" />
                  一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
