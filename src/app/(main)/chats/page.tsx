'use client'

import { useState } from 'react'
// import Image from 'next/image'
import { useGetMessagesQuery, useSendMessageMutation } from '@entities/chat'
import { useGetUsersQuery, User } from '@entities/user'

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
        senderId: currentUserId,
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

      {/* Список сообщений */}
      <section>
        {messages.length === 0 && <p>Сообщений пока нет</p>}
        {messages.map(msg => {
          const sender = users.find((u: User) => u.id === msg.senderId)
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
          {users.map((u: User) => (
            <li key={u.id}>
              {u.name} (Online: {u.isOnline ? 'Да' : 'Нет'})
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
