import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message, SendMessageRequest } from './types'

const url = process.env.NEXT_PUBLIC_WS_URL

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/chat' }),
  endpoints: build => ({
    getMessages: build.query<Message[], string>({
      query: chatId => `messages/${chatId}`,
      async onCacheEntryAdded(
        chatId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = new WebSocket(`${url}/${chatId}`)

        try {
          await cacheDataLoaded

          const listener = (event: MessageEvent) => {
            try {
              const data: Message = JSON.parse(event.data)
              if (!data?.id) return

              updateCachedData(draft => {
                if (!draft.find(m => m.id === data.id)) {
                  draft.push(data)
                }
              })
            } catch (err) {
              console.error('WS parsing error:', err)
            }
          }

          socket.addEventListener('message', listener)

          await cacheEntryRemoved
          socket.removeEventListener('message', listener)
        } catch (err) {
          console.error('Socket error:', err)
        } finally {
          socket.close()
        }
      },
    }),
    sendMessage: build.mutation<Message, SendMessageRequest>({
      query: body => ({
        url: 'messages',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newMessage } = await queryFulfilled

          dispatch(
            chatApi.util.updateQueryData('getMessages', chatId, draft => {
              const exists = draft.find(m => m.id === newMessage.id)
              if (!exists) {
                draft.push(newMessage)
              }
            }),
          )
        } catch {}
      },
    }),
  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi
