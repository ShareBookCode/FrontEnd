'use client'

import { useState } from 'react'
// import Image from 'next/image'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  UserCard,
} from '@entities/chat'
import { useGetUsersQuery } from '@entities/user'

// тестовые данные для предпросмотра компонента UserCard
const MOCK_USERS = [
  {
    id: '1',
    avatar: 'https://i.pravatar.cc/150?img=47',
    name: 'Евгения',
    isVerified: true,
    lastMessage:
      'Стивен Хокинг «Краткие ответы на большие вопросы»',
    timestamp: '13:15',
    unreadCount: 2,
    isActive: false,
  },
  {
    id: '2',
    avatar: 'https://i.pravatar.cc/150?img=47',
    name: 'Евгения',
    isVerified: true,
    lastMessage:
      'Стивен Хокинг «Краткие ответы на большие вопросы»',
    timestamp: '13:15',
    unreadCount: 2,
    isActive: true,
  },
]

export default function Page() {
  const chatId = 'test-chat-id'
  const currentUserId = 'user_1'

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

      {/* ====== Предпросмотр компонента UserCard ====== */}
      <section style={{ maxWidth: 320, marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, marginBottom: 8, color: '#909090' }}>
          UserCard — предпросмотр
        </h2>
        {MOCK_USERS.map(user => (
          <UserCard
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            isVerified={user.isVerified}
            lastMessage={user.lastMessage}
            timestamp={user.timestamp}
            unreadCount={user.unreadCount}
            isActive={user.isActive}
          />
        ))}
      </section>

      <hr />

      {/* Список сообщений */}
      <section>
        {messages.length === 0 && <p>Сообщений пока нет</p>}
        {messages.map(msg => {
          const sender = users.find(u => u.id === msg.senderId.id)
          return (
            <div key={msg.id}>
              {/* <Image
                src={sender?.avatarUrl || 'https://via.placeholder.com/30'}
                alt='avatar'
                width={30}
                height={30}
              /> */}
              <strong>{sender?.name || 'Система'}: </strong>
              <span>{msg.text}</span>
              <small> [{new Date(msg.timestamp).toLocaleTimeString()}]</small>
            </div>
          )
        })}
      </section>

      <hr />

      {/* Поле ввода */}
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

      {/* Инфо-панель для теста */}
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
