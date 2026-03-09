import { eq } from 'drizzle-orm'

import { db } from '../index'
import { type NewUser, type User, users } from '../schema'

export const userRepository = {
  async getMany(): Promise<User[]> {
    return db.select().from(users).orderBy(users.id)
  },

  async getOne(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id))
    return results[0]
  },

  async create(data: NewUser): Promise<User> {
    const results = await db.insert(users).values(data).returning()
    const user = results[0]
    if (!user) throw new Error('Insert returned no rows')
    return user
  },

  async update(id: number, data: Partial<Omit<NewUser, 'id'>>): Promise<User | undefined> {
    const results = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return results[0]
  },

  async remove(id: number): Promise<boolean> {
    const results = await db.delete(users).where(eq(users.id, id)).returning()
    return results.length > 0
  },
}
