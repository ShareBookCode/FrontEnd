import { http, HttpResponse } from 'msw'
import type { UserProfile } from '@entities/user'

const mockCurrentUser: UserProfile = {
  id: 'user_1',
  name: 'Анна Франс',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
  createdAt: Date.now(),
  stats: {
    given: 5,
    exchanged: 2,
  },
  description:
    'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
}

const mockUsers: UserProfile[] = [
  mockCurrentUser,
  {
    id: 'user_2',
    name: 'Алексей Книголюб-Читатель-Книголюб-Читатель',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    createdAt: Date.now(),
    stats: {
      given: 8,
      exchanged: 12,
    },
    description:
      'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
  {
    id: 'user_3',
    name: 'Мария Ред',
    avatar: '',
    createdAt: Date.now(),
    stats: {
      given: 34,
      exchanged: 41,
    },
    description:
      'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
]

export const userHandlers = [
  http.get('/user', () => {
    return HttpResponse.json(mockCurrentUser)
  }),
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
