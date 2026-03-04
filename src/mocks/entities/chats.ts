import { http, HttpResponse } from 'msw'
import { Message } from '@/entities/chat'

export const chatHandlers = [
  http.get('chat/messages/:chatId', ({ params }) => {
    return HttpResponse.json([
      {
        id: 'msg_0',
        chatId: params.chatId,
        text: 'Старое сообщение из БД',
        senderId: 'user_2',
        timestamp: Date.now() - 10000,
        isRead: true,
      },
    ])
  }),
  http.post('chat/messages', async ({ request }) => {
    const payload = (await request.json()) as Message
    return HttpResponse.json({
      ...payload,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      isRead: false,
    })
  }),
]
