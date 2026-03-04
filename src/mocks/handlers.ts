import { bookHandlers } from '@mocks/entities/books'
import { chatHandlers } from '@mocks/entities/chats'
import { userHandlers } from '@mocks/entities/users'

export const handlers = [...bookHandlers, ...chatHandlers, ...userHandlers]
