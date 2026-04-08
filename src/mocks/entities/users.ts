import { http, HttpResponse } from 'msw'
import type { User, UserProfile } from '@entities/user'
import profileAvatar from '@mocks/images/profile-avatar.jpg'

const mockCurrentUser: UserProfile = {
  id: 'user_1',
  name: 'Анна Франс',
  avatar: profileAvatar.src,
  createdAt: Date.now(),
  stats: {
    given: 17,
    exchanged: 21,
  },
  description:
    'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
}

const mockUsers: User[] = [
  {
    id: mockCurrentUser.id,
    name: mockCurrentUser.name,
    avatar: mockCurrentUser.avatar,
    createdAt: mockCurrentUser.createdAt,
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
