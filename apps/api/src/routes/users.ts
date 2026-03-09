import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { insertUserSchema, userRepository } from '@api/db'

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const createUserSchema = insertUserSchema.pick({ name: true })

const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
})

export const usersRoutes = new Hono()
  .get('/', async c => {
    const users = await userRepository.getMany()
    return c.json(users)
  })
  .get('/:id', zValidator('param', idParamSchema), async c => {
    const { id } = c.req.valid('param')
    const user = await userRepository.getOne(id)
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    return c.json(user)
  })
  .post('/', zValidator('json', createUserSchema), async c => {
    const data = c.req.valid('json')
    const user = await userRepository.create(data)
    return c.json(user, 201)
  })
  .put(
    '/:id',
    zValidator('param', idParamSchema),
    zValidator('json', updateUserSchema),
    async c => {
      const { id } = c.req.valid('param')
      const data = c.req.valid('json')
      const user = await userRepository.update(id, data)
      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }
      return c.json(user)
    },
  )
  .delete('/:id', zValidator('param', idParamSchema), async c => {
    const { id } = c.req.valid('param')
    const deleted = await userRepository.remove(id)
    if (!deleted) {
      return c.json({ error: 'User not found' }, 404)
    }
    return c.json({ success: true })
  })
