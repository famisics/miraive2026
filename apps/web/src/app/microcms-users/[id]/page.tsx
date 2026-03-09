import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TbHome, TbDatabase, TbUser, TbArrowLeft } from 'react-icons/tb'

import { contents } from '@packages/cms-microcms'

import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar'
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
import { Card, CardContent, CardHeader } from '@web/components/ui/card'
import { Separator } from '@web/components/ui/separator'
import { ROUTES } from '@web/consts'

export const dynamic = 'force-dynamic'

type Params = Promise<{ id: string }>

export default async function MicroCMSUserDetailPage({ params }: { params: Params }) {
  const { id } = await params

  let userData
  try {
    userData = await contents.user.getOne(id)
  } catch {
    notFound()
  }

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
              <Link href={ROUTES.MICROCMS_USERS} className="flex items-center gap-1">
                <TbDatabase className="size-4" />
                microCMS Users
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <TbUser className="size-4" />
              {userData.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                {userData.icon ? (
                  <AvatarImage asChild src={userData.icon.url}>
                    <Image
                      src={userData.icon.url}
                      width={userData.icon.width}
                      height={userData.icon.height}
                      alt={`${userData.name}のアイコン`}
                    />
                  </AvatarImage>
                ) : null}
                <AvatarFallback className="text-xl">{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />

            <dl className="space-y-4">
              <div>
                <dt className="text-muted-foreground text-sm">ID</dt>
                <dd>
                  <Badge variant="outline">{userData.id}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">名前</dt>
                <dd className="font-medium">{userData.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">メールアドレス</dt>
                <dd>{userData.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">作成日時</dt>
                <dd>{format(new Date(userData.createdAt), 'yyyy/MM/dd HH:mm:ss')}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-sm">更新日時</dt>
                <dd>{format(new Date(userData.updatedAt), 'yyyy/MM/dd HH:mm:ss')}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.MICROCMS_USERS}>
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
