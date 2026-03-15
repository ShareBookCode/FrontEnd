import { http, HttpResponse, ws } from 'msw'
import type { Message, SendMessageRequest } from '@entities/chat'

const chat = ws.link(`${process.env.NEXT_PUBLIC_WS_URL}/:chatId`)

export const chatHandlers = [
  chat.addEventListener('connection', ({ client, params }) => {
    const { chatId } = params

    const interval = setInterval(() => {
      client.send(
        JSON.stringify({
          id: crypto.randomUUID(),
          chatId: chatId,
          text: 'Проверка сообщения по WebSocket',
          senderId: {
            id: 'user_2',
            whenOnline: Date.now(),
            isOnline: true,
          },
          timestamp: Date.now(),
          isRead: false,
        } as SendMessageRequest),
      )
    }, 30000)

    client.addEventListener('close', () => clearInterval(interval))
  }),

  http.get('chat/messages/:chatId', ({ params }) => {
    return HttpResponse.json([
      {
        id: crypto.randomUUID(),
        chatId: params.chatId,
        text: 'Старое сообщение из БД',
        senderId: {
          id: 'user_2',
          whenOnline: Date.now(),
          isOnline: true,
        },
        timestamp: Date.now() - 10000,
        isRead: true,
      } as Message,
    ])
  }),
  http.post('chat/messages', async ({ request }) => {
    const payload = (await request.json()) as Message

    const myMessage = {
      ...payload,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now(),
      isRead: false,
    }

    setTimeout(() => {
      chat.broadcast(
        JSON.stringify({
          id: Math.random().toString(36).substring(2),
          chatId: payload.chatId,
          text: `Получил: "${payload.text}".`,
          senderId: {
            id: 'user_2',
          },
          timestamp: Date.now(),
          isRead: false,
        } as SendMessageRequest),
      )
    }, 1500)

    return HttpResponse.json(myMessage)
  }),
]
