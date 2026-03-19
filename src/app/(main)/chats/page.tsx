'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  UserCard,
} from '@entities/chat'
import { useGetUsersQuery } from '@entities/user'
import { useAppSelector } from '@shared/hooks/useAppRedux'
import DefaultAvatar from '@/shared/assets/icons/default-avatar.svg'
import { Container } from '@/shared/ui/container'

export default function Page() {
  const chatId = 'test-chat-id'
  const currentUser = useAppSelector(state => state.user.currentUser)
  const currentUserId = currentUser?.id
  const [inputText, setInputText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: messages = [], isLoading: isMessagesLoading } =
    useGetMessagesQuery(chatId)
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery()
  const [sendMessage] = useSendMessageMutation()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim()) return
    try {
      await sendMessage({
        chatId,
        senderId: { id: currentUserId },
        text: inputText,
      }).unwrap()
      setInputText('')
    } catch (error) {
      console.error('Ошибка отправки:', error)
    }
  }

  if (isMessagesLoading || isUsersLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#f5f7fb',
        }}
      >
        Загрузка...
      </div>
    )

  return (
    <div
      style={{
        background: '#f5f7fb',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}
    >
      <Container className='chat-container'>
        <div
          style={{
            height: '100%',
            display: 'flex',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          {/* Sidebar */}
          <aside
            style={{
              width: '320px',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                }}
              >
                Чаты
              </h2>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {users
                .filter(user => user.id !== currentUserId)
                .map(user => {
                  const userMessages = messages.filter(
                    m => m.senderId.id === user.id,
                  )
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
                      isActive={user.id === 'user_2'}
                    />
                  )
                })}
            </div>
          </aside>

          {/* Main Chat Area */}
          <main
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <header
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <h3 style={{ fontWeight: 'bold' }}>Тестовый чат</h3>
            </header>

            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.length === 0 && (
                <p style={{ textAlign: 'center', color: '#909090' }}>
                  Сообщений пока нет
                </p>
              )}
              {messages.map(msg => {
                const isMine = msg.senderId.id === currentUserId
                const sender = users.find(u => u.id === msg.senderId.id)
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: isMine ? 'flex-end' : 'flex-start',
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMine ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      {!isMine &&
                        (sender?.avatar ? (
                          <Image
                            src={sender.avatar}
                            alt='avatar'
                            width={24}
                            height={24}
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
                          <DefaultAvatar
                            width={24}
                            height={24}
                            style={{ borderRadius: '50%' }}
                          />
                        ))}
                      <span style={{ fontSize: '12px', color: '#909090' }}>
                        {sender?.name || 'Система'}
                      </span>
                    </div>
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: isMine
                          ? '16px 16px 2px 16px'
                          : '16px 16px 16px 2px',
                        background: isMine ? '#007bff' : '#f0f2f5',
                        color: isMine ? '#fff' : '#1a1a1a',
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
                      {msg.text}
                    </div>
                    <small
                      style={{
                        fontSize: '10px',
                        color: '#909090',
                        marginTop: '4px',
                      }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </div>
                )
              })}
            </div>

            <footer
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                gap: '12px',
              }}
            >
              <input
                type='text'
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder='Введите сообщение...'
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  outline: 'none',
                  background: '#f9fafb',
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  padding: '0 24px',
                  borderRadius: '12px',
                  background: '#007bff',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Отправить
              </button>
            </footer>
          </main>
        </div>
      </Container>
    </div>
  )
}
