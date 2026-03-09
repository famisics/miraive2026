import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { TbHome, TbDatabase, TbMail, TbEye } from 'react-icons/tb'

import { contents } from '@packages/cms-microcms'

import { Alert, AlertDescription } from '@web/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar'
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
import { ROUTES } from '@web/consts'

export const dynamic = 'force-dynamic'

export default async function MicroCMSUsersPage() {
  const data = await contents.user.getMany()

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
            <BreadcrumbPage className="flex items-center gap-1">
              <TbDatabase className="size-4" />
              microCMS Users
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mt-4 flex items-center gap-x-2 text-2xl font-bold">
        <TbDatabase className="size-6" />
        microCMS Users
      </h1>
      <p className="text-muted-foreground mt-2">microCMSユーザー一覧のサンプルページです。</p>

      <div className="mt-6">
        {data.contents.length === 0 ? (
          <Alert>
            <AlertDescription>ユーザーがいません。</AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.contents.map(u => (
              <Card key={u.id} className="gap-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      {u.icon ? (
                        <AvatarImage asChild src={u.icon.url}>
                          <Image
                            src={u.icon.url}
                            width={u.icon.width}
                            height={u.icon.height}
                            alt={`${u.name}のアイコン`}
                          />
                        </AvatarImage>
                      ) : null}
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{u.name}</CardTitle>
                      <p className="text-muted-foreground flex items-center gap-1 text-sm">
                        <TbMail className="size-4" />
                        {u.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">
                    作成: {format(new Date(u.createdAt), 'yyyy/MM/dd HH:mm')}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" asChild>
                      <Link href={ROUTES.MICROCMS_USER(u.id)}>
                        <TbEye className="size-4" />
                        詳細
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
