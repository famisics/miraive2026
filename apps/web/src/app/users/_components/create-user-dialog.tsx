'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TbPlus, TbLoader2 } from 'react-icons/tb'

import { Button } from '@web/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog'
import { Input } from '@web/components/ui/input'
import { Label } from '@web/components/ui/label'
import { api as apiClient } from '@web/lib/api'

export function CreateUserDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('名前を入力してください')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await apiClient.users.$post({ json: { name: trimmedName } })
      if (!res.ok) {
        throw new Error('ユーザーの作成に失敗しました')
      }
      setName('')
      setOpen(false)
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ユーザーの作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setName('')
      setError('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <TbPlus className="size-4" />
          ユーザーを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>ユーザーを追加</DialogTitle>
            <DialogDescription>新しいユーザーを作成します。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ユーザー名を入力"
              className="mt-2"
              disabled={isSubmitting}
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <TbLoader2 className="size-4 animate-spin" />}
              作成
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
