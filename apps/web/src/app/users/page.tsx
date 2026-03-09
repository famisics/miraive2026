import { format } from 'date-fns'
import Link from 'next/link'
import { TbHome, TbUsers, TbEye } from 'react-icons/tb'

import { Alert, AlertDescription } from '@web/components/ui/alert'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@web/components/ui/table'
import { ROUTES } from '@web/consts'
import { api } from '@web/lib/api'

import { CreateUserDialog } from './_components/create-user-dialog'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const res = await api.users.$get()
  if (!res.ok) {
    throw new Error('ユーザー一覧の取得に失敗しました')
  }
  const users = await res.json()

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
              <TbUsers className="size-4" />
              Users
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-x-2 text-2xl font-bold">
            <TbUsers className="size-6" />
            Users
          </h1>
          <p className="text-muted-foreground mt-2">ユーザー一覧のサンプルページです。</p>
        </div>
        <CreateUserDialog />
      </div>

      <div className="mt-6">
        {users.length === 0 ? (
          <Alert>
            <AlertDescription>ユーザーがいません。</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Badge variant="outline">{user.id}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(user.createdAt), 'yyyy/MM/dd HH:mm')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={ROUTES.USER(user.id)}>
                          <TbEye className="size-4" />
                          詳細
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
