import { http, HttpResponse } from 'msw'
import type { DefaultUser as User } from '@shared/lib/types'

const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Иван Иванов (Вы)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    isOnline: true,
    stats: {
      given: 7,
      exchanged: 1,
    },
    location: {
      city: 'Санкт-Петербург',
      district: 'Выборгский р-н',
    },
  },
  {
    id: 'user_2',
    name: 'Алексей Книголюб',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    isOnline: true,
    stats: {
      given: 1,
      exchanged: 6,
    },
    location: {
      city: 'Санкт-Петербург',
      district: 'Приморский р-н',
    },
  },
  {
    id: 'user_3',
    name: 'Мария Ред',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    isOnline: false,
    stats: {
      given: 5,
      exchanged: 2,
    },
    location: {
      city: 'Москва',
      district: 'ЦАО',
    },
  },
]

export const userHandlers = [
  http.get('/users', () => {
    return HttpResponse.json(mockUsers)
  }),
  http.get('/users/:id', ({ params }) => {
    const user = mockUsers.find(u => u.id === params.id)
    return user
      ? HttpResponse.json(user)
      : new HttpResponse(null, { status: 404 })
  }),
]
