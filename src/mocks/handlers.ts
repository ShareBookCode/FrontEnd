import { bookHandlers } from '@mocks/entities/books'
import { chatHandlers } from '@mocks/entities/chats'
import { cityHandlers } from '@mocks/entities/cities'
import { userHandlers } from '@mocks/entities/users'

export const handlers = [
  ...bookHandlers,
  ...chatHandlers,
  ...cityHandlers,
  ...userHandlers,
]
