'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  UserCard,
} from '@entities/chat'
import { useGetUsersQuery } from '@entities/user'
import { useAppSelector } from '@shared/hooks/useAppRedux'
import DefaultAvatar from '@/shared/assets/icons/default-avatar.svg'

export default function Page() {
  const chatId = 'test-chat-id'
  const currentUser = useAppSelector(state => state.user.currentUser)
  const currentUserId = currentUser?.id

  const [inputText, setInputText] = useState('')

  const { data: messages = [], isLoading: isMessagesLoading } =
    useGetMessagesQuery(chatId)

  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery()

  const [sendMessage] = useSendMessageMutation()

  const handleSend = async () => {
    if (!inputText.trim()) return

    try {
      await sendMessage({
        chatId,
        senderId: {
          id: currentUserId,
        },
        text: inputText,
      }).unwrap()
      setInputText('')
    } catch (error) {
      console.error('Ошибка отправки:', error)
    }
  }

  if (isMessagesLoading || isUsersLoading) return <div>Загрузка...</div>

  return (
    <div>
      <h1>Чат (Тестовый режим)</h1>

      <section style={{ maxWidth: 320, marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, marginBottom: 8, color: '#909090' }}>
          UserCard
        </h2>
        {users
          .filter(user => user.id !== currentUserId)
          .map(user => {
            const userMessages = messages.filter(m => m.senderId.id === user.id)
            const lastMsg = userMessages[userMessages.length - 1]
            const unreadCount = userMessages.filter(m => !m.isRead).length

            return (
              <UserCard
                key={user.id}
                avatar={user.avatar}
                name={user.name}
                isVerified={false}
                lastMessage={lastMsg?.text || 'Нет сообщений'}
                timestamp={
                  lastMsg
                    ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                unreadCount={unreadCount}
                isActive={user.id === 'user_2'} // TODO: implement active chat state
              />
            )
          })}
      </section>

      <hr />

      <section>
        {messages.length === 0 && <p>Сообщений пока нет</p>}
        {messages.map(msg => {
          const sender = users.find(u => u.id === msg.senderId.id)
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              {sender?.avatar ? (
                <Image
                  src={sender.avatar}
                  alt='avatar'
                  width={30}
                  height={30}
                />
              ) : (
                <DefaultAvatar
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
              )}
              <strong>{sender?.name || 'Система'}: </strong>
              <span>{msg.text}</span>
              <small> [{new Date(msg.timestamp).toLocaleTimeString()}]</small>
            </div>
          )
        })}
      </section>

      <hr />

      <footer>
        <input
          type='text'
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder='Введите сообщение...'
        />
        <button onClick={handleSend}>Отправить</button>
      </footer>

      <hr />

      <details>
        <summary>Отладочная информация</summary>
        <p>Chat ID: {chatId}</p>
        <p>Current User ID: {currentUserId}</p>
        <p>Всего сообщений в кеше: {messages.length}</p>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.name} {' Online: '}
              {messages.some(m => m.senderId.id === u.id && m.senderId.isOnline)
                ? 'Да'
                : 'Нет'}
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
