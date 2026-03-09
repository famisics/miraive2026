export const ROUTES = {
  HOME: '/',
  USERS: '/users',
  USER: (id: number) => `/users/${id}`,
  MICROCMS_USERS: '/microcms-users',
  MICROCMS_USER: (id: string) => `/microcms-users/${id}`,
} as const
