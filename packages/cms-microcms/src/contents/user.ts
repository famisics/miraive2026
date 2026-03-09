import { client } from '../client'
import type { MicroCMSImage, MicroCMSListContent, MicroCMSListResponse } from '../client'

export interface UserType extends MicroCMSListContent {
  name: string
  email: string
  icon: MicroCMSImage
}

export const user = {
  async getMany(): Promise<MicroCMSListResponse<UserType>> {
    return client.getList<UserType>({ endpoint: 'users' })
  },

  async getOne(id: string): Promise<UserType> {
    return client.get<UserType>({ endpoint: 'users', contentId: id })
  },
}
