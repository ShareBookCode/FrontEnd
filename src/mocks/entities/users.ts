import { http, HttpResponse } from 'msw'
import type { User } from '@entities/user'

const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Иван Иванов (Вы)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    createdAt: Date.now(),
  },
  {
    id: 'user_2',
    name: 'Алексей Книголюб',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    createdAt: Date.now(),
  },
  {
    id: 'user_3',
    name: 'Мария Ред',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    createdAt: Date.now(),
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
