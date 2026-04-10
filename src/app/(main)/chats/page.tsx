'use client'

import { useState } from 'react'

import styles from './page.module.scss'
import { ChatWindow } from '@widgets/chat-window'
import { UserChatCard } from '@widgets/user-chat-card'
import { useGetMessagesQuery, useSendMessageMutation } from '@entities/chat'
import { useGetUsersQuery } from '@entities/user'

export default function Page() {
  const chatId = 'test-chat-id'
  const currentUserId = 'user_1'

  const [inputText, setInputText] = useState('')

  const { data: messages = [], isLoading: isMessagesLoading } =
    useGetMessagesQuery(chatId)

  console.log('messages', messages)

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        height: '100vh',
        padding: '50px',
      }}
    >
      {' '}
      <div>
        <h1>Чат (Тестовый режим)</h1>

        {/* Список сообщений */}

        <ChatWindow data={messages} currentUserId={currentUserId} />
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
                {messages.some(
                  m => m.senderId.id === u.id && m.senderId.isOnline,
                )
                  ? 'Да'
                  : 'Нет'}
              </li>
            ))}
          </ul>
        </details>
      </div>
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
      <hr />
      {/* DEV: Превью UserChatCard */}
      <details open>
        <summary>
          <strong>DEV — UserChatCard states</strong>
        </summary>
        <div className={styles.devPreview}>
          {/* Unactive — без непрочитанных */}
          <UserChatCard
            name='Евгения'
            isVerified
            lastMessage='Стивен Хокинг'
            bookTitle='«Краткие ответы на большие вопросы»'
            timestamp='13:15'
          />

          {/* Unactive — с непрочитанными */}
          <UserChatCard
            name='Евгения'
            isVerified
            lastMessage='Стивен Хокинг'
            bookTitle='«Краткие ответы на большие вопросы»'
            timestamp='13:15'
            unreadCount={2}
          />

          {/* Active — с непрочитанными */}
          <UserChatCard
            name='Евгения'
            isVerified
            lastMessage='Стивен Хокинг'
            bookTitle='«Краткие ответы на большие вопросы»'
            timestamp='13:15'
            unreadCount={2}
            isActive
          />

          {/* Active — без непрочитанных */}
          <UserChatCard
            name='Евгения'
            isVerified
            lastMessage='Стивен Хокинг'
            bookTitle='«Краткие ответы на большие вопросы»'
            timestamp='13:15'
            isActive
          />
        </div>
      </details>
    </div>
  )
}
