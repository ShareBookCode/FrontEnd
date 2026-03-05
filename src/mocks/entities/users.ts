import { http, HttpResponse } from 'msw'
import { User } from '@entities/user'

const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Иван Иванов (Вы)',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    isOnline: true,
  },
  {
    id: 'user_2',
    name: 'Алексей Книголюб',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    isOnline: true,
  },
  {
    id: 'user_3',
    name: 'Мария Ред',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    isOnline: false,
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
